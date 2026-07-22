// @ts-check
import { test, expect } from "@playwright/test";

test("Agregar una tarea", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Esperar a que el input esté listo
  await expect(page.locator("input")).toBeVisible();

  const tarea = `Comprar pan ${Date.now()}`;

  await page.fill("input", tarea);
  await page.click("button");

  // Esperar a que aparezca la tarea
  await expect(page.getByText(tarea)).toBeVisible();
});