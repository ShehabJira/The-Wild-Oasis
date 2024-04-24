import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// make react query take the responsibility of getCurrentUser service.
export function useUser() {
	const { data: user, isLoading } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});
	return { isAuthenticated: user?.role === "authenticated", isLoading, user };
}
