import supabase, { supabaseUrl } from "./supabase";

// Note! in modern JS development instead of passing multiple parameters to the functions, we pass an obj with them.

// LOG IN
export async function login({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	console.log(data); // {user: {…}, session: {…}, weakPassword: {…}}
	// Note! when login happens, the loged in 'user' is returned and a 'session' because subabase stores that user in localStorage.

	return data;
}

// GET CURRENT LOGED IN USER (cuz we will need to render the app directly for the loged in user [authenticated user] if he opened the website in a later time)
export async function getCurrentUser() {
	// check first if there is a user [do this by checking if there is a session returned from supabase in the localStorage]
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null; // if there is no session this means there is no current user.

	// else, this means there is a current user, we need to get him from supabase, we can get him from the session but it's more secure to get from supabase.

	const { data, error } = await supabase.auth.getUser();
	if (error) throw new Error(error.message);

	// console.log(data);
	return data?.user; // we only interested in 'user' we don't need to get 'session' from 'data'
}

// SIGN UP
export async function signup({ email, password, fullName }) {
	let { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName: fullName,
				avatar: "",
			},
		},
	});

	if (error) throw new Error(error.message);
	// console.log(data);
	return data;
}

// LOG OUT
export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

// UPDATE CURRENT USER
export async function updateCurrentUser({ fullName, password, avatar }) {
	// Note! the user cannot update the fullName and password at the same time cuz each one is in a seperated form.

	// 1. Update password or fullName (as we cannot have both of them here at the same time.)
	let updatingData;
	if (password) updatingData = { password };
	if (fullName) updatingData = { data: { fullName } };

	const { data, error } = await supabase.auth.updateUser(updatingData);

	if (error) throw new Error(error.message);
	if (!avatar) return data; // in case of updating password no avatar will be provided, so return if there is not.

	// 2. Upload the avatar image.
	const fileName = `avatar-${data.user.id}-${Math.random()}`; // unique name
	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);
	if (storageError) throw new Error(storageError.message);

	// 3. Update avatar in the user.
	const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	});
	if (error2) throw new Error(error2.message);
	return updatedUser;
}
