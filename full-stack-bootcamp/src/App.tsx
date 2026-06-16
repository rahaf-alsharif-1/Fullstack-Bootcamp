import { useState, useEffect } from "react";
import backGroundPattern from "./assets/Background Vector.svg";
import leftLantern from "./assets/left lanterns.png";
import rightLantern from "./assets/Right lanterns.png";
import Header from "./components/Header";
import Input from "./components/Input";
import TaskCard from "./components/TaskCard";
import TaskModal from "./components/TaskModal";
import ParticleBackground from "./components/ParticleBackground";
import { getAllTasks, updateTask, deleteTask } from "./api";
import type { Task } from "./api";

function App() {
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllTasks()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const openTask = tasks.find((t) => t.id === openTaskId) ?? null;

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdate = async (id: number, changes: Partial<Task>) => {
    try {
      const updated = await updateTask(id, changes);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setOpenTaskId(null);
    } catch (error) {
      console.error(error);
    }
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
        <Input onTaskAdded={handleTaskAdded} />

        {loading ? (
          <div className="text-amber-100 text-xl animate-pulse mt-10">Loading tasks...</div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                activeCrescents={task.activeCrescents}
                variant={task.variant}
                completed={task.completed}
                completedOn={task.completedOn}
                onClick={() => setOpenTaskId(task.id)}
              />
            ))}
          </div>
        )}

        {openTask && (
          <TaskModal
            open={openTaskId !== null}
            onClose={() => setOpenTaskId(null)}
            onToggleCompleted={() => handleUpdate(openTask.id, { completed: !openTask.completed, completedOn: !openTask.completed ? openTask.date : undefined })}
            onUpdate={(changes) => handleUpdate(openTask.id, changes)}
            onDelete={() => handleDelete(openTask.id)}
            id={openTask.id}
            title={openTask.title}
            description={openTask.description}
            date={openTask.date}
            activeCrescents={openTask.activeCrescents}
            variant={openTask.variant}
            completed={openTask.completed}
            completedOn={openTask.completedOn}
            summary={openTask.summary}
            volunteersNeeded={openTask.volunteersNeeded}
          />
        )}
      </div>
    </div>
  );
}

export default App;