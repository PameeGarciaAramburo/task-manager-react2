import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  res.json(result.rows);
});

app.post("/tasks", async (req: Request, res: Response) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *",
    [title]
  );
  res.json(result.rows[0]);
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.json({ message: "Task deleted" });
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
    [id]
  );
  res.json(result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});