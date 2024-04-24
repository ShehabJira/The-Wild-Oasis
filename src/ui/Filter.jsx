import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentFilter = searchParams.get(filterField) || options.at(0).value; // to mark the active one.

	function handleClick(value) {
		searchParams.set(filterField, value); //first, we need to set the state on searchParam itself. the URL doesn't have any params at the beginning and with the setter we "insert" the "discount" param and value.

		// if there is a page, reset it to page number 1
		if (searchParams.get("page")) searchParams.set("page", 1); // when we filter the results we must put the new results starting from the first page, so if we are in the third page and we filtered the results, we need to reset the page number to 1 and add the new results.

		setSearchParams(searchParams); // second, take this new searchParams and pass it into setSearchParams. to cause a re-render with the new value is set in the url.
		// searchParams.set() is used to update the query parameters in the URLSearchParams object
		// setSearchParams(searchParams) is used to update the url state with the modified URLSearchParams object causing a re-render.
		// This pattern is used to ensure that changes to the query parameters trigger a re-render of the component, allowing it to reflect the updated state and potentially re-fetch data based on the new parameters.
	}

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					onClick={() => handleClick(option.value)}
					active={currentFilter === option.value}
					disabled={currentFilter === option.value}
					key={option.value}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}

export default Filter;
// Consume the discount value from the url in the CabinTable and filter the cabins accordingly.
