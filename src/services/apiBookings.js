import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// we will get the values of filter and sortBy from useBookings.js and pass them here, Cuz we cannot use useSearchParams in this function.
// filter will be an object which contains the field and the value.
export async function getBookings({ filter, sortBy, page }) {
	// const { data, error } = await supabase.from("bookings").select("*");
	// const { data, error } = await supabase.from("bookings").select("*, cabins(*), guests(*)"); //we can get the data of the tables we are referencing in the bookings table.
	const query = supabase.from("bookings").select(
		"id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
		{ count: "exact" } // thus, the query will return count as well with the data.
	);

	// FILTER
	if (filter) query.eq(filter.field, filter.value);
	// if (filter !== null) query[filter.method || 'eq'](filter.field, filter.value); // if you want to make the method to be flexible as well, just provided it in the filter object if you want.

	// SORT
	if (sortBy)
		query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

	// PAGINATION     <><><>         0 -> 9 (10 items), 10 -> 19 (10 items)       items starts from index 0 in supabase
	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + (PAGE_SIZE - 1);
		query.range(from, to);
	}

	const { data, error, count } = await query;

	// attaching some methods at the end of the query to filter the received data.
	// .eq("status", "unconfirmed")  => will only send bookings which status equal to unconfirmed.
	// .gte("totalPrice", 5000) => will only send bookings which totalPrice greater than or equal to 5000.
	// .lte("totalPrice", 5000) => will only send bookings which totalPrice less than or equal to 5000.
	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	return { data, count };
}

export async function getBooking(id) {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, cabins(*), guests(*)") // will select from bookings everything and put them in an array.
		.eq("id", id) // will make the array to only have the booking with the equivalent id.
		.single(); // will get that single booking object from that array.

	if (error) {
		console.error(error);
		throw new Error("Booking not found");
	}

	return data;
}

// difference between bookings and stays. In the last month(30 days), we could have 50 bookings, not all of them would get a stay in the same month they will get their stays on a different periods of time, so may be there would be 25 stays in that month and the others would be in the upcoming days or months, and these 25 stays NOT all of them are confirmed because some guests may have got a stay in that month but he has never come to the hotel.
// we could know the number of bookings in the last month by the created_at that has occured in that month, and the stays by the startDate that has occured in that month, and the confirmed stays simply by their start date together with the status of either checked in or checked out.
// So the bookings are the actual sales. So for example, in the last 30 days the hotel might have sold 50 bookings online, but maybe 30 of these guests will only arrive and check into the hotel in the far future like month or even a year after they have booked the booking. Now, on the other hand, we have the stays. So stays are the actual check-ins of guests as they arrive for their bookings in our hotel that we can identify stays simply by their start date together with the status of either checked in or checked out. So again, as a summary, a booking is an actual sale while a stay is a guest actually staying in the hotel.

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		.select("created_at, totalPrice, extrasPrice")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(fullName)")
		.gte("startDate", date)
		.lte("startDate", getToday());

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

// Activity means that there is a check in 'or' a check out today
// In turn, We want to get the stays which its start date is today, so We can check them in. And the stays which its end date is today, so we can check them out.
export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(fullName, nationality, countryFlag)")
		.or(
			`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
		) //                                                    ⬆ this comma represents an or operator ||
		.order("created_at");
	// so after selecting * (everything) we will attach that following string, to filter the results based on 'something or something'
	// or(..., ...)  => ... || ...
	// and(..., ...) => ... && ...

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))
	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
	return data;
}

export async function updateBooking(id, obj) {
	const { data, error } = await supabase
		.from("bookings")
		.update(obj)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
}

export async function deleteBooking(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from("bookings").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
	return data;
}
