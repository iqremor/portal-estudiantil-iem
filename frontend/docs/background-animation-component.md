# Componente de Animación de Fondo

## Descripción
El componente de Animación de Fondo proporciona elementos animados para el fondo de las páginas, añadiendo dinamismo visual y mejorando la experiencia de usuario sin distraer del contenido principal.

## Estructura HTML
```html
<div class="bg-animation"></div>
<div class="floating-element"></div>
<div class="floating-element"></div>
<div class="floating-element"></div>
```

## Cómo usar
Para incluir este componente en una página, añade el siguiente código HTML:

```html
<div id="background-animation-container" data-component="/frontend/components/background-animation.html"></div>
```

Asegúrate de incluir el script de componentes en la sección `<head>` de tu página:

```html
<script type="module" src="/frontend/js/shared/components.js"></script>
```

## Dependencias
- **CSS**: Requiere los estilos definidos en `/frontend/css/styles.css` que incluyen las animaciones y apariencia de estos elementos

## Funcionalidad
- **bg-animation**: Proporciona un efecto de gradiente animado para el fondo
- **floating-element**: Elementos flotantes que se mueven suavemente por la pantalla creando un efecto de profundidad

## Personalización
El componente no requiere personalización específica, pero si deseas modificar su comportamiento, puedes hacerlo a través de CSS en la hoja de estilos de tu página.

## Consideraciones de Rendimiento
- Las animaciones están optimizadas para no consumir demasiados recursos
- En dispositivos con limitaciones de rendimiento, las animaciones se simplifican automáticamente
- Usa la propiedad CSS `will-change` para mejorar el rendimiento en navegadores modernos

## Compatibilidad con Navegadores
- Funciona en todos los navegadores modernos
- En navegadores antiguos, las animaciones pueden no mostrarse, pero no afecta la funcionalidad

## Buenas Prácticas
1. Coloca este componente al principio del `<body>` para asegurar que los elementos animados queden detrás del contenido
2. No añadas elementos interactivos dentro de este componente
3. Si necesitas modificar la intensidad de las animaciones, hazlo mediante CSS

## Accesibilidad
- Las animaciones no interfieren con la lectura del contenido
- Se detienen automáticamente si el usuario ha activado la preferencia de reducción de movimiento en su sistema operativo
- Los elementos no contienen texto ni información esencial

## Mantenimiento
Si necesitas actualizar este componente, modifica el archivo `/frontend/components/background-animation.html` y los cambios se reflejarán en todas las páginas que lo utilizan.
