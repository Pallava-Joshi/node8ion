import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login successful!");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({
      email,
      phone,
      password,
    }: {
      email: string;
      phone: number;
      password: string;
    }) => authService.register(email, phone, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Registration successful!");
      router.push("/");
    },
    onError: () => {
      toast.error("Registration failed");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Logout successful");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    user,
    isAuthenticated: !!user,
    isLoading,
  };
};
