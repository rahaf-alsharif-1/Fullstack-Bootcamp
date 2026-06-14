# 🏆 Ramadan Community Board — Challenges & Points

> Earn points by customising and extending the project. The more creative, the better!
> Complete tasks in any order. Show your work at the end for points to be awarded.

---

## 🥇 Challenges

---

### Challenge 1 — Total Theme Overhaul (40 pts + 10 pts aesthetic)

Rebuild the visual identity of the app around a completely different theme. Examples: a space explorer board, a gaming quest tracker, a fitness challenge app, a travel bucket list.

- [ ] Change the app name in `Header.tsx` and `index.html` `<title>`
- [ ] Replace the Ramadan colour tokens in `index.css` with a new colour palette (minimum 2 colour changes)
- [ ] Swap out or replace some images in `src/assets/` to match the new theme
- [ ] Update the task cards to fit the new theme (minimum 5 tasks)

> **+10 pts bonus** awarded for overall visual polish — how good does the finished app actually look? Judges will assess colour harmony, image choices, and how cohesive the new theme feels end-to-end.

---

### Challenge 2 — Add a Tag to Each Task (30 pts)

Add a `tag` field to each task and display it as a badge on the card. Since tasks are generated and stored by the Flask backend, both the backend and frontend need updating.

- [ ] Update `crud.py` so the Gemini prompt generates a `tag` field and it is included in the saved and returned task
- [ ] Add `tag?: string` to the `Task` type in `src/api.ts` and return it from `mapTask()`
- [ ] Add `tag?: string` to the `TaskCardProps` type in `TaskCard.tsx`
- [ ] Display the tag as a small badge somewhere on the card

> **Hints**
>
> **Step 1 — Update the backend**  
> In `crud.py`, find the Gemini prompt and add `tag` to the list of fields it should generate (e.g. `"community"`, `"personal"`, `"urgent"`). Make sure `tag` is included when the task is saved and returned from all crud functions.
>
> **Step 2 — Update `src/api.ts`**  
> Add `tag` to the `Task` type and return it from `mapTask()`:
> ```ts
> export type Task = {
>   // ... existing fields ...
>   tag?: string;
> };
>
> function mapTask(raw: any): Task {
>   return {
>     // ... existing fields ...
>     tag: raw.tag,
>   };
> }
> ```
>
> **Step 3 — Update `TaskCard.tsx`**  
> Add `tag?: string` to `TaskCardProps` and destructure it in the component function:
> ```tsx
> tag?: string;
> ```
>
> **Step 4 — Render the badge**  
> Inside the card JSX, add this wherever makes sense visually:
> ```tsx
> {tag && (
>   <span className="text-xs px-2 py-0.5 rounded-full border border-amber-400 text-amber-300">
>     {tag}
>   </span>
> )}
> ```

---

### Challenge 3 — Dedicated Complete Route (10 pts)

Instead of using the general `PUT /todos/<id>` route to mark a task as completed, create a dedicated route just for it.

- [ ] Add a `PUT /todos/<id>/complete` route to `app.py` that sets the task as completed
- [ ] Add a `completeTask(id)` function to `src/api.ts` that calls the new route
- [ ] Update `App.tsx` to call `completeTask` instead of `updateTask` when marking a task as complete

> **Hints**
>
> **Step 1 — Add the backend route**  
> In `app.py`, register a new `PUT` route below the existing ones:
> ```python
> @app.route('/todos/<int:todo_id>/complete', methods=['PUT'])
> def complete_todo(todo_id):
>     todo = crud.get_todo(todo_id)
>     if todo is None:
>         return jsonify({'error': 'Todo not found'}), 404
>     data = crud.update_todo(todo_id, {'completed': True, 'completedOn': todo['date']})
>     return jsonify(data), 200
> ```
>
> **Step 2 — Add to `src/api.ts`**  
> Add a new exported function alongside the existing ones:
> ```ts
> export async function completeTask(id: number): Promise<Task> {
>   const response = await fetch(`${BASE_URL}/todos/${id}/complete`, { method: "PUT" });
>   if (!response.ok) throw new Error("Failed to complete task");
>   return mapTask(await response.json());
> }
> ```
>
> **Step 3 — Update `App.tsx`**  
> Import `completeTask` and update `handleToggleCompleted` so the "mark complete" branch calls the new route:
> ```tsx
> import { getAllTasks, completeTask, updateTask, deleteTask } from "./api";
> // ...
> const handleToggleCompleted = async (id: number) => {
>   const task = tasks.find((t) => t.id === id);
>   if (!task) return;
>   const updated = task.completed
>     ? await updateTask(id, { completed: false, completedOn: undefined })
>     : await completeTask(id);
>   setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
> };
> ```

---

### Bonus — GitHub Repo (10 pts)

Push your completed project to a public GitHub repository.

- [ ] Create a public GitHub repository
- [ ] Push your frontend code (`full-stack-bootcamp/`) to the repository
- [ ] Push your backend code to the same repository in a separate folder (e.g. `backend/`)
- [ ] Your repo must have a `README.md` at the root with your name and a short description of the project

---

## 📊 Points Summary

| Challenge | Points |
|---|---|
| Challenge 1 — Theme Overhaul (code) | 40 pts |
| Challenge 1 — Overall Aesthetic | 10 pts |
| Challenge 2 — Tag Badge | 30 pts |
| Challenge 3 — Dedicated Complete Route | 10 pts |
| Bonus — GitHub Repo | 10 pts |
| **Total possible** | **100 pts** |

---

> **Tip:** Start with whichever challenge excites you most. There is no wrong order — make the project yours!
