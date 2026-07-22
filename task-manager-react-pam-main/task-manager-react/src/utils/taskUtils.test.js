import { describe, it, expect } from "vitest";
import {
  esTituloValido,
  contarTareasPendientes,
} from "./taskUtils.js";

describe("esTituloValido", () => {
  it("acepta un título válido", () => {
    expect(esTituloValido("Comprar pan")).toBe(true);
  });

  it("rechaza un título vacío", () => {
    expect(esTituloValido("   ")).toBe(false);
  });
});

describe("contarTareasPendientes", () => {
  it("cuenta correctamente las tareas pendientes", () => {
    const tareas = [
      { completed: true },
      { completed: false },
      { completed: false },
    ];

    expect(contarTareasPendientes(tareas)).toBe(2);
  });

  it("devuelve 0 cuando no hay tareas", () => {
    expect(contarTareasPendientes([])).toBe(0);
  });
});