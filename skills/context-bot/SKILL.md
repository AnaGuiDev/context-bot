---
name: context-bot
description: Vigila el tamaño de la conversación, mantiene un STATUS.md con el estado del trabajo y avisa con un semáforo (verde, amarillo, rojo) cuándo conviene resumir o pasar a un bot nuevo con BotDuplicator, con un archivo de traspaso para que la memoria viaje. Úsala al empezar cada sesión, cada 10 mensajes aproximadamente, tras tareas largas y siempre que el usuario pregunte por la lentitud, el coste o el estado.
---

# Context Bot

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

Escribe o actualiza también el `TRASPASO.md`. Ofrece resumir: a partir de ahora trabaja apoyándote en el STATUS y evita volver a pegar material grande.

**🔴 Rojo.** Actualiza el STATUS por completo, prepara el Traspaso y recomienda cambiar a un bot nuevo:

> 🔴 Esta conversación ya es muy larga y eso la hace lenta y más cara. Te propongo pasar a un bot nuevo: he dejado todo apuntado en STATUS.md para que no se pierda nada. ¿Te ayudo a hacerlo con BotDuplicator?

No migres sin que el usuario lo confirme.

## Traspaso: la memoria viaja en un archivo

Al duplicar un bot, la memoria aprendida no se copia. Por eso, **en amarillo o rojo, y siempre antes de usar BotDuplicator**, escribe un archivo de traspaso.

**Dónde:** en un sitio que el bot nuevo pueda leer. Por ejemplo, en el ordenador compartido de los bots: `/workspace/context-bot-traspasos/<nombre-del-bot>/TRASPASO.md`, o en un almacén persistente compartido. Dile al usuario la ruta exacta.

**Qué contiene** (plantilla: `examples/TRASPASO.md.example`):

1. **Resumen corto:** tres a cinco frases de qué hacemos y en qué punto estamos.
2. **Memoria duradera:** lo que sabes y debe seguir sabiéndose. Preferencias del usuario, decisiones tomadas, personas y proyectos, forma de trabajar.
3. **Estado actual:** tareas en curso, pendientes y bloqueos (o copia el `STATUS.md` al día).
4. **Archivos y rutas clave:** dónde está cada cosa.
5. **Rutinas:** nombre, cuándo se ejecutan y para qué sirven.

**Privacidad:** nunca escribas contraseñas, claves, tokens, números de tarjeta ni códigos de acceso. Si hace falta uno, pon «está en el gestor de credenciales del usuario». Pide al usuario que revise el archivo antes de compartirlo o de dárselo a otro bot. Puede pegarlo en la vista **Traspaso** del panel (https://contextbot.app/es/dashboard/#handoff) para ver de un vistazo qué pasará al bot nuevo.

## Arranque: el primer turno del bot nuevo

Si el primer mensaje menciona un traspaso, o encuentras un `TRASPASO.md` para tu nombre:

1. Lee el archivo entero.
2. Guarda en tu propia memoria los hechos de «Memoria duradera» (uno por hecho, sin secretos).
3. Crea o actualiza tu `STATUS.md` con el estado del traspaso y ponlo en verde.
4. Comprueba que las rutinas de la lista existen (al duplicar se copian). No crees ni actives nada sin preguntar.
5. Responde con un resumen de tres frases y pregunta si algo no cuadra.

## Pasar a un bot nuevo con BotDuplicator

1. Haz el **Traspaso**: actualiza `STATUS.md` (en rojo) y escribe `TRASPASO.md`.
2. Explica al usuario que BotDuplicator crea un bot nuevo con la misma configuración (nombre, instrucciones, skills, rutinas), pero con la conversación vacía y sin la memoria aprendida. Por eso la memoria viaja en el archivo de traspaso.
3. Pide al usuario que revise `TRASPASO.md` y que lance BotDuplicator (o hazlo tú si tienes la herramienta y su permiso).
4. Dale este primer mensaje para el bot nuevo, con la ruta real:

> Hola. Vienes de una conversación anterior. Haz el arranque de Context Bot: lee /workspace/context-bot-traspasos/<bot>/TRASPASO.md, guarda los hechos en tu memoria y dime en tres frases en qué punto estamos.

5. Cuando el bot nuevo confirme que lo ha entendido, el usuario puede seguir allí y dejar el antiguo oculto para consulta.

Guía completa: `docs/integracion-botduplicator.md`.

## Estado en directo (opcional)

Si tienes el conector **Context Bot Live Status** (herramienta `report_status`), envía tu color al panel del usuario:

- Llama a `report_status` al empezar la sesión, cada vez que cambie el color y, como mucho, una vez por comprobación. Si no cambia nada, no lo repitas.
- Datos: `bot_name` (tu nombre), `colour` (`green`, `yellow` o `red`), y las estimaciones que tengas: `turns` (mensajes aproximados), `usage_share` (de 0 a 1, lo lleno que estimas el contexto), `routines_per_day`, `compacted` (si ha habido un resumen automático) y una `note` corta y genérica.
- **Todo es una estimación.** No puedes leer el tamaño exacto del contexto. Dilo así si el usuario pregunta, y no lo presentes como una medida.
- **Nunca** pongas en `note` contenido de la conversación, nombres de personas, datos privados ni secretos. Vale «tarea larga de documentos», no vale «revisando el contrato de Juan».
- Si el conector no está, falla o el usuario no quiere, sigue en modo local (solo STATUS.md) sin insistir.
- Si el usuario pide borrar sus datos del conector, usa `delete_my_data`.

## Reglas

- Sé breve: el aviso de color es una frase, no un informe.
- No inventes cifras exactas de tokens; habla de estimaciones.
- Ni contraseñas ni credenciales en STATUS ni en TRASPASO.
- No borres nada del usuario. Migrar es copiar, no mover.
- Si el usuario pregunta «¿qué color estamos?», responde con el color, la estimación y una frase de qué toca hacer.
