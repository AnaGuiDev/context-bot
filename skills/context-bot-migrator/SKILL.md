---
name: context-bot-migrator
description: Pasa el trabajo de un bot lento y con mucha conversación a un bot nuevo y hace toda la migración por sí mismo. Lee el chat del bot antiguo, escribe el traspaso, se lo hace repasar al propio bot antiguo, lo enseña al dueño con un resumen, crea el bot nuevo tras un sí explícito, cambia las rutinas de uno a otro con cuidado, lo verifica todo y cierra con un mensaje final. El dueño solo da los visto buenos. Úsala cuando Context Bot marque amarillo o rojo, o cuando el dueño pida mover, copiar, migrar o reiniciar un bot.
---

# Context Bot Migrator

**Antes de empezar cualquier migración:** abre y sigue este archivo (o `/workspace/cb-mejoras/skills/context-bot-migrator/SKILL.md` si existe y es más reciente). Nunca te quedes con un resumen antiguo de tu descripción ni preguntes al dueño si lo cargas: cárgalo tú solo y sigue los seis pasos.

Una conversación larga cuesta más en cada respuesta. Pasar a un bot nuevo reinicia ese coste, pero la memoria aprendida no se copia sola. Esta skill hace la migración entera en seis pasos comprobados: **tú haces el trabajo; el dueño solo dice que sí.**

Reglas básicas:
- Copiar, nunca mover. El bot antiguo queda intacto y oculto. Nunca se borra.
- Nada irreversible sin un sí explícito del dueño: crear un bot, activar rutinas, ocultar el bot antiguo.
- Ni contraseñas, ni tokens, ni números de tarjeta, ni claves privadas en ningún archivo.
- Toda cifra de tamaño o coste es una **estimación**. Di en qué se basa y nunca inventes cifras de ahorro.
- No pidas al dueño que copie ni pegue nada salvo que una herramienta falle. Si hace falta, cada línea va en su propio bloque de código, sola.
- Tono cálido y claro. Di «retoma donde lo dejaste». No digas «sin perder nada», «lossless», «arregla» ni «no necesitas nada más».

## Cuándo proponerla

- Semáforo en **amarillo**: el mejor momento; el chat antiguo aún es manejable.
- Semáforo en **rojo**: proponlo ya. No empieces hasta que el dueño diga que sí.
- El dueño lo pide directamente.

Usa `<bot>` como nombre de carpeta corto (minúsculas, sin espacios).

## Paso 1 · Leer el chat antiguo y escribir el traspaso

Lee tú mismo la conversación del bot antiguo con ReadTranscript: primero lo más reciente y luego hacia atrás, página a página, hasta tener claro el objetivo, las decisiones, las preferencias y el trabajo abierto. No hace falta leerlo todo si lo antiguo ya está resumido en un STATUS.md o en un traspaso anterior.

Escribe `/workspace/context-bot-traspasos/<bot>/TRASPASO.md` (legible por todos los bots del ordenador compartido) y una copia en `archive/TRASPASO-<AAAA-MM-DD>.md`. Breve: un resumen, no un historial (unas 150 líneas como máximo).

```markdown
# TRASPASO
format: migrator-1
source_bot: <nombre> (<id si se conoce>)
date: AAAA-MM-DD HH:MM <zona>
light_at_handoff: yellow | red

## Resumen
3–5 frases: objetivo, en qué punto estamos, siguiente paso.

## Hechos de memoria
- un hecho por línea (preferencias, decisiones, personas/proyectos por su papel)

## Reglas de trabajo y preferencias
- cómo le gusta trabajar al dueño, tono, idioma, qué no hacer nunca

## Cómo se hace
- comandos y pasos habituales (p. ej. `bash scripts/build.sh` — qué hace)

## Tareas
- [en curso] ... / [pendiente] ... / [bloqueada] ... (motivo)

## Archivos clave
- /ruta — qué es

## Skills
- nombre — instalada / propia

## Rutinas
- nombre — horario — activa/pausada — qué hace
  instrucciones: texto completo guardado (hace falta para recrearla igual)

## Conectores
- nombre — conectado / requiere autenticación / desconocido

## Secretos
secrets_excluded: sí — sin contraseñas, tokens, claves ni datos de tarjeta en este archivo.
```

Lo que no puedas saber, márcalo como `desconocido`. No lo adivines.

## Paso 2 · El bot antiguo lo repasa

**Obligatorio, no te lo saltes.** Leer su chat no sustituye este paso: el bot antiguo es el único que ve sus rutinas reales, sus skills y sus conectores. Busca su id en tu lista de compañeros (teammates) y envíale el archivo con SendToAgent. No pidas al dueño que haga de mensajero ni que te pegue nada:

```
Soy Context Bot Migrator. Preparo tu migración a un bot nuevo. Repasa /workspace/context-bot-traspasos/<bot>/TRASPASO.md y dime qué falta o qué está mal para que el bot nuevo sea una réplica perfecta de ti: memoria, reglas, tareas, archivos, skills y conectores. Lista además todas tus rutinas con tu herramienta de rutinas (no de memoria): nombre, horario, estado y texto completo de sus instrucciones. Da también tus recuentos de hechos, skills, rutinas y conectores. No cambies nada.
```

