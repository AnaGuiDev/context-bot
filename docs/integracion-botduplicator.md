# Migrar a un bot nuevo con BotDuplicator

Cuando el semáforo se pone en 🔴 rojo, lo más cómodo es seguir en un bot nuevo: misma configuración, conversación limpia y rápida. Así lo haces sin perder nada.

> BotDuplicator es una herramienta de terceros para duplicar bots. Context Bot no está afiliado a ella ni a Grok Bot / xAI.

## Antes de empezar

Pide a tu bot actual:

> Haz el traspaso de Context Bot: actualiza STATUS.md en rojo y escribe TRASPASO.md en /workspace/context-bot-traspasos/<nombre-del-bot>/ con tu memoria duradera, el estado, los archivos clave y las rutinas.

**Revisa el archivo antes de seguir.** Comprueba que no hay contraseñas, claves ni datos privados que no quieras compartir. Si falta algo importante (una decisión, un archivo, una preferencia tuya), pídele que lo añada. Plantilla: [`examples/TRASPASO.md.example`](../examples/TRASPASO.md.example).

**Tip:** pega el archivo en la vista [Traspaso del panel](https://contextbot.app/es/dashboard/#handoff) y pulsa **Ver**. Verás, grupo por grupo, la memoria, las tareas, los archivos y las rutinas que pasarán al bot nuevo. Si falta algo, salta a la vista.

## Paso a paso

1. **Duplica el bot.** Usa BotDuplicator sobre tu bot actual. El bot nuevo mantiene nombre, instrucciones, skills y rutinas, pero empieza con la conversación vacía y, según el equipo de Cursor, **sin la memoria aprendida** ([fuente](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540)). Por eso **la memoria viaja en el archivo de traspaso**.
2. **Comprueba que el traspaso se puede leer.** Los bots de tu cuenta comparten el mismo ordenador, así que una ruta como `/workspace/context-bot-traspasos/...` la ve el bot nuevo. Si no, pega tú el contenido de `TRASPASO.md` en el primer mensaje.
3. **Primer mensaje al bot nuevo:**

   > Hola. Vienes de una conversación anterior. Haz el arranque de Context Bot: lee /workspace/context-bot-traspasos/<bot>/TRASPASO.md, guarda los hechos en tu memoria y dime en tres frases en qué punto estamos.

4. **Verifica.** Pregúntale algo que solo sabría por la memoria (una preferencia tuya). Si cuadra, ¡listo! Si no, corrige lo que falte.
5. **Oculta el antiguo, no lo borres.** Borrar es permanente y elimina conversación y memoria.
6. **Actualiza el panel.** Añade el bot nuevo en verde y marca el antiguo como archivado (o elimínalo de la lista).

## Problemas habituales

- **El bot nuevo no encuentra el traspaso:** pega el contenido de TRASPASO.md directamente en el chat.
- **El bot nuevo no recuerda una preferencia:** pídele que la guarde en su memoria y añádela al traspaso para la próxima vez.
- **Le falta contexto:** pide al bot antiguo que amplíe la sección que falte y pásasela al nuevo.
- **No quiero duplicar:** también puedes crear un bot desde cero, darle la skill y pegarle el STATUS. Es igual de válido.

> ¿Prefieres una migración guiada y comprobada? Mira la skill opcional [Context Bot Migrator](migrator.md).
