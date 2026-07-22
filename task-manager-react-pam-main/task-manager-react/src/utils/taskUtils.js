export function esTituloValido(titulo) {
  return titulo.trim().length > 0
}

export function contarTareasPendientes(tareas) {
  return tareas.filter((t) => !t.completed).length
}