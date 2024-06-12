import { authService } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { UserStudyRole } from "@/features/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Data {
  email: string;
  password: string;
  userName: string;
  field: string;
  studyRole: UserStudyRole;
  termsAgree: boolean;
  loading: boolean;
}

export function useCreateAccount() {
  const [createAccountData, setCreateAccountData] = useState<Data>({
    email: "",
    password: "",
    userName: "",
    field: "law",
    studyRole: "student",
    termsAgree: false,
    loading: false,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  async function createAccount() {
    if (createAccountData.loading) return;
    if (!createAccountData.termsAgree) {
      toast({
        title: "Cannot create your account!",
        description: "Please agree to our terms and policy",
        variant: "destructive",
      });
      return;
    }
    try {
      setCreateAccountData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await authService.createAccount({
        email: createAccountData.email,
        password: createAccountData.password,
        userName: createAccountData.userName,
        field: createAccountData.field,
        studyRole: createAccountData.studyRole,
      });
      toast({
        title: "Done!",
        description: axiosRes.data.message,
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Cannot create your account!",
        description: error.response.data.message,
        variant: "destructive",
      });
      setCreateAccountData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { createAccountData, setCreateAccountData, createAccount };
}
