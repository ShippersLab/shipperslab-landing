import canchas from "@/assets/images/projects/tuturnero/canchas.webp";
import funciones from "@/assets/images/projects/tuturnero/funciones.webp";
import hero from "@/assets/images/projects/tuturnero/hero.webp";
import horarios from "@/assets/images/projects/tuturnero/horarios.webp";
import pasos from "@/assets/images/projects/tuturnero/pasos.webp";
import pedidos from "@/assets/images/projects/tuturnero/pedidos.webp";

export const tuturneroImages = {
  hero,
  gallery: [hero, pasos, horarios, pedidos, canchas, funciones],
} as const;
