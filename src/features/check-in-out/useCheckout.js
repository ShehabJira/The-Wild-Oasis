import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
	const queryClient = useQueryClient();

	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-out",
			}),
		onSuccess: (data) => {
			// Remember! onSuccess takes the data which is returned from updateBooking function.
			toast.success(`Booking #${data.id} has checked out successfully`);
			queryClient.invalidateQueries({ active: true }); // this will invalidate all the queries that are currently active in the page (this is good as we don't have to remember all the query keys).
		},
		onError: () => toast.error("There was an error while checking out"),
	});
	return { checkout, isCheckingOut };
}
