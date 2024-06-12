import { UserStudyRole } from "@/features/types";

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
};

export type CreateTopicData = {
  title: string;
  description: string;
  unitId: string;
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