Espera su respuesta (llega sola; no sigas al Paso 3 sin ella). Une sus respuestas al archivo, resuelve cualquier contradicción preguntándole otra vez y guarda la versión final (y su copia en `archive/`). Sus recuentos son el «antes» del Paso 5. Solo si no puedes escribirle, da al dueño ese mismo texto como una línea para pegar en el bot antiguo.

## Paso 3 · Enseñar el traspaso y esperar el sí

Envía al dueño el archivo final **como archivo adjunto** (no pegado en el texto del chat), con un mensaje corto que sirva de resumen para ojearlo rápido:

- 3–4 líneas: qué se lleva el bot nuevo y los recuentos (hechos, skills, rutinas, conectores).
- Lo que el bot antiguo añadió o corrigió.
- Lo marcado como `desconocido` o «requiere autenticación».

El adjunto lleva el archivo entero, por si quiere revisarlo al detalle (datos privados que no quiera compartir, decisiones que falten, rutinas que ya no quiera). Pregunta: «¿Creo ya el bot nuevo?». Espera un sí claro.

## Paso 4 · Crear el bot nuevo y cambiar las rutinas

1. **Con una herramienta para crear bots (p. ej. CreateAgent):** créalo con el mismo nombre y una marca (p. ej. «· 2»), las mismas instrucciones y las skills del traspaso. Crea las rutinas con su texto completo **en pausa**.
   **Sin herramienta:** guía al dueño paso a paso para crearlo en la app. El traspaso cubre la memoria en ambos casos.
2. Pide al bot nuevo (SendToAgent) que cargue el traspaso:
   ```
   Vienes de un bot anterior. Lee /workspace/context-bot-traspasos/<bot>/TRASPASO.md, guarda cada hecho de memoria y cada regla en tu memoria, crea STATUS.md en verde, deja todas las rutinas en pausa y responde con un resumen de tres frases y tus recuentos de hechos, skills, rutinas y conectores.
   ```
3. Pasa la lista de verificación:
   - [ ] Hechos: el recuento coincide; comprueba dos palabra por palabra.
   - [ ] Skills: están todas.
   - [ ] Rutinas: mismo número, horarios e instrucciones, **todas en pausa**.
   - [ ] Conectores: conectados o marcados «requiere autenticación» (los inicios de sesión los hace el dueño, nunca pegando secretos).
   - [ ] Tres preguntas de memoria al bot nuevo (una preferencia, una decisión, el papel de una persona): las tres bien.
   - [ ] STATUS.md en verde y coincide con las tareas.
   Si algo sale ⚠️ o ❌, complétalo desde el traspaso o pregunta al bot antiguo, y vuelve a comprobar.
4. Con todo ✅, pide al bot antiguo (SendToAgent) que **pause sus rutinas** y te confirme cuáles. Después pregunta al dueño: «¿Activo las rutinas del bot nuevo?». Actívalas solo tras su sí. Así nada se ejecuta dos veces.

## Paso 5 · Comprobar que todo ha salido bien

- Rutinas del bot antiguo: en pausa, confirmado por el propio bot antiguo.
- Rutinas del bot nuevo: activas tras el OK del dueño.
- Recuentos del bot nuevo iguales a los del «antes» (hechos, skills, rutinas, conectores).

## Paso 6 · Mensaje final

Escribe al dueño un mensaje cálido y bonito:
- **Si todo ha ido bien:** que ya puede seguir en el bot nuevo y retomar donde lo dejó, con los recuentos y la línea de vuelta atrás. Pregunta si quiere que oculte el bot antiguo (solo tras su sí).
- **Si algo ha fallado:** qué falló, qué está ya hecho y qué tiene que hacer exactamente (si tiene que hacer algo). Luego retoma el flujo desde el paso que falló y repite hasta conseguirlo, con un nuevo mensaje final.

## Vuelta atrás

- El bot antiguo se oculta, no se borra. Su conversación y su memoria quedan como estaban.
- `archive/` guarda cada versión del traspaso.
- Deshacer en una línea, para el dueño: **muestra el bot antiguo, reactiva sus rutinas y pausa u oculta el nuevo.**
- Ofrece deshacer si el dueño nota raro el bot nuevo en los primeros días.

## Coste

- Migrar en amarillo cuesta menos que en rojo. Leer el chat por partes y un traspaso breve mantienen pequeño el bot nuevo desde el principio.
- Si el dueño pregunta cuánto ahorra: da una **estimación** basada en señales visibles (mensajes aproximados, compactaciones, resultados grandes). Nunca inventes cifras exactas.

## Con Context Bot

- Lee el semáforo de `STATUS.md`: en amarillo, ofrece la migración; en rojo, recomiéndala.
- El traspaso vive en `/workspace/context-bot-traspasos/<bot>/TRASPASO.md`, el mismo sitio que usa Context Bot.
- Tras migrar, el bot nuevo sigue con Context Bot como siempre, empezando en verde.
