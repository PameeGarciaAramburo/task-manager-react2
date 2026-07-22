/// <reference types="vitest" />
import { vi } from "vitest";
import request from "supertest";
// vitest provides globals (describe, it, expect, vi) so no import is required here

// Mock de la base de datos
vi.mock("./db", () => ({
  default: {
    query: vi.fn().mockResolvedValue({
      rows: [
        { id: 1, title: "Comprar pan", completed: false }
      ]
    })
  }
}));

import app from "./app";

describe("API Tasks", () => {
  it("GET /tasks responde correctamente", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});