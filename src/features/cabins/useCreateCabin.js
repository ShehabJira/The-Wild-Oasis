import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

// our useCreateCabin custom hook
export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isCreating, mutate: createCabin } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("New cabin created successfully");
			// reset(); // only if a new cabin is successfully added then reset the form.
		}, // we not only can use this onSuccess on useMutation but also we can use it right when the mutation happens. as we cannot reset the Form from here, but we can use reset right after we createCabin as it's a mutation function.
		onError: (err) => {
			toast.error(err.message);
		},
	});
	return { isCreating, createCabin };
}
