import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

// Filtering and Sorting in cabins will occur in the Client-Side (we receive all cabins and filter and sort them in client side)
function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField={"discount"}
				options={[
					{ value: "all", label: "All" },
					{ value: "with-discount", label: "With discount" },
					{ value: "no-discount", label: "No discount" },
				]} // we need to put each option in a button. the field will be in the url and takes a value of one of the buttons on clicking.
			/>
			<SortBy
				options={[
					{ value: "name-asc", label: "Sort by name (A-Z)" },
					{ value: "name-desc", label: "Sort by name (Z-A)" },
					{ value: "regularPrice-asc", label: "Sort by price (low first)" },
					{ value: "regularPrice-desc", label: "Sort by price (high first)" },
					{ value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
					{ value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
				]} // we need to put these options in a select box.
			/>
		</TableOperations>
	);
}

export default CabinTableOperations;
