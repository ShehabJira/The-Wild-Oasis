import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!cabins.length) return <Empty resourceName="cabins" />;

	// 1) FILTER
	const filterValue = searchParams.get("discount") || "all";
	let filteredCabins;
	if (filterValue === "all") filteredCabins = cabins;
	if (filterValue === "no-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	if (filterValue === "with-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

	// 2) SORT
	const sortByValue = searchParams.get("sortBy") || "startDate-asc"; // in the default we cannot use the empty string cuz will are splitting it, so write the actual value.
	const [field, direction] = sortByValue.split("-");
	const modifier = direction === "asc" ? 1 : -1; // 1 to multiply the - in sort method with positive to stay -, (which is the default of the sort, sorting ascendingly)
	const sortedCabins = filteredCabins.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);

	return (
		// Menus compound component will have Menus.Toggle functionality to display menu list, and Menus.List that has li's of buttons.
		// Menus also keep track of the toggle and the menu list of the current row, like modal, modal.open, and modal.window
		<Menus>
			{/* // This Table is not a styled component, it's a compound component. */}
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					// data={cabins}
					// data={filteredCabins}
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
			{/* //render prop [1] what to show => data={cabins}, [2] how to show it =>  render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} */}
		</Menus>
	);
}

export default CabinTable;
