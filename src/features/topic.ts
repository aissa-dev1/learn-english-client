import { create } from "zustand";
import {
  TopicDefinitionType,
  TopicType,
  TaskWithQuestionsType,
  TopicTaskType,
  TaskQuestionType,
} from "./types";

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
  createDefinition(data: TopicDefinitionType): void;
  updateTasksWithQuestions(tasksWithQuestions: TaskWithQuestionsType[]): void;
  setTasksWithQuestionsLoading(loading: boolean): void;
  createTask(data: TopicTaskType): void;
  createQuestion(data: TaskQuestionType): void;
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
  createDefinition(data) {
    set((state) => {
      const updatedDefinitions = [...state.definitions, data];
      return { ...state, definitions: updatedDefinitions };
    });
  },
  updateTasksWithQuestions(tasksWithQuestions) {
    set((state) => ({ ...state, tasksWithQuestions }));
  },
  setTasksWithQuestionsLoading(loading) {
    set((state) => ({ ...state, tasksWithQuestionsLoading: loading }));
  },
  createTask(data) {
    set((state) => {
      const updatedTasksWithQuestions = [
        ...state.tasksWithQuestions,
        {
          ...data,
          questions: [],
        },
      ];
      return { ...state, tasksWithQuestions: updatedTasksWithQuestions };
    });
  },
  createQuestion(data) {
    set((state) => {
      const updatedTasksWithQuestions = [...state.tasksWithQuestions].map(
        (twq) => {
          if (twq._id === data.taskId) {
            twq.questions.push(data);
            return twq;
          }
          return twq;
        }
      );
      return { ...state, tasksWithQuestions: updatedTasksWithQuestions };
    });
  },
}));

export default useTopicStore;
