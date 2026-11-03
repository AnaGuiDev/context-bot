# Instalación

No hace falta programar. Tardarás unos minutos.

## 1. Dale la skill a tu bot

1. Abre [`skills/control-de-contexto/SKILL.md`](../skills/control-de-contexto/SKILL.md) y copia todo su contenido (incluida la cabecera entre `---`).
2. En tu bot de Grok Bot, pídele algo como:

   > Guarda esta skill con el nombre «control-de-contexto» y úsala a partir de ahora: (pega aquí el contenido)

3. Comprueba que la tiene preguntándole: «¿De qué color está nuestro semáforo de contexto?».

## 2. Abre el panel

1. Descarga el repositorio (botón verde **Code → Download ZIP** en GitHub) o solo el archivo [`dashboard/index.html`](../dashboard/index.html).
2. Ábrelo con doble clic en tu navegador. Funciona sin conexión y sin servidor.
3. Añade tus bots y pega su `STATUS.md` (o elige el color a mano) para ver el semáforo.

Los datos se guardan solo en tu navegador (`localStorage`). Si borras los datos del navegador, se borran también.

## 3. (Opcional) Bot coordinador

Si tienes varios bots, crea uno que los vigile a todos con el prompt de [`prompts/bot-coordinador.md`](../prompts/bot-coordinador.md).

## Cuando llegue el rojo

Sigue la guía [Migrar con BotDuplicator](integracion-botduplicator.md).
