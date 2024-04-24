import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	// FILTER
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue }; // if there is no any filter value or filter value === 'all' we needn't filter anything.

	// SORT
	const sortByValue = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByValue.split("-");
	const sortBy = { field, direction };

	// PAGINATION
	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

	// QUERY
	const {
		data: { data: bookings, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryFn: () => getBookings({ filter, sortBy, page }),
		queryKey: ["bookings", filter, sortBy, page], //whenever they get changed, we want to refetch. (think of it as it's the dependency array of useQuery)
	});

	// PRE-FETCHING (first we need to query client, then on there we call prefetchQuery method)
	const pagesCount = count / PAGE_SIZE;
	// prefetch the next page, but don't prefetch the next page if you are in the last page.
	if (page < pagesCount)
		queryClient.prefetchQuery({
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
			queryKey: ["bookings", filter, sortBy, page + 1],
		});
	// prefetch the previous page
	if (page > 1)
		queryClient.prefetchQuery({
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
			queryKey: ["bookings", filter, sortBy, page - 1],
		});
	return { bookings, isLoading, count, error };
}
