import { create } from "zustand";
import { TopicType, UnitType } from "./types";

interface State extends UnitType {
  loading: boolean;
  units: UnitType[];
  unitsLoading: boolean;
  topics: TopicType[];
  topicsLoading: boolean;
}

interface Actions {
  update(unit: UnitType): void;
  setLoading(loading: boolean): void;
  updateUnits(units: UnitType[]): void;
  setUnitsLoading(loading: boolean): void;
  updateTopics(topics: TopicType[]): void;
  setTopicsLoading(loading: boolean): void;
}

const useUnitStore = create<State & Actions>((set) => ({
  _id: "",
  title: "",
  loading: false,
  units: [],
  unitsLoading: false,
  topics: [],
  topicsLoading: false,

  update(unit) {
    set((state) => ({ ...state, ...unit }));
  },
  setLoading(loading) {
    set((state) => ({ ...state, loading }));
  },
  updateUnits(units) {
    set((state) => ({ ...state, units }));
  },
  setUnitsLoading(loading) {
    set((state) => ({ ...state, unitsLoading: loading }));
  },
  updateTopics(topics) {
    set((state) => ({ ...state, topics }));
  },
  setTopicsLoading(loading) {
    set((state) => ({ ...state, topicsLoading: loading }));
  },
}));

export default useUnitStore;
