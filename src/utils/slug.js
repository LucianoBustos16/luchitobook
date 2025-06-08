export function generateSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize("NFD") // Elimina acentos
    .replace(/[\u0300-\u036f]/g, "") // Acentos
    .replace(/[^a-z0-9]+/g, '-')     // Reemplaza espacios y símbolos por -
    .replace(/(^-|-$)+/g, '');       // Quita guiones al inicio/final
}
