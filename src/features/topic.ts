import { create } from "zustand";
import { TopicDefinitionType, TopicType, TaskWithQuestionsType } from "./types";

interface State extends TopicType {
  loading: boolean;
  definitions: TopicDefinitionType[];
  definitionsLoading: boolean;
  tasksWithQuestions: TaskWithQuestionsType[];
  tasksWithQuestionsLoading: boolean;
}

interface Actions {
  update(topic: TopicType): void;
  setLoading(loading: boolean): void;
  updateDefinitions(definitions: TopicDefinitionType[]): void;
  setDefinitionsLoading(loading: boolean): void;
  updateTasksWithQuestions(tasksWithQuestions: TaskWithQuestionsType[]): void;
  setTasksWithQuestionsLoading(loading: boolean): void;
}

const useTopicStore = create<State & Actions>((set) => ({
  _id: "",
  title: "",
  description: "",
  unitId: "",
  loading: false,
  definitions: [],
  definitionsLoading: false,
  tasksWithQuestions: [],
  tasksWithQuestionsLoading: false,

  update(topic) {
    set((state) => ({ ...state, ...topic }));
  },
  setLoading(loading) {
    set((state) => ({ ...state, loading }));
  },
  updateDefinitions(definitions) {
    set((state) => ({ ...state, definitions }));
  },
  setDefinitionsLoading(loading) {
    set((state) => ({ ...state, definitionsLoading: loading }));
  },
  updateTasksWithQuestions(tasksWithQuestions) {
    set((state) => ({ ...state, tasksWithQuestions }));
  },
  setTasksWithQuestionsLoading(loading) {
    set((state) => ({ ...state, tasksWithQuestionsLoading: loading }));
  },
}));

export default useTopicStore;
