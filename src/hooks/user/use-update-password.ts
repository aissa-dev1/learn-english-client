import { UpdateUserPasswordData } from "@/api/types";
import { userService } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/features/user";
import { getAccessToken } from "@/utils/jwt";
import { useState } from "react";

interface Data extends UpdateUserPasswordData {
  loading: boolean;
}

export function useUpdatePassword() {
  const { toast } = useToast();
  const userId = useUserStore((state) => state.sub);
  const [updatePasswordData, setUpdatePasswordData] = useState<Data>({
    currentPassword: "",
    newPassword: "",
    rNewPassword: "",
    loading: false,
  });

  async function updatePassword() {
    const accessToken = getAccessToken();

    if (!accessToken) return;

    try {
      setUpdatePasswordData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await userService.updatePassword(
        userId,
        {
          currentPassword: updatePasswordData.currentPassword,
          newPassword: updatePasswordData.newPassword,
          rNewPassword: updatePasswordData.rNewPassword,
        },
        accessToken
      );
      toast({
        title: "Done!",
        description: axiosRes.data.message,
      });
      setUpdatePasswordData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        rNewPassword: "",
        loading: false,
      }));
    } catch (error: any) {
      toast({
        title: "Cannot update your password!",
        description: error.response.data.message,
        variant: "destructive",
      });
      setUpdatePasswordData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { updatePasswordData, setUpdatePasswordData, updatePassword };
}
