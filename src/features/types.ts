export type UserType = {
  sub: string;
  email: string;
  userName: string;
  field: string;
  stars: number;
  studyRole: UserStudyRole;
  joinedAt: number;
};

export type UserStudyRole = "student" | "teacher";

export type UnitType = {
  _id: string;
  title: string;
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
  topicId: string;
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
