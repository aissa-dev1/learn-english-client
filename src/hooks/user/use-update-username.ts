import { UpdateUserNameData } from "@/api/types";
import { userService } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/features/user";
import { getAccessToken } from "@/utils/jwt";
import { useState } from "react";

interface Data extends UpdateUserNameData {
  loading: boolean;
}

export function useUpdateUsername() {
  const { toast } = useToast();
  const userId = useUserStore((state) => state.sub);
  const updateMyName = useUserStore((state) => state.updateUserName);
  const [updateUserNameData, setUpdateUserNameData] = useState<Data>({
    userName: "",
    loading: false,
  });

  async function updateUserName() {
    const accessToken = getAccessToken();

    if (!accessToken) return;

    try {
      setUpdateUserNameData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await userService.updateUserName(
        userId,
        {
          userName: updateUserNameData.userName,
        },
        accessToken
      );
      updateMyName(updateUserNameData.userName);
      toast({
        title: "Done!",
        description: axiosRes.data.message,
      });
      setUpdateUserNameData((prev) => ({ ...prev, loading: false }));
    } catch (error: any) {
      toast({
        title: "Cannot update your username!",
        description: error.response.data.message,
        variant: "destructive",
      });
      setUpdateUserNameData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { updateUserNameData, setUpdateUserNameData, updateUserName };
}
