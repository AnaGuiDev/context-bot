# Trucos para gastar menos

Consejos para que tu uso semanal de Grok Bot dure más. Solo incluimos los que están respaldados por documentación oficial o por respuestas del equipo de Cursor en su foro, o que se deducen directamente de lo que dicen. Fuentes consultadas el 3 de noviembre de 2026; pueden cambiar.

> Proyecto comunitario no oficial. Comprueba siempre la documentación actual.

## Lo que dicen las fuentes (en resumen)

- El uso se mide por **pasos del agente y tokens**, no por número de mensajes. Las tareas más largas o grandes gastan más. ([Plans and billing](https://cursor.com/help/grok-bot/plans))
- **Cada respuesta vuelve a leer toda la conversación** del bot, así que cada turno cuesta más o menos lo que mide la charla. Solo se resume sola cerca del límite y no hay botón de compactar. (Respuesta del equipo en el [foro de Cursor](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540); ver también [este hilo](https://forum.cursor.com/t/grok-bot-prune-compact-an-agent-s-context-without-creating-a-new-bot/168333))
- **Cada ejecución de una rutina gasta uso.** Una rutina horaria o un disparador de Slack en un canal con mucho movimiento puede gastar una semana de uso en un día. ([Routines](https://cursor.com/help/grok-bot/routines), [docs de xAI](https://docs.x.ai/grok-bot/skills-routines-and-automations))

## Trucos verificados

### 1. 🤐 No respondas «ok» o «gracias» a cada mensaje
Cada mensaje tuyo hace que el bot responda, y cada respuesta relee toda la conversación. Un «ok» suelto cuesta casi lo mismo que una pregunta. Si no necesitas respuesta, no escribas.
*Se deduce de:* [foro, respuesta del equipo](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540) + [Plans and billing](https://cursor.com/help/grok-bot/plans).

### 2. 📦 Junta varias peticiones en un solo mensaje
Por el mismo motivo, tres mensajes son tres relecturas de la conversación. Mejor una lista en un único mensaje.
*Se deduce de:* [foro, respuesta del equipo](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540).

### 3. ⏸️ Pausa las rutinas que no necesitas
Una rutina que no se ejecuta no gasta. Pausar (en vez de borrar) te permite reactivarla luego.
*Fuente:* [Routines](https://cursor.com/help/grok-bot/routines).

### 4. 🕰️ Baja la frecuencia y estrecha los disparadores
Pasa de «cada hora» a «días laborables a las 9», y limita los disparadores de Slack a un canal y una palabra concreta.
*Fuente:* [Routines](https://cursor.com/help/grok-bot/routines), [docs de xAI](https://docs.x.ai/grok-bot/skills-routines-and-automations).

### 5. 🧪 Cuidado con «Test»
Probar una rutina hace el trabajo de verdad y gasta uso igual que una ejecución normal.
*Fuente:* [Routines](https://cursor.com/help/grok-bot/routines).

### 6. 🚚 Cuando la charla sea muy larga, pasa a un bot duplicado
Pide un resumen de traspaso (el `STATUS.md`), duplica el bot y empieza de cero con ese resumen. **Ojo:** según el equipo, la copia mantiene nombre, instrucciones, skills y rutinas, pero **no** la conversación ni la memoria aprendida. Oculta el bot antiguo en lugar de borrarlo.
*Fuente:* [foro, respuesta del equipo](https://forum.cursor.com/t/trim-the-fat-in-a-chat/171653), [otra respuesta](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540).

### 7. 🪪 Deja las instrucciones fijas en el perfil del bot, no en el chat
Lo que pones en *Edit Profile* se conserva al duplicar y no hay que repetirlo en la conversación.
*Fuente:* [foro, respuesta del equipo](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540).

### 8. 🎯 Empieza con tareas pequeñas y mira tu uso
Acota bien la tarea, mira cuánto gasta y luego amplía. Consulta el uso antes de trabajos largos.
*Fuente:* [Plans and billing](https://cursor.com/help/grok-bot/plans).

### 9. 🛠️ Modo ahorro: pasa las tareas repetidas a scripts
Tu bot apunta cada tarea terminada en una línea, un pequeño script cuenta las repetidas (sin gastar uso del bot) y, más o menos una vez por semana, el bot lee un resumen de 10 líneas. También repasa sus rutinas leyendo solo su texto guardado. Si algo se repite o una rutina es casi toda mecánica, te propone un script que puedes lanzar a demanda o con cron. Di «modo ahorro ya» para mirarlo cuando quieras. Nada cambia sin tu permiso. Son sugerencias; el ahorro depende de cada caso.
*Se deduce de:* [Plans and billing](https://cursor.com/help/grok-bot/plans) (el uso son pasos y tokens) y [Routines](https://cursor.com/help/grok-bot/routines).

Los informes recurrentes pueden mantenerse en una misma Page, con actualizaciones programadas y avisos breves con enlace, siempre tras tu confirmación. La rutina recupera los datos autorizados y actualiza la Page; la Page no se actualiza sola. Se reutiliza la rutina existente cuando la hay, se avisa también de los fallos y se indica la última actualización correcta con zona horaria. Se verifica una descarga adecuada a los datos y capacidades disponibles. Generar y actualizar el informe sigue consumiendo uso: no se garantiza ahorro.

Los consejos que aún no hemos podido confirmar están en [tips-pendientes.md](tips-pendientes.md).
