<div align="center">

<a href="https://contextbot.app/es/"><img src="assets/brand/og-image-es.png" alt="Context Bot: tus Grok Bots, a punto. Estira tu suscripción. El kit completo para tus bots. Gratis, de código abierto, contextbot.app" width="820"></a>

# Context Bot

**Las charlas largas con Grok Bot se comen tu uso (y van más lentas). Context Bot les pone un semáforo.**<br>
🟢 sigue · 🟡 toca resumir · 🔴 pasa a un bot nuevo, y un archivo de traspaso se lleva tu memoria.

[![Estrellas en GitHub](https://img.shields.io/github/stars/AnaGuiDev/context-bot?style=flat&logo=github&label=estrellas&color=facc15)](https://github.com/AnaGuiDev/context-bot)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-4ade80.svg)](LICENSE)
[![Web](https://img.shields.io/badge/web-contextbot.app-2563eb.svg)](https://contextbot.app/es/)
[![Sin programar](https://img.shields.io/badge/sin%20programar-s%C3%AD-facc15.svg)](docs/instalacion.md)
[![Sigue a @contextbotapp](https://img.shields.io/badge/sigue%20a-%40contextbotapp-000000.svg?logo=x)](https://x.com/contextbotapp)
[![Hecho por @SoyAnaDev](https://img.shields.io/badge/hecho%20por-%40SoyAnaDev-000000.svg?logo=x)](https://x.com/SoyAnaDev)
[![Invítame a un café](https://img.shields.io/badge/inv%C3%ADtame%20a%20un-caf%C3%A9-FFDD00.svg?logo=buymeacoffee&logoColor=000)](https://buymeacoffee.com/soyanadev)

**[⚡ Instálalo en un minuto](#-instálalo-en-un-minuto) · [🌐 Web](https://contextbot.app/es/) · [📊 Panel con ejemplos](https://contextbot.app/es/dashboard/?demo)** · [English](README.md)

**Tres bots amables, listos para añadir:** [🚦 Context Bot](https://x.ai/bot/-lByS9XGxzqHgCrOhrrJY) · [🧭 Migrator](https://x.ai/bot/oUJEAr2axANgtedIGrkNS) · [🪶 Lite](https://x.ai/bot/2O-oiBLKblZGBsfG0SVhG)

<a href="assets/video/promo-es-16x9.mp4"><img src="assets/video/promo-es.gif" alt="Vídeo de presentación de Context Bot (pulsa para verlo con sonido)" width="820"></a>

<sub>Pulsa la animación para ver el vídeo de un minuto con sonido.</sub>

Gratis, de código abierto, sin descargas ni registros. Si te ayuda a cuidar el uso, y también el tiempo, **⭐ dale una estrella**: es la forma más fácil de que llegue a más gente.

</div>

---

## 🐢 El problema

Cuanto más larga es la conversación con tu bot, **más te cuesta y más tarda en responder**: en cada respuesta vuelve a leer todo lo anterior ([fuente](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540)). Casi nadie se da cuenta hasta que el uso ya es alto, y entonces empezar de cero da miedo: un bot nuevo supone volver a explicarlo todo.

Context Bot te avisa a tiempo y te ayuda a seguir en un bot nuevo **para que retomes donde lo dejaste**.

## 🚦 Cómo funciona

Tu bot estima cuánto se alarga la conversación, apunta en qué estáis en un `STATUS.md` y te lo resume con un color:

| | Color | Umbral aproximado | Qué pasa |
|---|---|---|---|
| 🟢 | **Verde** | Menos de ~40 mensajes | Todo bien. Sigue a lo tuyo. |
| 🟡 | **Amarillo** | 40–80 mensajes, o 1 resumen | Tu bot resume el trabajo en `STATUS.md` y sigue desde ahí. |
| 🔴 | **Rojo** | Más de 80 mensajes, o 2+ resúmenes | Tu bot escribe un archivo de traspaso y pasas a un bot nuevo. |

Los umbrales son estimaciones según la longitud de la charla, no un recuento exacto de tokens. Bastan para saber cuándo actuar.

## ⚡ Instálalo en un minuto

**[➕ Añadir Context Bot](https://x.ai/bot/-lByS9XGxzqHgCrOhrrJY)** · la plantilla se abre en Grok Bot. Añádela y tendrás un bot nuevo con la skill de Context Bot y sus instrucciones ya puestas.

1. **Añade Context Bot** desde la plantilla (enlace de arriba).
2. **Charla como siempre.** Según crece la charla, mira el semáforo por su cuenta y lleva un `STATUS.md` con en qué estáis. Pregunta *«¿En qué color estamos?»* cuando quieras, o pega su `STATUS.md` en el [panel](https://contextbot.app/es/dashboard/).
3. **En rojo, migra con Context Bot Migrator.** Tu bot escribe el archivo de traspaso ([ejemplo](examples/TRASPASO.md.example)) y te propone un bot nuevo. [Añade Context Bot Migrator](https://x.ai/bot/oUJEAr2axANgtedIGrkNS) y te acompaña en el cambio ([guía](docs/migrator.md)); en la vista [Traspaso del panel](https://contextbot.app/es/dashboard/?demo#handoff) ves exactamente qué se lleva el bot nuevo.

**¿Ya tienes un bot? Pega este prompt** en su chat (GitHub te pone un botón para copiarlo a la derecha):

```text
Instala la skill de https://contextbot.app/es/skill.md en mi biblioteca de skills, guárdala exactamente como está escrita y confírmamelo.
```

Más detalle en [docs/instalacion.md](docs/instalacion.md).

## 🧭 Migrator (opcional)

Cuando el semáforo pasa a amarillo o rojo, el **Context Bot Migrator** opcional hace el cambio por ti: lee el chat antiguo, escribe el traspaso, se lo hace repasar al bot antiguo, te enseña un resumen, crea el bot nuevo, cambia las rutinas con cuidado y te avisa de que ha salido bien. Tú solo dices que sí dos veces. El antiguo se oculta, nunca se borra, así que siempre puedes volver. Mira [docs/migrator.md](docs/migrator.md).

**[➕ Añadir Context Bot Migrator](https://x.ai/bot/oUJEAr2axANgtedIGrkNS)** · la plantilla se abre en Grok Bot con la skill del Migrator lista.

## 🪶 Lite (opcional)

**Context Bot Lite** es la versión ligera: solo el semáforo y `STATUS.md`, con una revisión cada ~20 mensajes o cuando la pidas. Sin modo ahorro ni migración; en rojo sugiere Context Bot Migrator. [Añade la plantilla](https://x.ai/bot/2O-oiBLKblZGBsfG0SVhG); la skill está en [skills/context-bot-lite/](skills/context-bot-lite/). Más en [docs/lite.md](docs/lite.md).

¿No sabes de qué color está tu bot? Prueba el [chequeo de un minuto](https://contextbot.app/es/#check): un prompt, cualquier Grok Bot.

## 🧳 Antes y después

| Sin Context Bot | Con Context Bot |
|---|---|
| Te das cuenta del uso cuando la charla ya es larga, y luego de la espera. | Un color te avisa a tiempo. |
| Sigues estirando una charla infinita. | Resumes en amarillo y cambias en rojo, cuando tú decides. |
| Un bot nuevo supone volver a explicar preferencias, decisiones y archivos. | Un archivo de traspaso lleva memoria, tareas y archivos clave. |
| Las rutinas se comen tu uso sin que lo veas. | El panel te señala qué rutinas conviene pausar o espaciar. |

Context Bot no hace más listo a tu bot. Te avisa de cuándo actuar.

## 📦 Qué incluye

- **Skill** para tu bot, en [español](skills/context-bot/SKILL.md) y en [inglés](skills/context-bot/en/SKILL.md) (en <https://contextbot.app/es/skill.md> y <https://contextbot.app/skill.md>): cuándo comprobar, cómo estimar, cuándo avisar y cómo hacer el traspaso.
- **Skill de bienvenida opcional** [`getting-started-context-bot`](skills/getting-started-context-bot/SKILL.md): guía la primera conversación de un nuevo Context Bot con su dueño.
- **[Panel](https://contextbot.app/es/dashboard/)** con semáforo: bots, rutinas y traspasos se quedan en tu navegador. El estado en directo es aparte.
- **Vista Traspaso** en el panel: elige un bot en amarillo o rojo y mira cómo pasan al bot nuevo su memoria, tareas, archivos y rutinas. Luego copia o descarga el `TRASPASO.md`, o pega uno para revisarlo.
- **Revisión de rutinas** en el panel: te marca las que conviene pausar o espaciar.
- **[Prompts](prompts/bot-coordinador.md)**, incluido un bot coordinador que vigila a los demás.
- **[Ejemplo de STATUS.md](examples/STATUS.md.example)** y **[ejemplo de TRASPASO.md](examples/TRASPASO.md.example)**.
- **[Trucos para gastar menos](docs/tips-ahorro.md)**, cada uno con su fuente.
- **Web bilingüe** (español e inglés) generada desde `src/` con `bash scripts/build-site.sh` → `dist/`. Sin frameworks, sin rastreadores, con la fuente alojada en la propia web.

## 🖥️ La página y el panel

<div align="center">
<img src="assets/landing.png" alt="Página de Context Bot: un semáforo junto al titular Long chats make your bot slow &amp; pricey. Keep every bot in shape, with a little help. (versión en inglés)" width="820">
</div>

<div align="center">
<img src="assets/dashboard.png" alt="Panel con tres bots en rojo, amarillo y verde, y las secciones de estado en directo y traspaso" width="820">
</div>

Apunta tus bots, pega su estado y mira de un vistazo cuál necesita atención. Detecta solo líneas como `semaforo: rojo`. Puedes exportar e importar todo en JSON. La edición local se queda en tu ordenador. El estado en directo, descrito abajo, guarda un ID numérico de GitHub y notas breves en el conector.

## 💡 Trucos para gastar menos

No respondas «ok» a cada mensaje, junta tus peticiones, pausa las rutinas que no uses y espacia las demás. Todos los trucos, con sus fuentes, en [docs/tips-ahorro.md](docs/tips-ahorro.md). Los que aún no hemos podido confirmar están en [docs/tips-pendientes.md](docs/tips-pendientes.md).

> 🎨 **Ponle cara a cada bot.** Dile a tu bot nuevo «ponte tu foto oficial» y lo reconocerás de un vistazo en tu lista. El mismo bot, el doble de disfrute.

## ❓ Preguntas frecuentes

<details><summary><b>¿Por qué mi bot nuevo sale con una bola negra?</b></summary>

Las plantillas no traen la foto de perfil. Dile a tu bot nuevo «ponte tu foto oficial» y se la pondrá. O pónsela tú a mano: [Context Bot](https://raw.githubusercontent.com/AnaGuiDev/context-bot/main/assets/brand/avatar-context-bot.png) · [Migrator](https://raw.githubusercontent.com/AnaGuiDev/context-bot/main/assets/brand/avatar-migrator.png) · [Lite](https://raw.githubusercontent.com/AnaGuiDev/context-bot/main/assets/brand/avatar-lite.png).
</details>

<details><summary><b>¿Tengo que copiar y pegar algo para migrar?</b></summary>

No. Context Bot Migrator lee el chat antiguo, escribe el traspaso y habla él mismo con los dos bots. Tú solo dices que sí dos veces: una para crear el bot nuevo y otra para activar sus rutinas. Solo si una herramienta no llega al bot antiguo, te dará una línea para pegar.
</details>

<details><summary><b>¿Es gratis?</b></summary>

Sí. Gratis y de código abierto, con licencia MIT. Sin versión de pago.
</details>

<details><summary><b>¿Tengo que saber programar?</b></summary>

No. Añades Context Bot desde la plantilla y charlas como siempre. ¿Ya tienes un bot? Pegas un prompt en su chat y listo.
</details>

<details><summary><b>¿Plantilla o prompt?</b></summary>

La plantilla crea un bot nuevo con la skill de Context Bot y sus instrucciones listas. El prompt añade la misma skill a un bot que ya tienes, así que conserva su charla, su memoria y su configuración. El semáforo funciona igual en los dos casos.
</details>

<details><summary><b>¿Pierdo mi trabajo al pasar a un bot nuevo?</b></summary>

Al duplicar un bot no se copia su memoria aprendida, así que antes de cambiar, tu bot escribe un archivo de traspaso (`TRASPASO.md`) con tus preferencias, decisiones, tareas y archivos clave. El bot nuevo lo lee y lo guarda en su memoria. Revisa el archivo antes de cambiar: nunca debe llevar contraseñas ni claves. El bot antiguo sigue ahí para consulta: ocúltalo, no lo borres.
</details>

<details><summary><b>¿Lee o sube mis conversaciones?</b></summary>

La skill funciona dentro de tu propio bot. La web no recibe tus conversaciones. El panel guarda bots, rutinas y traspasos en tu navegador (`localStorage`). Si conectas el conector opcional de estado en directo (código en [`worker/`](worker/), en pruebas, sin anunciar), guarda tu ID numérico de GitHub y el nombre del bot, su color, unas estimaciones y una nota breve opcional. No recibe la conversación. Esos detalles del conector aplican cuando ese worker está desplegado; publicar la web no lo despliega.
</details>

<details><summary><b>¿Es exacta la estimación?</b></summary>

No. Es una estimación aproximada según la longitud de la charla. Sirve para avisarte de cuándo actuar, antes de que suba el uso y antes de notarlo lento.
</details>

<details><summary><b>¿Es oficial de Grok Bot?</b></summary>

No. Es un proyecto comunitario no oficial, sin relación con Grok Bot ni con xAI.
</details>

## 🗺️ Hoja de ruta

No hay fechas: depende del tiempo libre y de lo que pidáis.

- [x] Web y panel en inglés y en español.
- [x] Pegar un `TRASPASO.md` en el panel para ver qué se lleva el bot nuevo.
- [x] Versión en inglés de la skill.
- [x] Kit de plantilla del bot listo para publicar ([templates/context-bot-template.md](templates/context-bot-template.md)).
- [x] Conector opcional de estado en directo (MCP): código y pruebas en [`worker/`](worker/), ver [docs/conector.md](docs/conector.md). En pruebas, sin anunciar.
- [x] Enlace público de la plantilla del bot.
- [ ] Que el panel funcione sin conexión (instalable como app).
- [ ] Probar el traspaso de memoria en más casos reales y mejorar la plantilla.
- [ ] Más trucos para gastar menos, siempre con fuente.

¿Echas algo en falta? [Propón una idea](https://github.com/AnaGuiDev/context-bot/issues/new?template=idea.yml).

## 🤝 Contribuir

Las ideas, correcciones y traducciones son bienvenidas. Lee [CONTRIBUTING.md](CONTRIBUTING.md), abre un [issue](https://github.com/AnaGuiDev/context-bot/issues) y respeta el [Código de conducta](CODE_OF_CONDUCT.md). Los textos de la web están en [`src/i18n.py`](src/i18n.py).

## ☕ Apoya el proyecto

Context Bot es y seguirá siendo gratis. Sin anuncios, sin rastreadores, sin versión de pago.

### 💛 Apoya a Ana, la autora

Si Context Bot te ha ayudado con el uso, o también con el tiempo, puedes darle las gracias a Ana con un café o una propina en X.

<div align="center">

[![Invítame a un café](https://img.shields.io/badge/Inv%C3%ADtame%20a%20un%20caf%C3%A9-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=000)](https://buymeacoffee.com/soyanadev)
[![Propinas en X](https://img.shields.io/badge/Propinas%20en%20X-000000?style=for-the-badge&logo=x&logoColor=fff)](https://x.com/SoyAnaDev)
[![Sigue a @SoyAnaDev](https://img.shields.io/badge/Sigue%20a%20%40SoyAnaDev-1d1d1f?style=for-the-badge&logo=x&logoColor=fff)](https://x.com/SoyAnaDev)

</div>

- **☕ Buy Me a Coffee:** [buymeacoffee.com/soyanadev](https://buymeacoffee.com/soyanadev).
- **💸 Propinas en X:** botón de Propinas en el perfil de [@SoyAnaDev](https://x.com/SoyAnaDev).

### 🚦 Ayuda a que Context Bot crezca

Si te ayuda, seguirlo y compartirlo es la mejor forma de que llegue a más gente. 😉

<div align="center">

[![Sigue a @contextbotapp](https://img.shields.io/badge/Sigue%20a%20%40contextbotapp-000000?style=for-the-badge&logo=x&logoColor=fff)](https://x.com/contextbotapp)
[![Compártelo en X](https://img.shields.io/badge/Comp%C3%A1rtelo%20en%20X-2563eb?style=for-the-badge&logo=x&logoColor=fff)](https://x.com/intent/post?text=Las%20charlas%20largas%20gastan%20uso%20primero%2C%20y%20luego%20van%20m%C3%A1s%20lentas.%20Context%20Bot%20las%20vigila.%20Gratis%20y%20de%20c%C3%B3digo%20abierto%3A%20https%3A%2F%2Fcontextbot.app%2Fes%2F%20v%C3%ADa%20%40contextbotapp)
[![Dale una estrella](https://img.shields.io/badge/%E2%AD%90%20Dale%20una%20estrella-facc15?style=for-the-badge&logoColor=000)](https://github.com/AnaGuiDev/context-bot)

</div>

- **Sigue a [@contextbotapp](https://x.com/contextbotapp)** para consejos y novedades.
- **Compártelo** con quien tenga una charla larga que gasta uso.
- **⭐ Dale una estrella al repositorio:** ayuda a que otros lo encuentren.

## 🔒 Privacidad

La web no usa cookies de seguimiento, y la fuente y el vídeo se sirven desde la propia web. El panel guarda bots, rutinas y traspasos en tu navegador. El estado en directo opcional guarda tu ID numérico de GitHub y los nombres, colores, estimaciones y notas breves que comuniquen tus bots. Más detalle en la [página de privacidad](https://contextbot.app/es/privacidad.html). Para avisar de un fallo de seguridad, lee [SECURITY.md](SECURITY.md).

## 💛 Créditos

Hecho con cariño por **Ana Gui** ([@SoyAnaDev](https://x.com/SoyAnaDev)). Gracias a quienes prueban, opinan y mejoran el kit.

Insignias: [shields.io](https://shields.io). Fuente [Nunito](https://github.com/googlefonts/nunito) (licencia SIL OFL 1.1). Código de conducta basado en el [Contributor Covenant](https://www.contributor-covenant.org/).

## 📄 Licencia

[MIT](LICENSE) © 2026 Ana Gui

> Proyecto comunitario no oficial. No está afiliado a Grok Bot ni a xAI.
