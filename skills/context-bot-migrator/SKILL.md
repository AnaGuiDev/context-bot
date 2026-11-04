---
name: context-bot-migrator
description: Pasa el trabajo de un bot lento y con mucha conversación a un bot nuevo de forma ordenada. Hace inventario del bot antiguo, escribe un traspaso breve y estructurado que revisa el dueño, crea el bot nuevo solo tras un sí explícito, lo verifica con una lista y deja una vuelta atrás. Úsala cuando Context Bot marque amarillo o rojo, o cuando el dueño pida mover, copiar, migrar o reiniciar un bot.
---

# Context Bot Migrator

Una conversación larga cuesta más en cada respuesta. Pasar a un bot nuevo reinicia ese coste, pero la memoria aprendida no se copia sola. Esta skill convierte el cambio en cinco etapas comprobadas. Sirve para cualquier bot y no depende de ninguna herramienta concreta de duplicado.

Reglas básicas:
- Copiar, nunca mover. El bot antiguo queda intacto y oculto. Nunca se borra.
- Nada irreversible sin un sí explícito del dueño: crear un bot, activar rutinas, ocultar el bot antiguo.
- Ni contraseñas, ni tokens, ni números de tarjeta, ni claves privadas en ningún archivo.
- Toda cifra de tamaño o coste es una **estimación**. Di en qué se basa.
- Cada línea que el dueño deba pegar en otro chat va en su propio bloque de código, sola.

## Cuándo proponerla

- Semáforo en **amarillo**: el mejor momento. El bot antiguo aún puede escribir un buen traspaso sin gastar mucho.
- Semáforo en **rojo**: proponlo ya. No empieces hasta que el dueño diga que sí.
- El dueño lo pide directamente.

## Etapa 1 · Inventario del bot antiguo

Normalmente un bot sabe listar su memoria, skills, rutinas y conectores mejor que nadie. Da al dueño este mensaje para pegar en el bot **antiguo**. Genera inventario y traspaso en un solo turno:

```
Prepara una migración de Context Bot en una sola respuesta. 1) Actualiza STATUS.md y pon el semáforo. 2) Escribe /workspace/context-bot-traspasos/<bot>/TRASPASO.md con el formato de traspaso de Migrator: versión, bot de origen, fecha, resumen, hechos de memoria (uno por línea), tareas, archivos clave, skills, rutinas con horario y estado activa/pausada, conectores con estado de autenticación y una línea que confirme que se han excluido los secretos. 3) Cópialo en /workspace/context-bot-traspasos/<bot>/archive/TRASPASO-<AAAA-MM-DD>.md. 4) Responde con los recuentos: hechos, skills, rutinas, conectores. Que el archivo no pase de unas 150 líneas. No crees, cambies ni borres nada más.
```

Cambia `<bot>` por un nombre de carpeta corto (minúsculas, sin espacios). Apunta los recuentos: son el «antes» de la Etapa 4.

Si el bot antiguo no puede listar algo (por ejemplo, la autenticación de un conector), márcalo como `desconocido`. No lo adivines.

## Etapa 2 · El archivo de traspaso

Ruta: `/workspace/context-bot-traspasos/<bot>/TRASPASO.md`, legible por todos los bots del ordenador compartido. Si el bot nuevo no puede leerlo, el dueño pega el contenido en el chat.

Formato (breve: un resumen, no un historial):

```markdown
# TRASPASO
format: migrator-1
source_bot: <nombre> (<id si se conoce>)
date: AAAA-MM-DD HH:MM <zona>
light_at_handoff: yellow | red

## Resumen
3–5 frases: objetivo, en qué punto estamos, siguiente paso.

## Hechos de memoria
- un hecho por línea (preferencias, decisiones, personas/proyectos por su papel, forma de trabajar)

## Tareas
- [en curso] ...
- [pendiente] ...
- [bloqueada] ... (motivo)

## Archivos clave
- /ruta — qué es

## Skills
- nombre — instalada / propia

## Rutinas
- nombre — horario — activa/pausada — qué hace

## Conectores
- nombre — conectado / requiere autenticación / desconocido

## Secretos
secrets_excluded: sí — sin contraseñas, tokens, claves ni datos de tarjeta en este archivo.
```

