import { TaskWithQuestionsType } from "@/features/types";
import Questions from "./questions";

interface Props extends TaskWithQuestionsType {}

export default function TaskWithQuestions({
  title,
  description,
  questions,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-center lg:text-xl lg:text-left">
        {title} {description}
      </h3>
      <Questions list={questions} />
    </div>
  );
}
