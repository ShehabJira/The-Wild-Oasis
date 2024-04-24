// Here we will define the functions that will read, delete, edit, and create cabins from the superbase client.
// React Query will be responsible for querying and dealing with these functions.
// As React Query knows exactly when it should call these functions(only at the 3 cases of refetching).

import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	// we got this line of code of how we can get all cabins data from the client we created(supabase), by opening the supabase API Docs page, and went to cabins, and get this line of code .
	const { data, error } = await supabase.from("cabins").select("*");
	// here we are querying this supabase client which will return from the cabins table all of the fields. and of course we can choose only specific things to get.

	if (error) {
		console.log(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}
// getCabins() is the async function that will give us the data of all cabins.

export async function deleteCabin(id) {
	// we got this line of code of how to delete a row from supabase API docs then cabins then select it.
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);
	// delete the id column that equal to the id we pass here.

	if (error) {
		console.log(error);
		throw new Error("Cabin could not be deleted");
	}

	return data;
}
// Remember to activate row level security RLS of deleting on this cabins table.

// if we want to edit cabin we need newCabin data(from the Form) + the id of the cabin that is being edited. from this we will know if we are in an editSession or not, Cuz this createEditCabin does both.
// Note! Remember that we made inserting image while editing optional, so if the user didn't insert a new image, this means that the image path is still the same, but if he inserted a new image then we need to make a new path for it. But how can we know that if he inserted an image or not? that's simple, if the image from the newCabin data comming from the editing Form starts with supabase Url(has a path) this means that there is an existing image path(image did not changed) else means he inserted a new one that needs to get a new path,
export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); // in case of editing the cabin we need to make sure that we don't create a new image path, because there will be already an existing one.
	// To add a new image while creating a new cabin you should follow 3 steps.
	// First, create a cabin, and remember to insert the supabase bucket image path to the image field. in this format(supabase url/bucket/image name):
	// https://jzaznxqivkamungjldfs.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	// make the image path that will be added to the image filed in the new cabin.
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	); // we need to make its name unique to prevent the same name from being existing again. Note! if this name contains any slashes (/) then supabase will create folders based on that so we need to replace any slash exists with nothing.

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
	// if there is an image path use it, else create a new path.

	// Create/Edit Cabin in cabins query
	let query = supabase.from("cabins");
	// A) Create Cabin
	if (!id)
		query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]); // like a = a + 1
	// the returned data contains the created cabin id.

	// B) Edit Cabin
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

	// Only one thing of these 2 things above will be executed, that one thing which is modified(whether created or updated) we will select it.
	const { data, error } = await query.select().single();
	// By default, .insert(), .update(), .upsert(), and .delete() do not return modified rows. By calling this select method, modified rows are returned in data. but if we were creating only we needn't do these things.
	// single() returns data as a single object instead of an array of objects. Query result must be one row (e.g. using .limit(1)), otherwise this returns an error.

	if (error) {
		console.log(error);
		throw new Error("Cabin could not be created");
	}

	// early returning as in this case we don't want to upload an image.
	if (hasImagePath) return data;

	// Second, if the cabin created with no errors, then upload the image to the bucket.
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// Third, if there was a problem in uploading this image, delete this created cabin.
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.log(storageError);
		throw new Error(
			"Cabin image could not be uploaded and the cabin was not created"
		);
	}

	return data;
}
