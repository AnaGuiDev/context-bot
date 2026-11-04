# Context Bot Migrator

**[➕ Añadir Context Bot Migrator](https://x.ai/bot/oUJEAr2axANgtedIGrkNS)** · plantilla lista en Grok Bot.

Skill complementaria y opcional (`skills/context-bot-migrator/`) para pasar un bot largo y lento a uno nuevo de forma ordenada. Sirve para cualquier bot y no necesita ninguna herramienta concreta de duplicado.

**Cinco etapas**
1. **Inventario:** con una línea para pegar, el bot antiguo lista sus hechos de memoria, skills, rutinas (con horario) y conectores (con estado de autenticación), y escribe el traspaso.
2. **Traspaso:** un `TRASPASO.md` breve y estructurado en `/workspace/context-bot-traspasos/<bot>/`, con copia fechada en `archive/` y una línea de «secretos excluidos». Lo revisas tú.
3. **Bot nuevo:** se crea solo tras tu sí explícito, con una herramienta de creación de bots si la hay. Si no, te guía paso a paso (una herramienta de duplicado es opcional). Las rutinas empiezan en pausa.
4. **Verificación:** se comparan los recuentos de antes y después, se revisan skills y horarios, se marcan los conectores que requieren autenticación, haces tres preguntas que solo sabría la memoria y, si quieres, una prueba de una rutina.
5. **Vuelta atrás:** el bot antiguo se oculta, nunca se borra. Para deshacer: muestra el antiguo, reactiva sus rutinas y pausa u oculta el nuevo.

**Coste:** migra en amarillo si puedes y mantén breves el traspaso y el arranque. Cualquier ahorro es una estimación.

Un traspaso es un resumen y algún detalle puede escaparse. La lista de verificación está para detectarlo. Para la primera conversación, instala también `skills/getting-started-migrator/`.
