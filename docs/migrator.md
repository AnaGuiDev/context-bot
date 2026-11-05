# Context Bot Migrator

**[➕ Añadir Context Bot Migrator](https://x.ai/bot/oUJEAr2axANgtedIGrkNS)** · plantilla lista en Grok Bot.

Skill complementaria y opcional (`skills/context-bot-migrator/`) para pasar un bot largo y lento a uno nuevo de forma ordenada. Sirve para cualquier bot y no necesita ninguna herramienta concreta de duplicado.

**Seis pasos**
1. **Lee el chat antiguo:** el Migrator lee él mismo la conversación del bot antiguo (ReadTranscript) y escribe un `TRASPASO.md` breve y estructurado en `/workspace/context-bot-traspasos/<bot>/`, con copia fechada en `archive/` y una línea de «secretos excluidos».
2. **El bot antiguo lo repasa:** se lo envía por SendToAgent (paso obligatorio). El bot antiguo añade lo que falte y lista sus rutinas reales, con horario.
3. **Te lo enseña:** recibes el traspaso como archivo adjunto, con un resumen arriba. No se crea nada hasta que digas que sí.
4. **Bot nuevo:** se crea con las rutinas en pausa y se comprueba con una lista. Luego pide al bot antiguo que pause sus rutinas, y las nuevas se activan tras tu segundo sí.
5. **Comprueba que todo cuadra:** compara recuentos de antes y después (memoria, skills, rutinas y horarios) y marca los conectores que requieren autenticación.
6. **Mensaje final:** te confirma el resultado. Vuelta atrás: el bot antiguo se oculta, nunca se borra. Para deshacer: muestra el antiguo, reactiva sus rutinas y pausa u oculta el nuevo.

Solo si falla la herramienta para hablar con el otro bot, el Migrator te dará una línea para pegar en el bot antiguo como alternativa.

**Coste:** migra en amarillo si puedes y mantén breves el traspaso y el arranque. Cualquier ahorro es una estimación.

Un traspaso es un resumen y algún detalle puede escaparse. La lista de verificación está para detectarlo. Para la primera conversación, instala también `skills/getting-started-migrator/`.
