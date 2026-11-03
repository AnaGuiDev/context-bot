# Migrar a un bot nuevo con BotDuplicator

Cuando el semáforo se pone en 🔴 rojo, lo más cómodo es seguir en un bot nuevo: misma configuración, conversación limpia y rápida. Así lo haces sin perder nada.

> BotDuplicator es una herramienta de terceros para duplicar bots. Control de Contexto no está afiliado a ella ni a Grok Bot / xAI.

## Antes de empezar

Pide a tu bot actual:

> Actualiza STATUS.md con todo lo necesario para que otro bot pueda continuar sin ver esta conversación. Ponlo en rojo.

Léelo por encima. Si falta algo importante (una decisión, un archivo, una preferencia tuya), pídele que lo añada.

## Paso a paso

1. **Duplica el bot.** Usa BotDuplicator sobre tu bot actual. El bot nuevo mantiene nombre, instrucciones, skills y rutinas, pero empieza con la conversación vacía y, según el equipo de Cursor, **sin la memoria aprendida** ([fuente](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540)). Por eso el STATUS es clave.
2. **Comprueba que el STATUS viaja.** Si `STATUS.md` está en un archivo del espacio de trabajo compartido, el bot nuevo lo verá (la memoria no viaja). Si no, cópialo y pégalo tú en el primer mensaje.
3. **Primer mensaje al bot nuevo:**

   > Hola. Vienes de una conversación anterior. Lee STATUS.md, dime en tres frases en qué punto estamos y sigue con lo pendiente.

4. **Verifica.** Si el resumen del bot nuevo cuadra, ¡listo! Si no, corrige lo que falte.
5. **Oculta el antiguo, no lo borres.** Borrar es permanente y elimina conversación y memoria.
6. **Actualiza el panel.** Añade el bot nuevo en verde y marca el antiguo como archivado (o elimínalo de la lista).

## Problemas habituales

- **El bot nuevo no encuentra STATUS.md:** pégalo directamente en el chat.
- **Le falta contexto:** pide al bot antiguo que amplíe la sección que falte y pásasela al nuevo.
- **No quiero duplicar:** también puedes crear un bot desde cero, darle la skill y pegarle el STATUS. Es igual de válido.
