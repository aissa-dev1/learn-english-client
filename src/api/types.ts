import { TopicQuestionAnswerType, UserStudyRole } from "@/features/types";

export type CreateAccountData = {
  email: string;
  password: string;
  userName: string;
  field: string;
  studyRole: UserStudyRole;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RefreshAccessTokenData = {
  token: string;
};

export type LogoutData = {
  token: string;
};

export type CreateUnitData = {
  title: string;
  studyRole: UserStudyRole;
};

export type CreateTopicData = {
  title: string;
  description: string;
  unitId: string;
};

export type CreateTopicDefinitionData = {
  title: string;
  description: string;
  examples: string[];
  topicId: string;
};

export type CreateTopicTaskData = {
  title: string;
  description: string;
  topicId: string;
};

export type CreateTaskQuestionData = {
  body: string;
  answerType: TopicQuestionAnswerType;
  options: string[];
  taskId: string;
  rightAnswerBody: string;
};

export type UpdateUserNameData = {
  userName: string;
};

export type UpdateUserPasswordData = {
  currentPassword: string;
  newPassword: string;
  rNewPassword: string;
};

export type SubmitUserAnswerData = {
  body: string;
  userId: string;
  questionId: string;
};
