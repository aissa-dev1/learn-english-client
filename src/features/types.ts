export type UserType = {
  sub: string;
  email: string;
  userName: string;
  field: UserStudyField;
  stars: number;
  role: UserRole;
  studyRole: UserStudyRole;
  joinedAt: number;
};

export type UserRole = "user" | "admin";

export type UserStudyRole = "student" | "teacher";

export type UserStudyField = "law";

export type LevelType = {
  _id: string;
  title: string;
  field: UserStudyField;
  studyRole: UserStudyRole;
};

export type UnitType = {
  _id: string;
  title: string;
  studyRole: UserStudyRole;
};

export type TopicType = {
  _id: string;
  title: string;
  description: string;
  unitId: string;
};

export type TopicDefinitionType = {
  _id: string;
  title: string;
  description: string;
  examples: string[];
  topicId: string;
};

export type TopicTaskType = {
  _id: string;
  title: string;
  description: string;
  topicId: string;
};

export type TopicQuestionAnswerType =
  | "question_answer"
  | "true_false"
  | "define_word"
  | "write_paragraph"
  | "quiz";

export type TaskQuestionType = {
  _id: string;
  body: string;
  options: string[];
  answerType: TopicQuestionAnswerType;
  taskId: string;
  rightAnswerId: string;
};

export type TaskWithQuestionsType = TopicTaskType & {
  questions: TaskQuestionType[];
};

export type LeaderBoardUser = {
  _id: string;
  userName: string;
  stars: number;
};
