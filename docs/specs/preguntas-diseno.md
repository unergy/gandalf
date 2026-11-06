# Preguntas para diseño

Cinco dudas que solo diseño puede resolver. El resto de diferencias con Figma ya se decidieron en código; están en [revision-figma.md](./revision-figma.md).

1. **Modo oscuro.** Foundations no tiene colores para modo oscuro. ¿Lo van a definir, o la librería queda solo en claro?
2. **Interlineado.** Casi todos los estilos de texto dicen `lineHeight: 100`. ¿Significa 100 % (igual al tamaño de letra)? Cambiarlo afecta todo el texto.
3. **Estados sin dibujar.** Faltan foco con teclado, deshabilitado y error (por ejemplo, Upload Box con un archivo rechazado). Hoy se usa el estilo general de la librería. ¿Ese estilo sirve, o los van a dibujar?
4. **Stepper.** "Current" marca los pasos siguientes y "Active" el paso actual. ¿Es a propósito o están invertidos?
5. **Reports, Chat y Layouts.** ¿Son componentes de la librería o pantallas de una app?

Para corregir en Figma, sin necesidad de responder: "Navegation Buttons", "Activeded", "Actived" y "Hovere".
