# Instalación

No hace falta programar. Tardarás un par de minutos.

## 1. Dale la skill a tu bot

**Lo más fácil: un bot ya listo.** Abre la [plantilla de Context Bot](https://x.ai/bot/-lByS9XGxzqHgCrOhrrJY) y añádela en Grok Bot. Tendrás un bot nuevo con la skill y sus instrucciones ya puestas. Después charla como siempre: mira el semáforo según crece la charla.

**¿Ya tienes un bot? Pega este prompt** en su chat:

```text
Instala la skill de https://contextbot.app/es/skill.md en mi biblioteca de skills, guárdala exactamente como está escrita y confírmamelo.
```

Tu bot guarda la skill ([puedes leerla aquí](../skills/context-bot/SKILL.md)) y te lo confirma. Comprueba que la tiene preguntándole: «¿En qué color estamos?».

## 2. Abre el panel

1. Abre [contextbot.app/es/dashboard/](https://contextbot.app/es/dashboard/). Si prefieres usarlo sin conexión, descarga el repositorio, ejecuta `bash scripts/build-site.sh` y abre `dist/es/dashboard/index.html` con doble clic.
2. No necesita cuenta ni servidor.
3. Añade tus bots y pega su `STATUS.md` (o elige el color a mano) para ver el semáforo.
4. Cuando un bot esté en amarillo o rojo, pulsa **Traspaso** en su tarjeta: verás qué pasa al bot nuevo (memoria, tareas, archivos y rutinas) y podrás copiar o descargar el `TRASPASO.md`. También puedes pegar ahí un `TRASPASO.md` que te haya dado tu bot para revisarlo.

Los datos se guardan solo en tu navegador (`localStorage`). Si borras los datos del navegador, se borran también.

## 3. (Opcional) Bot coordinador

Si tienes varios bots, crea uno que los vigile a todos con el prompt de [`prompts/bot-coordinador.md`](../prompts/bot-coordinador.md).

## Cuando llegue el rojo

Usa [Context Bot Migrator](migrator.md) ([plantilla](https://x.ai/bot/oUJEAr2axANgtedIGrkNS)).
