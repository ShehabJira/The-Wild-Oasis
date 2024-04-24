import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

// our useEditCabin custom hook.
export function useEditCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		// mutationFn takes only 1 argument.
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("Cabin edited successfully");
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	return { isEditing, editCabin };
}
