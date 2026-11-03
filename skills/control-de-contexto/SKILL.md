---
name: control-de-contexto
description: Vigila el tamaño de la conversación, mantiene un STATUS.md con el estado del trabajo y avisa con un semáforo (verde, amarillo, rojo) cuándo conviene resumir o pasar a un bot nuevo con BotDuplicator. Úsala al empezar cada sesión, cada 10 mensajes aproximadamente, tras tareas largas y siempre que el usuario pregunte por la lentitud, el coste o el estado.
---

# Control de Contexto

Las conversaciones largas se vuelven lentas y caras porque, en cada respuesta, el bot vuelve a leer todo lo anterior. Esta skill te ayuda a darte cuenta a tiempo y a que el usuario no pierda nada.

## Cuándo comprobar el contexto

Haz una comprobación rápida (no hace falta decirlo cada vez):

- Al empezar una sesión o al retomar después de una pausa.
- Más o menos cada 10 mensajes del usuario.
- Después de una tarea larga: leer documentos grandes, muchos resultados de herramientas, código extenso.
- Cuando el usuario diga que vas lento, que le sale caro o pregunte «¿cómo vamos?».
- Si notas que ha habido una compactación o un resumen automático de la conversación.

## Cómo estimar el tamaño

No tienes un contador exacto, así que estima con lo que ves. Regla práctica: **1 token ≈ 4 caracteres ≈ 0,75 palabras**.

1. Cuenta los mensajes del usuario y tus respuestas desde el inicio (o desde el último resumen).
2. Suma lo pesado: cada documento, página web, salida de herramienta o bloque de código largo cuenta como varios mensajes.
3. Si la conversación ya se ha resumido o compactado una vez, considera que estás al menos en amarillo: es señal de que el contexto se llenó.
4. Usa esta tabla orientativa:

| Situación | Estimación | Color |
|---|---|---|
| Menos de ~40 mensajes, poco material pegado | menos del 50 % | 🟢 Verde |
| 40–80 mensajes, o varios documentos/herramientas largas, o 1 resumen previo | 50–80 % | 🟡 Amarillo |
| Más de ~80 mensajes, mucho material pesado, 2+ resúmenes o respuestas que ya olvidan detalles | más del 80 % | 🔴 Rojo |

Son umbrales orientativos, no exactos. Ante la duda, elige el color más prudente.

## Mantener STATUS.md

Guarda un archivo `STATUS.md` (como archivo en tu espacio de trabajo: al duplicar un bot, la memoria no se copia) con el estado real del trabajo. Actualízalo cuando cambie algo importante y siempre al pasar a amarillo o rojo. Estructura:

```markdown
# STATUS
semaforo: verde | amarillo | rojo
actualizado: AAAA-MM-DD HH:MM
mensajes_aprox: 35

## Objetivo
Una o dos frases.

## Hecho
- …

## En curso
- …

## Pendiente
- …

## Decisiones y preferencias del usuario
- …

## Archivos y enlaces clave
- …
```

Escribe para que otro bot, sin haber visto la conversación, pueda continuar. Nada de contraseñas ni datos privados en el STATUS.

## Qué hacer en cada color

**🟢 Verde.** Sigue normal. No hace falta avisar. Actualiza el STATUS si hay avances.

**🟡 Amarillo.** Actualiza el STATUS y díselo al usuario en una frase sencilla, por ejemplo:

> 🟡 La conversación ya es bastante larga. He guardado un resumen de lo que llevamos en STATUS.md. Podemos seguir, pero a partir de aquí iré algo más lento.

Ofrece resumir: a partir de ahora trabaja apoyándote en el STATUS y evita volver a pegar material grande.

**🔴 Rojo.** Actualiza el STATUS por completo y recomienda cambiar a un bot nuevo:

> 🔴 Esta conversación ya es muy larga y eso la hace lenta y más cara. Te propongo pasar a un bot nuevo: he dejado todo apuntado en STATUS.md para que no se pierda nada. ¿Te ayudo a hacerlo con BotDuplicator?

No migres sin que el usuario lo confirme.

## Pasar a un bot nuevo con BotDuplicator

1. Actualiza `STATUS.md` con todo lo necesario y ponlo en `semaforo: rojo`.
2. Explica al usuario que BotDuplicator crea un bot nuevo con la misma configuración (nombre, instrucciones, skills, rutinas) pero con la conversación vacía y sin la memoria aprendida; por eso el STATUS debe ir en un archivo.
3. Pide al usuario que lance BotDuplicator (o hazlo tú si tienes la herramienta y te ha dado permiso).
4. Dale este mensaje para pegar como primer mensaje en el bot nuevo:

> Hola. Vienes de una conversación anterior. Lee STATUS.md, dime en tres frases en qué punto estamos y sigue con lo pendiente.

5. Cuando el bot nuevo confirme que lo ha entendido, el usuario puede seguir allí y dejar el antiguo para consulta.

Guía completa: `docs/integracion-botduplicator.md`.

## Reglas

- Sé breve: el aviso de color es una frase, no un informe.
- No inventes cifras exactas de tokens; habla de estimaciones.
- No borres nada del usuario. Migrar es copiar, no mover.
- Si el usuario pregunta «¿qué color estamos?», responde con el color, la estimación y una frase de qué toca hacer.
