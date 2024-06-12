import { userService } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/features/user";
import { getAccessToken } from "@/utils/jwt";
import { useState } from "react";
import { useLogout } from "../auth/use-logout";

interface Data {
  confirmText: string;
  loading: boolean;
}

export default function useDeleteAccount() {
  const { toast } = useToast();
  const userId = useUserStore((state) => state.sub);
  const [deleteAccountData, setDeleteAccountData] = useState<Data>({
    confirmText: "",
    loading: false,
  });
  const confirmText = "delete my account";
  const { logout } = useLogout();

  async function deleteAccount() {
    const accessToken = getAccessToken();

    if (!accessToken) return;
    if (deleteAccountData.confirmText.toLowerCase() !== confirmText) {
      toast({
        title: "Cannot delete your account!",
        description: `Please enter '${confirmText}' to continue!`,
        variant: "destructive",
      });
      return;
    }

    setDeleteAccountData((prev) => ({ ...prev, loading: true }));
    const axiosRes = await userService.deleteOne(userId, accessToken);
    await logout();
    toast({
      title: "Done!",
      description: axiosRes.data.message,
    });
    setDeleteAccountData((prev) => ({ ...prev, loading: false }));
  }

  return { deleteAccountData, setDeleteAccountData, deleteAccount };
}
