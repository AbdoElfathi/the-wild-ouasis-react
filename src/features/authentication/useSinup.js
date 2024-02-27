import { useMutation } from "@tanstack/react-query";
import { singupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (data) => singupApi(data),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account created successfully! Please verify the new account from the user's emial address"
      );
    },
  });

  return { signup, isLoading };
}
