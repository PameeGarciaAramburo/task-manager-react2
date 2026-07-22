import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok"
  });
});

app.get("/tasks", async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM "Task" ORDER BY id ASC');
  res.json(result.rows);
});

app.post("/tasks", async (req: Request, res: Response) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO "Task" (title, completed) VALUES ($1, false) RETURNING *',
    [title]
  );
  res.json(result.rows[0]);
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM "Task" WHERE id = $1', [id]);
  res.json({ message: "Task deleted" });
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    'UPDATE "Task" SET completed = NOT completed WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(result.rows[0]);
});

export default app;