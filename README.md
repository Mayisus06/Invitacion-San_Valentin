# Invitación San Valentín

Pequeña invitación interactiva hecha con React + Vite + TypeScript. Muestra una pantalla de “¿Aceptas?” con botones “Sí” y “No”. El botón “No” se mueve para evitar el clic y el “Sí” crece. Al aceptar, aparece una animación de celebración con confeti y mensaje final.

**Cómo ejecutar**
1. Instala dependencias:
   `npm install`
2. Inicia el servidor de desarrollo:
   `npm run dev`
3. Abre en el navegador:
   `http://localhost:5173`

**Otros comandos útiles**
- `npm run build`: genera la versión de producción.
- `npm run preview`: sirve localmente la build de producción.
- `npm run lint`: ejecuta ESLint.
- `npm run typecheck`: valida tipos con TypeScript.

**Personalizar textos**
- Nombre y pregunta principal: `src/components/Question.tsx`
- Mensaje de confirmación y subtítulo: `src/components/YesResponse.tsx`

**Estilos**
- Estilos generales: `src/App.css`
- Estilos de la pregunta: `src/components/Question.css`
- Estilos de la respuesta: `src/components/YesResponse.css`
