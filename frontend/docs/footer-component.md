# Componente Footer

## Descripción
El componente Footer proporciona el pie de página estándar para todas las páginas del portal estudiantil. Muestra información de copyright y el lema institucional.

## Estructura HTML
```html
<footer class="footer">
    <div class="footer-content">
        <div class="footer-info">
            <p>&copy; 2025 Institución Educativa Mojarras</p>
            <p>Convivencia y Superación</p>
        </div>
    </div>
</footer>
```

## Cómo usar
Para incluir este componente en una página, añade el siguiente código HTML:

```html
<div id="footer-container" data-component="/frontend/components/footer.html"></div>
```

Asegúrate de incluir el script de componentes en la sección `<head>` de tu página:

```html
<script type="module" src="/frontend/js/shared/components.js"></script>
```

## Dependencias
- **CSS**: Requiere los estilos definidos en `/frontend/css/styles.css`

## Funcionalidad
- **Copyright**: Muestra el año actual y el nombre de la institución
- **Lema**: Muestra el lema institucional

## Personalización
Si necesitas personalizar la información mostrada, puedes usar el atributo `data-values`:

```html
<div id="footer-container" 
     data-component="/frontend/components/footer.html"
     data-values='{"year": "2026", "additionalInfo": "Todos los derechos reservados"}'></div>
```

## Responsividad
El componente está diseñado para adaptarse a diferentes tamaños de pantalla y permanecer siempre en la parte inferior de la página.

## Buenas Prácticas
1. No modificar directamente el HTML del componente; usa el sistema de personalización
2. Si necesitas estilos específicos, agrégalos en la hoja de estilos de la página
3. Mantén la consistencia visual en todas las páginas

## Mantenimiento
Si necesitas actualizar este componente, modifica el archivo `/frontend/components/footer.html` y los cambios se reflejarán en todas las páginas que lo utilizan.

## Consideraciones de Accesibilidad
- El texto tiene suficiente contraste para ser legible
- La estructura es semántica usando la etiqueta `<footer>`
- El tamaño de fuente es adecuado para lectores de pantalla
