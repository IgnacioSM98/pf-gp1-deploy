export default function validate(post) {
  let errors = {};

  if (!post.nombre) {
    errors.nombre = "Ingresar nombre del producto";
  }
  if (!post.descripcion) {
    errors.descripcion = "Escribe una breve descripción";
  }
  if (!post.precio || typeof post.precio !== "number") {
    errors.precio = "Ingresa un precio, que sea un numero";
  }
  if (!post.imagen) {
    errors.imagen = "Ingresar URL de alguna imagen representativa";
  }
  if (!post.stock || typeof post.stock !== "number") {
    errors.stock = "Ingresa un stock, que sea un numero";
  }
  if (!post.categorias[0]) {
    errors.categorias = "Ingresar al menos 1 categoría";
  }

  return errors;
}
