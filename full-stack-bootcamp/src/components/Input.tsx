import { useState } from "react";
import StarIcon from "../assets/Star Icon.png";
import AddIcon from "../assets/Edit Icon.png";
import type { Task } from "../api";

type InputProps = {
  onTaskAdded: (task: Task) => void;
};

const Input = ({ onTaskAdded }: InputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    try {
      onTaskAdded(await import("../api").then(m => m.createTask(trimmed)));
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-4xl">
        <input
          aria-label="Add task"
          placeholder="Add your Next Ramadan Task Here......"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full bg-(--bg-dark) bg-opacity-20 backdrop-blur-[3px] border border-(--gold-cream) rounded-full py-4 px-6 pl-12 placeholder:text-amber-200/50 text-amber-100 outline-none focus:border-(--gold-cream) focus:ring-2 focus:ring-(--gold-primary)"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center">
          <img src={StarIcon} alt="" className="w-8 h-8" />
        </span>
      </div>
      <button
        onClick={handleSubmit}
        className="ml-4 px-4 py-4 rounded-full bg-(--bg-dark) bg-opacity-20 backdrop-blur-[3px] border border-(--gold-cream) text-amber-100 hover:border-(--gold-cream) transition-colors cursor-pointer"
      >
        <img src={AddIcon} alt="Add Icon" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Input;