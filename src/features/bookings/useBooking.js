import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
	const { bookingId } = useParams();

	const { data: booking, isLoading } = useQuery({
		queryFn: () => getBooking(bookingId),
		queryKey: ["Booking", bookingId], //bookingId so whenever we switch between the booking pages, the data which of them gets, get refetched.
		retry: false, // by default, react query try to fetch the data 3 times, in case it fails at the begining, but sometimes that doesn't make so much sense, as in this case not finding data means it doesn't exist in the first place, and so there is no point in retring.
	});
	return { booking, isLoading };
}
