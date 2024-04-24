import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentStays() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get("last")
		? 7
		: Number(searchParams.get("last"));
	const queryDate = subDays(new Date(), numDays).toISOString(); // the string date of 7, 30, or 90 days passed from now(today's date).

	const { data: stays, isLoading } = useQuery({
		queryFn: () => getStaysAfterDate(queryDate),
		queryKey: ["stays", `last-${numDays}`],
	});

	const confirmedStays = stays?.filter(
		(stay) => stay.status === "checked-in" || stay.status === "checked-out"
	); // as the guest may never show up at the hotel.

	return { stays, isLoading, confirmedStays, numDays };
}
