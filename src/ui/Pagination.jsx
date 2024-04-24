import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${(props) =>
		props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
	color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

// 'count' is the count of items you need to make a pagination for.
function Pagination({ count }) {
	// [1] calculating next or prev page always depends on the current page.
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = !searchParams.get("page")
		? 1
		: Number(searchParams.get("page"));
	// [2] when we implement the pagination we will need to know the number of pages.
	const pagesCount = Math.ceil(count / PAGE_SIZE);

	function nextPage() {
		const next = currentPage === pagesCount ? pagesCount : currentPage + 1;
		searchParams.set("page", next);
		setSearchParams(searchParams);
	}
	function prevPage() {
		const prev = currentPage === 1 ? 1 : currentPage - 1;
		searchParams.set("page", prev);
		setSearchParams(searchParams);
	}

	if (pagesCount <= 1) return null; // we don't need to make a pagination if we only have 1 page.
	return (
		<StyledPagination>
			<P>
				Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
				<span>
					{currentPage === pagesCount ? count : currentPage * PAGE_SIZE}
				</span>{" "}
				of <span>{count} </span>
				results
			</P>
			<Buttons>
				<PaginationButton onClick={prevPage} disabled={currentPage === 1}>
					<HiChevronLeft /> <span>Previous</span>
				</PaginationButton>
				<PaginationButton
					onClick={nextPage}
					disabled={currentPage === pagesCount}
				>
					<span>Next</span> <HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}

export default Pagination;
