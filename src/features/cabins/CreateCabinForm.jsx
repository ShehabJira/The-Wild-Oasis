import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	// sometimes this cabinToEdit doesn't exist, so put an empty object as default.
	const { id: editId, ...editValues } = cabinToEdit; // as there is an id on each input.
	const isEditSession = Boolean(editId); // if editId exists, then returns true. Because we want to know if he is editing or adding, as if he is editing we want to add the cabin values as default values, unlike adding we won't add anything.

	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();
	const isWorking = isCreating || isEditing;

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	//spread the result of calling register to each input to control it. and we give it the name of the field.
	function onSubmit(data) {
		// in case of editing, determine the image whether it's existing or not, if it's existing then pass it as it is(path), else then pass the new image.
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createCabin(
				{ ...data, image: data.image[0] },
				{
					onSuccess: (data) => {
						// console.log(data);
						reset();
						onCloseModal?.();
					},
				} // this callback right here can get access to the data the mutation function returns.
			);
	}
	function onError(errors) {
		// console.log(errors);
	}
	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			{/* handleSubmit(onSubmit, onError) this onSubmit will be called with actual data, and if the fields is empty and it is required the onError function will be called instead and it will recieves the actuall errors instead of data*/}
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This filed is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This filed is required",
						validate: (curValue) =>
							curValue <= getValues().regularPrice ||
							"Discount should be less than regular price",
						//validate takes a callback fn, if this callback return true the input will be validated, if it false the message will be taken with an error.
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
					disabled={isWorking}
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
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
					//Only execute it if this prop exists, as this form may be used anywhere else outside the modal. In turn, there is no any Modal to be closed.
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit cabin" : "Create new cabin"}
				</Button>
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
