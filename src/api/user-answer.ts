import axios from "axios";
import { SubmitUserAnswerData } from "./types";

class UserAnswerService {
  async submitOne(data: SubmitUserAnswerData, accessToken: string) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/user-answers/submit-answer`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }
}

export const userAnswerService = new UserAnswerService();
