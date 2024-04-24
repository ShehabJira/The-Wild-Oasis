import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

// our useCabins custom hook
export function useCabins() {
	// start using React Query
	// const x = useQuery({queryKey: ["cabin"], queryFn: getCabins});
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		// this is uniquely identify each data we are querying. (it's an array of string)
		queryKey: ["cabins"], //  if we used useQuery again on another page with this exact key, then the data would be read from the cashe.
		// this function is responsible for querying(fetching the data from API). this function needs to return a promise, so use getCabins function which is async await which return a promise or fetch function as it returns a promise.
		queryFn: getCabins,
	});
	// Note that React Query gives you some other information with the data, see x.
	return { isLoading, cabins, error };
}
