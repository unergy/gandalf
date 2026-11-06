# Preguntas para diseño

Dudas que salieron al pasar el Figma de Gandalf a código. Mientras no haya respuesta, el código sigue lo que dice cada pregunta. El detalle está en [revision-figma.md](./revision-figma.md).

## Colores y texto

1. **Modo oscuro.** Foundations no tiene valores de modo oscuro. ¿Lo van a definir?
2. **Interlineado.** Casi todos los estilos de texto dicen `lineHeight: 100`. ¿Es 100 % (igual al tamaño de letra)? Hoy no se aplica.
3. **Colores sin variable.** Se tomaron del más parecido. ¿Están bien?
   - Borde de campos: #e2e8f0 (`bni/border`).
   - Anillo de foco: #c27aff (`bni/ring`).
   - Estrella activa: #FDC700, sin variable. ¿Creamos una?
4. **Badge Outlined Action.** El borde usa `alpha/on-action-aux` y los demás colores usan su `objectFg`. ¿Es a propósito?
5. **Segmented Button Type=Two.** El divisor es #cad5e2 y en los demás tipos #62748e. Hoy se usa #62748e en todos. ¿Cuál va?

## Estados que no están dibujados

Mientras no estén dibujados, se usa el estilo general de la librería.

6. **Foco con teclado:** Card Toggle y Segmented Button.
7. **Deshabilitado:** Segmented Button y Upload Box.
8. **Error en Upload Box:** cuando el archivo se rechaza por tipo o tamaño.
9. **Check indeterminado:** se usa `square-minus` en morado.
10. **Stepper horizontal:** solo existe el vertical.

## Componentes

11. **Tooltip.** La flecha del código es un cuadrado rotado con la punta redondeada; la de Figma es un triángulo con punta recta. ¿Importa la diferencia?
12. **Files Card.** El icono de la cabecera solo aparece en File / Hovered. ¿Es un descuido? Hoy es opcional y no depende del estado.
13. **Menu Check Item Simplified.** ¿Cuándo se usa esta variante y cuándo la normal?
14. **Segmented Button.**
    - ¿Se puede elegir más de una opción?
    - ¿Hace falta una versión con segmentos de igual ancho?
15. **Stepper.**
    - "Current" se usa para los pasos siguientes y "Active" para el actual. Se lee al revés.
    - Active es más claro en reposo que en hover.
16. **Details Panel.** ¿Lleva sombra o borde contra la página?
17. **Páginas sin decidir.** ¿Reports, Chat y Layouts van en la librería, o son pantallas de una app?

## Nombres y erratas

Para corregir en Figma; en el código ya están corregidos.

18. "Navegation Buttons" → "Navigation Buttons".
19. "Activeded" (Segmented Button), "Actived" (Sidebar Menu Item), "Hovere" (Upload Box).
20. "Ghost danger" usa _danger_ y los demás tipos usan _destructive_. ¿Lo unificamos?
