# Instalación

No hace falta programar. Tardarás unos minutos.

## 1. Dale la skill a tu bot

1. Abre [`skills/context-bot/SKILL.md`](../skills/context-bot/SKILL.md) y copia todo su contenido (incluida la cabecera entre `---`).
2. En tu bot de Grok Bot, pídele algo como:

   > Guarda esta skill con el nombre «context-bot» y úsala a partir de ahora: (pega aquí el contenido)

3. Comprueba que la tiene preguntándole: «¿De qué color está nuestro semáforo de contexto?».

## 2. Abre el panel

1. Abre [contextbot.app/es/dashboard/](https://contextbot.app/es/dashboard/). Si prefieres usarlo sin conexión, descarga el repositorio, ejecuta `bash scripts/build-site.sh` y abre `dist/es/dashboard/index.html` con doble clic.
2. No necesita cuenta ni servidor.
3. Añade tus bots y pega su `STATUS.md` (o elige el color a mano) para ver el semáforo.
4. Cuando un bot esté en amarillo o rojo, pulsa **Traspaso** en su tarjeta: verás qué pasa al bot nuevo (memoria, tareas, archivos y rutinas) y podrás copiar o descargar el `TRASPASO.md`. También puedes pegar ahí un `TRASPASO.md` que te haya dado tu bot para revisarlo.

Los datos se guardan solo en tu navegador (`localStorage`). Si borras los datos del navegador, se borran también.

## 3. (Opcional) Bot coordinador

Si tienes varios bots, crea uno que los vigile a todos con el prompt de [`prompts/bot-coordinador.md`](../prompts/bot-coordinador.md).

## Cuando llegue el rojo

Sigue la guía [Migrar con BotDuplicator](integracion-botduplicator.md).
