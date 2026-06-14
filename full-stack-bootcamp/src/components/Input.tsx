import { useState } from "react";
import StarIcon from "../assets/Star Icon.png";
import AddIcon from "../assets/Edit Icon.png";

// TODO (Step 4): Build the Input component
// It needs:
//   1. A full-width rounded input field with a placeholder
//   2. A StarIcon button positioned inside the input on the right
//   3. An AddIcon button sitting outside the input to the right
//
// TODO (Step 9): Add useState for the value + a handleSubmit function

const Input = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-4xl">
        <input
          aria-label="Add task"
          placeholder="Add your Next Ramadan Task Here......"
          className="
            w-full bg-(--bg-dark) bg-opacity-20 backdrop-blur-[3px]
            border border-(--gold-cream) rounded-full
            py-4 px-6 pl-12
            placeholder:text-amber-200/50 text-amber-100
            outline-none
            focus:border-(--gold-cream) focus:ring-2 focus:ring-(--gold-primary)
          "
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2
                           w-10 h-10 flex items-center justify-center
                           bg-transparent hover:brightness-105">
          <img src={StarIcon} alt="Star Icon" className="w-8 h-8" />
        </button>
      </div>
      <button className="
        ml-4 px-4 py-4 rounded-full
        bg-(--bg-dark) bg-opacity-20 backdrop-blur-[3px]
        border border-(--gold-cream) text-amber-100
        hover:border-(--gold-cream)
      ">
        <img src={AddIcon} alt="Add Icon" className="w-5 h-5" />
      </button>

    </div>
  );
};

export default Input;

