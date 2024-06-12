import axios from "axios";
import {
  CreateAccountData,
  LoginData,
  LogoutData,
  RefreshAccessTokenData,
} from "./types";

class AuthenticationService {
  async createAccount(data: CreateAccountData) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/create-account`,
      data
    );
    return axiosRes;
  }

  async login(data: LoginData) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      data
    );
    return axiosRes;
  }

  async refreshAccessToken(data: RefreshAccessTokenData) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh-access-token`,
      data
    );
    return axiosRes;
  }

  async logout(data: LogoutData, accessToken: string) {
    const axiosRes = await axios.delete(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return axiosRes;
  }
}

export const authService = new AuthenticationService();
