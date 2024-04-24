import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as DeleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
		mutationFn: DeleteBookingApi,
		onSuccess: () => {
			toast.success("Booking has been deleted successfully");
			queryClient.invalidateQueries({ active: true });
		},
		onError: () => {
			toast.error("Booking could not be delted");
		},
	});
	return { deleteBooking, isDeletingBooking };
}
