import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

// Filtering and Sorting in bookings will occur in the API-Side (want the API to only send me the bookings which is checked-in, out, or unconfirmed) (and this will be done in the supabase query)
function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: "all", label: "All" },
					{ value: "checked-out", label: "Checked out" },
					{ value: "checked-in", label: "Checked in" },
					{ value: "unconfirmed", label: "Unconfirmed" },
				]}
			/>

			<SortBy
				options={[
					{ value: "startDate-desc", label: "Sort by date (recent first)" },
					{ value: "startDate-asc", label: "Sort by date (earlier first)" },
					{
						value: "totalPrice-desc",
						label: "Sort by amount (high first)",
					},
					{ value: "totalPrice-asc", label: "Sort by amount (low first)" },
				]}
			/>
		</TableOperations>
	);
}

export default BookingTableOperations;
