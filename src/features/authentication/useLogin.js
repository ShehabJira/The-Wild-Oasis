import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (user) => {
			navigate("/dashboard", { replace: true });
			queryClient.setQueryData(["user"], user.user); // if you want to store the current user in react query cashe.
		},
		onError: (err) => {
			console.log("Error", err);
			toast.error("Incorrect email or password");
		},
	});

	return { login, isLoading };
}