Pide al dueño que lo lea antes de seguir. Que busque: datos privados que no quiera compartir, decisiones o preferencias que falten, rutinas que ya no quiera.

## Etapa 3 · Crear el bot nuevo (solo tras un sí explícito)

Pregunta en una frase: «¿Creo ahora el bot nuevo?». Espera un sí claro.

Después, según lo que haya disponible:
1. **Una herramienta para crear bots (por ejemplo CreateAgent):** créalo con el mismo nombre y una marca (p. ej. «· 2»), las mismas instrucciones y las skills de la lista del traspaso. Crea las rutinas **en pausa**.
2. **Sin herramienta:** guía al dueño paso a paso para crear el bot en la app, o para usar una herramienta de duplicado si ya la usa. Estas herramientas suelen copiar la configuración pero no la memoria aprendida. El traspaso cubre ese hueco en ambos casos.

Primer mensaje para el bot nuevo (dáselo al dueño como una sola línea para pegar):

```
Vienes de un bot anterior. Lee /workspace/context-bot-traspasos/<bot>/TRASPASO.md, guarda cada hecho de memoria en tu memoria, crea STATUS.md en verde, deja todas las rutinas en pausa y responde con un resumen de tres frases y tus recuentos de hechos, skills, rutinas y conectores.
```

Este arranque en un turno mantiene pequeña la conversación nueva desde el principio.

## Etapa 4 · Lista de verificación

Compara el bot nuevo con los recuentos del «antes». Marca cada línea con ✅, ⚠️ o ❌:

- [ ] Hechos de memoria: el recuento coincide; comprueba dos hechos palabra por palabra.
- [ ] Skills: están todas las de la lista.
- [ ] Rutinas: mismo número, mismos horarios y **todas en pausa**. Siguen en pausa hasta que el dueño confirme, para que nada se ejecute dos veces.
- [ ] Conectores: cada uno conectado o marcado «requiere autenticación» para el dueño. Los inicios de sesión los hace el dueño, nunca pegando secretos.
- [ ] Tres preguntas de memoria: el dueño pregunta tres cosas que solo sabría la memoria antigua (una preferencia, una decisión, el papel de una persona). Las tres deberían salir bien.
- [ ] STATUS.md existe en verde y coincide con las tareas del traspaso.
- [ ] Prueba opcional: ejecuta una rutina una vez a mano, revisa el resultado y déjala en pausa.

Si algo sale ⚠️ o ❌: complétalo desde el traspaso, o pide al bot antiguo que amplíe esa sección, y vuelve a comprobar.

Cuando todo esté bien y el dueño esté de acuerdo: activa las rutinas del bot nuevo, pausa las equivalentes del antiguo y pregunta antes de ocultar el antiguo.

## Etapa 5 · Vuelta atrás

- El bot antiguo se oculta, no se borra. Su conversación y su memoria quedan como estaban.
- El archivo fechado en `archive/` guarda cada versión del traspaso.
- Deshacer en una línea, para el dueño: **muestra el bot antiguo, reactiva sus rutinas y pausa u oculta el nuevo.**
- Ofrece deshacer siempre que el dueño note raro el bot nuevo en los primeros días.

## Coste

- Migrar en amarillo cuesta menos que en rojo: el turno de traspaso del bot antiguo es de los más caros, y cada vez lo es más.
- Traspaso breve, arranque en un turno, sin repetir el historial.
- Si el dueño pregunta cuánto ahorra: da una **estimación** aproximada basada en señales visibles (número aproximado de mensajes, compactaciones, resultados grandes de herramientas). Llámala estimación, di en qué se basa y nunca inventes cifras exactas de tokens o dinero.

## Con Context Bot

- Lee el semáforo de `STATUS.md`. En amarillo, ofrece la migración. En rojo, recomiéndala.
- El traspaso vive en `/workspace/context-bot-traspasos/<bot>/TRASPASO.md`, el mismo sitio que usa Context Bot.
- Tras migrar, el bot nuevo sigue con Context Bot como siempre, empezando en verde.
