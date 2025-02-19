import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
				...breakfast,
			}),
		onSuccess: (data) => {
			// Remember! onSuccess takes the data which is returned from updateBooking function.
			toast.success(`Booking #${data.id} has checked in successfully`);
			queryClient.invalidateQueries({ active: true }); // this will invalidate all the queries that are currently active in the page (this is good as we don't have to remember all the query keys).
			navigate("/");
		},
		onError: () => toast.error("There was an error while checking in"),
	});
	return { checkin, isCheckingIn };
}
