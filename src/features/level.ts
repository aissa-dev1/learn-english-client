import { create } from "zustand";
import { LevelType } from "./types";

interface State extends LevelType {
  loading: boolean;
  levels: LevelType[];
  levelsLoading: boolean;
}

interface Actions {
  update(level: LevelType): void;
  setLoading(loading: boolean): void;
  updateLevels(levels: LevelType[]): void;
  setLevelsLoading(loading: boolean): void;
}

const useLevelStore = create<State & Actions>((set) => ({
  _id: "",
  title: "",
  field: "law",
  studyRole: "student",
  loading: false,
  levels: [],
  levelsLoading: false,

  update(level) {
    set((state) => ({ ...state, ...level }));
  },
  setLoading(loading) {
    set((state) => ({ ...state, loading }));
  },
  updateLevels(levels) {
    set((state) => ({ ...state, levels }));
  },
  setLevelsLoading(loading) {
    set((state) => ({ ...state, levelsLoading: loading }));
  },
}));

export default useLevelStore;
