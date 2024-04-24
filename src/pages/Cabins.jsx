// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
	// useEffect(function () {
	//     getCabins().then((data) => console.log(data)); // remember this is an async function
	// }, []); //we will use React Query for getting data instead of getting it manually.
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<CabinTableOperations />
			</Row>
			{/*the default of the next Row is vertical*/}

			<Row>
				<CabinTable />
				<AddCabin />
			</Row>
		</>
		// we don't want to return an extra element, we just need to return all these elements from here separatly to the main in AppLayout, as the main element will be its container.
	);
}

export default Cabins;
