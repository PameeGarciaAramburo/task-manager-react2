import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskInput from "./TaskInput";

describe("TaskInput", () => {
  it("llama a onAdd al hacer clic en el botón", async () => {
    const onAdd = vi.fn();
    const onChange = vi.fn();

    render(
      <TaskInput
        value="Comprar pan"
        onChange={onChange}
        onAdd={onAdd}
      />
    );

    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: /\+ add/i })
    );

    expect(onAdd).toHaveBeenCalled();
  });

  it("llama a onAdd al presionar Enter", async () => {
    const onAdd = vi.fn();
    const onChange = vi.fn();

    render(
      <TaskInput
        value="Comprar pan"
        onChange={onChange}
        onAdd={onAdd}
      />
    );

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("Add a new task..."),
      "{Enter}"
    );

    expect(onAdd).toHaveBeenCalled();
  });
});