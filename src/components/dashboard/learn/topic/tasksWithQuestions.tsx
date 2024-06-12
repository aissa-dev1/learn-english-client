import { TaskWithQuestionsType } from "@/features/types";
import TaskWithQuestions from "./taskWithQuestions";

interface Props {
  list: TaskWithQuestionsType[];
}

export default function TasksWithQuestions({ list }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {list.map((taskwithQuestions) => (
        <TaskWithQuestions key={taskwithQuestions._id} {...taskwithQuestions} />
      ))}
    </div>
  );
}
