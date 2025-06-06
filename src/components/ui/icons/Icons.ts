/**
 * Como agregar más íconos:
 * 1. Buscá el ícono que querés.
 * 2. En figma, el frame contenedor, debe tener 256px y padding de 21
 * 3. El stroke de figma, debe ser de 0.06
 * 4. Pasar el svg por un optimizador
 * 5. Eliminá cualquier atributo `stroke="#000000"`.
 * 6. Reemplazá cualquier atributo `fill="#000000"` con `stroke="none"`
 *    (o agrega `stroke="none"` en formas que no tengan `fill` o `stroke` especificados).
 */

export const iconPaths = {
  // Sun
  bold:`
  <path d="M191.509 113.739a74.524 74.524 0 0 0 1.702-75.55A74.518 74.518 0 0 0 128 0H53.333A21.333 21.333 0 0 0 32 21.333v213.334A21.334 21.334 0 0 0 53.333 256H160a74.604 74.604 0 0 0 66.961-107.654 74.6 74.6 0 0 0-35.452-34.607ZM74.667 42.667H128a31.998 31.998 0 0 1 22.627 54.627A32 32 0 0 1 128 106.667H74.667v-64ZM160 213.333H74.667v-64H160a32 32 0 0 1 0 64Z"/>
  `
}

