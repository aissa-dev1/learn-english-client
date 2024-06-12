import axios from "axios";
import { UpdateUserNameData, UpdateUserPasswordData } from "./types";

class UserService {
  async updateUserName(
    id: string,
    data: UpdateUserNameData,
    accessToken: string
  ) {
    const axiosRes = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${id}/update-username`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async updatePassword(
    id: string,
    data: UpdateUserPasswordData,
    accessToken: string
  ) {
    const axiosRes = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${id}/update-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }

  async deleteOne(id: string, accessToken: string) {
    const axiosRes = await axios.delete(
      `${import.meta.env.VITE_API_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }
}

export const userService = new UserService();
