import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries(); // remove all queries from the cashe, cuz we stored the user into it.
			navigate("/login", { replace: true }); // in turn, going back history arrow will not work.
		},
	});
	return { logout, isLoading };
}
