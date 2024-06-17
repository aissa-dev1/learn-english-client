import { UserStudyField, UserStudyRole } from "@/features/types";
import axios from "axios";

class LevelService {
  async findLevels(
    field: UserStudyField,
    studyRole: UserStudyRole,
    accessToken: string
  ) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/levels/${field}-${studyRole}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async findOne(id: string, accessToken: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/levels/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }
}

export const levelService = new LevelService();
