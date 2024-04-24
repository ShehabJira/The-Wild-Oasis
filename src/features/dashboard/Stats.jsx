import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";
function Stats({ bookings, confirmedStays, cabinsCount, numDays }) {
	// 1.
	const numBookings = bookings.length;
	// 2.
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
	// 3.
	const checkins = confirmedStays.length;
	// 4.
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinsCount);

	//  Occupancy rate = num checkedin nights / all available nights(num days * num cabins)
	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + "%"}
			/>
		</> // we used a fragement cuz each Stat returns a div, and we need to return 4 divs, not 1 div that has them in.
	);
}

export default Stats;
