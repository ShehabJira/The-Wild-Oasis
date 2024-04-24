// REMEMBER THAT THE PAGE SHOULD NOT FETCH DATA OR ANY OTHER SIDE EFFECTS.
// This makes the pages folder a lot cleaner, but not a hard rule in React.
// All the things that are related to bookings will live in the bookings folder, and forget about this Booking page. and all the pages folder.
import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
	return <BookingDetail />;
}

export default Booking;
