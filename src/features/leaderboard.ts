import { create } from "zustand";
import { LeaderBoardUser } from "./types";

interface State {
  list: LeaderBoardUser[];
  loading: boolean;
}

interface Actions {
  updateList(list: LeaderBoardUser[]): void;
  setLoading(loading: boolean): void;
}

const useLeaderboardStore = create<State & Actions>((set) => ({
  list: [],
  loading: false,

  updateList(list) {
    set((state) => ({ ...state, list }));
  },
  setLoading(loading) {
    set((state) => ({ ...state, loading }));
  },
}));

export default useLeaderboardStore;
