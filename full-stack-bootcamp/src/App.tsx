import { useState } from "react";
import backGroundPattern from "./assets/Background Vector.svg";
import leftLantern from "./assets/left lanterns.png";
import rightLantern from "./assets/Right lanterns.png";
import Header from "./components/Header";
import Input from "./components/Input";
import TaskCard from "./components/TaskCard";
import TaskModal from "./components/TaskModal";
import ParticleBackground from "./components/ParticleBackground";
import type { TaskCardProps } from "./components/TaskCard";
import taskData from "./data.json";

type Task = TaskCardProps & { id: number };
const TASKS = taskData as Task[];

function App() {
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState(TASKS);

  const openTask = tasks.find((t) => t.id === openTaskId) ?? null;

  const handleToggleCompleted = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? t.completed
            ? { ...t, completed: false, completedOn: undefined }
            : { ...t, completed: true, completedOn: t.date, activeCrescents: 5 }
          : t
      )
    );
  };

  return (
    <div
      className="min-h-screen bg-(--bg-dark) text-white relative overflow-hidden font-lexend flex flex-col items-center"
      style={{ backgroundImage: `url(${backGroundPattern})` }}
    >
      <ParticleBackground />
      <img src={leftLantern} className="absolute top-0 left-0 w-32 md:w-70 opacity-80 z-2" />
      <img src={rightLantern} className="absolute top-0 right-0 w-32 md:w-70 opacity-80 z-2" />

      <div className="relative z-2 mx-auto w-[95vw] min-h-[90vh] border-[3px] border-(--text-cream) flex flex-col items-center gap-10 py-12 px-10 shadow-2xl my-12">
        <Header />
        <Input />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} onClick={() => setOpenTaskId(task.id)} />
          ))}
        </div>
      </div>

      {openTask && (
        <TaskModal
          open={openTaskId !== null}
          onClose={() => setOpenTaskId(null)}
          onToggleCompleted={() => handleToggleCompleted(openTask.id)}
          {...openTask}
        />
      )}
    </div>
  );
}

export default App;