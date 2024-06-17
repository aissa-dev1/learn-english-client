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
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold lg:text-xl">
          {title} {description}
        </h3>
      </div>
      <Questions list={questions} />
    </div>
  );
}
