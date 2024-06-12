import { TaskQuestionType } from "@/features/types";
import QaQuestion from "./question-types/qaQuestion";
import TrueFalseQuestion from "./question-types/trueFalseQuestion";
import DefineQuestion from "./question-types/defineQuestion";
import WriteParagraph from "./question-types/writeParagraph";
import QuizQuestion from "./question-types/quizQuestion";

interface Props {
  list: TaskQuestionType[];
}

export default function Questions({ list }: Props) {
  if (list.length <= 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4">
      {list.map((question) => {
        switch (question.answerType) {
          case "question_answer":
            return <QaQuestion key={question._id} {...question} />;

          case "true_false":
            return <TrueFalseQuestion key={question._id} {...question} />;

          case "define_word":
            return <DefineQuestion key={question._id} {...question} />;

          case "write_paragraph":
            return <WriteParagraph key={question._id} {...question} />;

          case "quiz":
            return <QuizQuestion key={question._id} {...question} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
