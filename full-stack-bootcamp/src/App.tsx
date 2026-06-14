// ─────────────────────────────────────────────────────────────
// Build this file step by step as you complete each component:
//
//   Step 2  → build the background (SVG, lanterns, gold frame) 
//   Step 3  → import Header        → add <Header /> inside the frame
//   Step 4  → import Input         → add <Input /> below Header
//   Step 5b → import TaskCard      → add useState, import data.json, render card grid
//   Step 6b → import ParticleBackground → add <ParticleBackground /> first in root div
//   Step 7b → import TaskModal     → add handleToggleCompleted + wire <TaskModal />
//   Step 9  → connect to the Flask backend (useEffect + handleSubmit)
// ─────────────────────────────────────────────────────────────
import backGroundPattern from "./assets/Background Vector.svg"
import leftLantern from "./assets/left lanterns.png"
import rightLantern from "./assets/Right lanterns.png"
import Header from "./components/Header"
import Input from "./components/Input"
import { useState }          from "react";
import TaskCard               from "./components/TaskCard";
import type { TaskCardProps } from "./components/TaskCard";
import taskData               from "./data.json";
import ParticleBackground from "./components/ParticleBackground";

type Task = TaskCardProps & { id: number };
const TASKS = taskData as Task[];
function App() {
  const [tasks, setTasks] = useState(TASKS);
  // TODO (Step 5b): Add state — openTaskId and tasks
  // const [openTaskId, setOpenTaskId] = useState<number | null>(null);
  // const [tasks, setTasks] = useState(taskData as Task[]);

  return (
    <div className='min-h-screen bg-(--bg dark) text-white relative overflow-hidden font-lexend flex flex-col items-center' style={{backgroundImage:`url(${backGroundPattern})`}}>
    
    <img src={leftLantern} className="absolute top0 left-0 w-32 md:w-70 opacity-80 z-2"/>
    <img src={rightLantern} className="absolute top0 right-0 w-32 md:w-70 opacity-80 z-2"/>
    <div className="relative z-2 mx-auto w-[95vw] min-h-[90vh] border-[3px] border-(--text-cream) flex flex-col items-center gap-10 py-12 px-10 shadow-2xl my-12">
        {/* Components will go here */}
    <Header />
    <Input />
    
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start overflow-hidden"> 
  {tasks.map((task) => (<TaskCard key={task.id} {...task} />))} 
  </div>
    </div>
    </div>
  );
}

export default App;
