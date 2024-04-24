import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	const queryClient = useQueryClient();

	const { isLoading: isCreating, mutate } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("New cabin created successfully");
			reset(); // only if a new cabin is successfully added then reset the form.
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	//spread the result of calling register to each input to control it. and we give it the name of the field.
	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
	}
	function onError(errors) {
		// console.log(errors);
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			{/* handleSubmit(onSubmit, onError) this onSubmit will be called with actual data, and if the fields is empty and it is required the onError function will be called instead and it will recieves the actuall errors instead of data*/}
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isCreating}
					{...register("name", {
						required: "This filed is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreating}
					{...register("maxCapacity", {
						required: "This filed is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCreating}
					{...register("regularPrice", {
						required: "This filed is required",
						min: {
							value: 1,
							message: "Price should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isCreating}
					defaultValue={0}
					{...register("discount", {
						required: "This filed is required",
						validate: (curValue) =>
							curValue <= getValues().regularPrice ||
							"Discount should be less than regular price",
						//validate takes a callback fn, if this callback return true then the input will be validated, if it's false the message will be taken with an error.
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isCreating}
					defaultValue=""
					{...register("description", {
						required: "This filed is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					// type="file" will add it as attr to FileInput styled component. as FileInput will always deal with files, so we needn't type it here each time we use FileInput.
					{...register("image", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;

/* Note! the image.
  When you submit the form and console.log(data), note that everything is normal, except the image, it's a filelist which we want to retrieve the very first element => data.image[0]

  name: "009"
  maxCapacity: "4"
  regularPrice: "500"
  discount: "0"
  description: "Hello"
  image: FileList
   🔽
    0: File
      name: "cabin-002.jpg"
      size: 211817
      type: "image/jpeg"
      lastModified: 1699092367244
      lastModifiedDate: Sat Nov 04 2023 12:06:07 GMT+0200 (Eastern European Standard Time) {}
      webkitRelativePath: ""
      [[Prototype]]: File
      length: 1
    [[Prototype]]: FileList

  //-------------------------------------------------------------------------------------

    // if there was no image we would pass the data as:
    function onSubmit(data) {
        mutate(data);
    }

    // But as there is an image that needs to be sent correctly we will pass the data as:
    function onSubmit(data) {
        mutate({...data, image: data.image[0]})
    }

    // Note! data names should be exactly the same as the names we specified at supabase.
*/

//
//     audio/*	  The user can pick all sound files
//     video/*	  The user can pick all video files
//     image/*	  The user can pick all image files
//

//     ::file-selector-button            the btn you click on the file input to select a certain file.

//     files uploaded to file input are put in a fileList array, if you added an image remember to take the first one.
