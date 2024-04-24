import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentSortByValue = searchParams.get("sortBy") || ""; // empty string will select the first element.

	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			handleChange={handleChange}
			value={currentSortByValue}
			type="white"
		/>
	);
}

export default SortBy;
