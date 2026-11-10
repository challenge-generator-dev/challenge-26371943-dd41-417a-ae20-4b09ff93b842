# Exposición de catálogo de productos a través de API REST

El sistema debe exponer un catálogo de productos con validación y manejo centralizado de errores. El catálogo incluye productos con nombre, precio y descripción. Los productos no deben tener nombres duplicados y los precios no pueden ser negativos. El sistema debe manejar errores de validación y exponer los endpoints REST necesarios.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construccion de APIs REST con Express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 4 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición de endpoints y validación básica

**Objetivo:** Definir los endpoints REST necesarios y aplicar validación básica a los datos de entrada.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Identificar los endpoints necesarios para exponer el catálogo de productos.
- Aplicar validación básica para asegurar que los productos no tengan nombres duplicados y que los precios no sean negativos.

**Entregable:** Documentación de los endpoints definidos y ejemplos de solicitudes válidas e inválidas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de middleware para la validación de datos.
- Piensa en cómo estructurar la respuesta para errores de validación.

</details>

### Fase 2: Manejo centralizado de errores

**Objetivo:** Implementar un manejo centralizado de errores para los endpoints definidos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Diseñar una estrategia para manejar errores de validación y otros errores que puedan ocurrir al exponer el catálogo de productos.
- Asegurar que los errores sean manejados de manera consistente y que las respuestas sean informativas para el usuario.

**Entregable:** Código que implementa el manejo centralizado de errores y documentación de los errores posibles y sus respuestas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de middleware para el manejo de errores.
- Piensa en cómo hacer que las respuestas de error sean útiles para el usuario.

</details>

### Fase 3: Pruebas y optimización

**Objetivo:** Realizar pruebas de los endpoints y optimizar el código si es necesario.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Realizar pruebas de los endpoints para asegurar que funcionen correctamente y manejen los errores de manera adecuada.
- Optimizar el código si es necesario para mejorar la eficiencia y la legibilidad.

**Entregable:** Reporte de pruebas y código optimizado si es necesario.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de herramientas de prueba para automatizar las pruebas.
- Piensa en cómo mejorar la eficiencia y la legibilidad del código.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los endpoints REST y por qué son importantes en la exposición de un catálogo de productos?
- **paraQueSirve**: ¿Para qué sirve la validación de datos en los endpoints REST?
- **comoSeUsa**: ¿Cómo se usa el middleware para la validación y el manejo de errores en los endpoints REST?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al exponer un catálogo de productos a través de API REST y cómo se pueden manejar?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización del código para la exposición de un catálogo de productos a través de API REST?

## Criterios de Evaluacion

- Definición correcta de los endpoints REST necesarios.
- Aplicación de validación básica a los datos de entrada.
- Implementación de un manejo centralizado de errores.
- Realización de pruebas de los endpoints y optimización del código si es necesario.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
