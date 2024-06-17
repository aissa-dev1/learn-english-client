import { create } from "zustand";
import { UserType } from "./types";

interface State extends UserType {
  fetched: boolean;
  loading: boolean;
}

interface Actions {
  update(user: UserType): void;
  updateUserName(userName: string): void;
  increaseStars(by?: number): void;
  setFetched(fetched: boolean): void;
  setLoading(loading: boolean): void;
}

export const useUserStore = create<State & Actions>((set) => ({
  sub: "",
  email: "",
  userName: "",
  field: "law",
  role: "user",
  studyRole: "student",
  stars: 0,
  joinedAt: 0,
  fetched: false,
  loading: false,

  update: (user) => {
    return set((state) => ({ ...state, ...user }));
  },
  updateUserName: (userName) => {
    return set((state) => ({ ...state, userName }));
  },
  increaseStars: (by = 1) => {
    return set((state) => ({ ...state, stars: state.stars + by }));
  },
  setFetched: (fetched) => {
    return set((state) => ({ ...state, fetched }));
  },
  setLoading: (loading) => {
    return set((state) => ({ ...state, loading }));
  },
}));
