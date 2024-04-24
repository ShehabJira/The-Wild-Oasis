import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

// our useDeleteCabin custom hook
export function useDeleteCabin() {
	const queryClient = useQueryClient(); // so we can access the client and set some of its queries to invalid.
	// the way we do mutations(deleting, updating, or inserting) is not by using useQuery, but with useMutaion.

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success("Cabin Successfully Deleted");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		}, // after the success of deletion, set the cabins query in the client to invalid so that when the data in the cashe is invalid it make a new refetch.
		onError: (err) => {
			toast.error(err.message);
			//onError handler recieves the error that was thrown from deleteCabinApi function.
		},
	});
	return { isDeleting, deleteCabin };
	// it returns the mutate function that we can attach to our button to delete.
}
