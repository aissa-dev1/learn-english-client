import { userAnswerService } from "@/api/user-answer";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/features/user";
import { getAccessToken } from "@/utils/jwt";
import { useState } from "react";

interface Data {
  loading: boolean;
}

export function useSubmitUserAnswer() {
  const { toast } = useToast();
  const userId = useUserStore((state) => state.sub);
  const increaseUserStars = useUserStore((state) => state.increaseStars);
  const [submitUserAnswertData, setSubmitUserAnswertData] = useState<Data>({
    loading: false,
  });

  async function submitUserAnswer(answer: string, questionId: string) {
    const accessToken = getAccessToken();

    if (!accessToken || submitUserAnswertData.loading) return;

    try {
      setSubmitUserAnswertData((prev) => ({ ...prev, loading: true }));
      const axiosRes = await userAnswerService.submitOne(
        {
          body: answer,
          userId,
          questionId,
        },
        accessToken
      );
      if (axiosRes.data.increaseStars) {
        increaseUserStars();
      }
      toast({
        title: "Submit answer",
        description: axiosRes.data.message,
      });
      setSubmitUserAnswertData((prev) => ({ ...prev, loading: false }));
    } catch (error: any) {
      toast({
        title: "Cannot submit answer",
        description: error.response.data.message,
      });
      setSubmitUserAnswertData((prev) => ({ ...prev, loading: false }));
    }
  }

  return { submitUserAnswertData, setSubmitUserAnswertData, submitUserAnswer };
}
