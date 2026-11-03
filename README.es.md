<!-- TODO(PLACEHOLDER): URL del repositorio, perfil de X y enlace de donación. Ver PLACEHOLDERS.md -->
<div align="center">

# 🚦 Context Bot

**Que tu bot siga rápido.**

Un kit gratuito y de código abierto para que tus conversaciones largas con Grok Bot no se vuelvan lentas ni caras.

[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-4ade80.svg)](LICENSE)
[![Versión](https://img.shields.io/badge/versi%C3%B3n-0.2.0-8fb4ff.svg)](CHANGELOG.md)
[![Web](https://img.shields.io/badge/web-contextbot.app-4ade80.svg)](https://contextbot.app/es/)
[![Publicar web](https://github.com/AnaGuiDev/context-bot/actions/workflows/pages.yml/badge.svg)](https://github.com/AnaGuiDev/context-bot/actions/workflows/pages.yml)
[![Hecho con cariño](https://img.shields.io/badge/hecho%20con-%E2%9D%A4-f87171.svg)](#-créditos)
[![Sin programar](https://img.shields.io/badge/sin%20programar-s%C3%AD-facc15.svg)](docs/instalacion.md)
[![Contribuciones bienvenidas](https://img.shields.io/badge/PRs-bienvenidas-8fb4ff.svg)](CONTRIBUTING.md)
[![Seguir en X](https://img.shields.io/badge/X-seguir-000000.svg?logo=x)](https://x.com/SoyAnaDev)

**[🌐 Ver la web](https://contextbot.app/es/) · [📊 Probar el panel con ejemplos](https://contextbot.app/es/dashboard/?demo)** · [English](README.md)

[Empezar](#-empieza-en-3-pasos) · [Guía de migración](docs/integracion-botduplicator.md) · [Preguntas](#-preguntas-frecuentes) · [☕ Invítame a un café](https://buymeacoffee.com/soyanadev)

<a href="assets/video/promo-es-16x9.mp4"><img src="assets/video/promo-en.gif" alt="Vídeo de presentación de Context Bot (pulsa para verlo con sonido)" width="820"></a>

<sub>Pulsa la animación para ver el vídeo completo con sonido.</sub>

**[➕ Instalar Context Bot](#install)** (un solo prompt) · ⭐ **Dale una estrella** si te ayuda · **[Sigue a @SoyAnaDev](https://x.com/SoyAnaDev)** para enterarte de las novedades

</div>

---

## Índice

- [El problema](#-el-problema)
- [Cómo funciona](#-cómo-funciona)
- [Qué incluye](#-qué-incluye)
- [Empieza en 3 pasos](#-empieza-en-3-pasos)
- [La página y el panel](#️-la-página-y-el-panel)
- [Trucos para gastar menos](#-trucos-para-gastar-menos)
- [Preguntas frecuentes](#-preguntas-frecuentes)
- [Hoja de ruta](#️-hoja-de-ruta)
- [Contribuir](#-contribuir)
- [Apoya el proyecto](#-apoya-el-proyecto)
- [Privacidad](#-privacidad)
- [Licencia](#-licencia)

## 🤔 El problema

Cuanto más larga es la conversación con tu bot, **más tarda en responder y más te cuesta**: en cada respuesta vuelve a leer todo lo anterior. Casi nadie se da cuenta hasta que ya va lento, y entonces da pereza empezar de cero por miedo a perder lo hecho.

Context Bot te avisa a tiempo y te ayuda a seguir **sin perder nada**.

## 🚦 Cómo funciona

Tu bot estima el tamaño de la conversación, apunta en qué estáis en un archivo `STATUS.md` y te lo resume con un color:

| | Color | Qué significa | Qué hacer |
|---|---|---|---|
| 🟢 | **Verde** | Todo bien | Seguir a lo tuyo |
| 🟡 | **Amarillo** | La charla ya pesa | Resumir en `STATUS.md` y trabajar desde ahí |
| 🔴 | **Rojo** | Va lento y sale caro | Escribir el traspaso y pasar a un bot nuevo |

## 📦 Qué incluye

- **[Skill](skills/context-bot/SKILL.md)** para tu bot: cuándo comprobar, cómo estimar, cuándo avisar y cómo migrar.
- **[Panel](https://contextbot.app/es/dashboard/)** con semáforo: sin servidor ni cuenta, guarda en tu navegador. [Pruébalo con ejemplos](https://contextbot.app/es/dashboard/?demo).
- **[Prompts](prompts/bot-coordinador.md)**, incluido un bot coordinador que vigila a los demás.
- **[Ejemplo de STATUS.md](examples/STATUS.md.example)** y **[ejemplo de TRASPASO.md](examples/TRASPASO.md.example)**.
- **[Guía de migración](docs/integracion-botduplicator.md)** a un bot nuevo con BotDuplicator.
- **[Trucos para gastar menos](docs/tips-ahorro.md)**, cada uno con su fuente.
- **Vista Traspaso** en el panel: elige un bot en amarillo o rojo y mira cómo pasan al bot nuevo su memoria, tareas, archivos y rutinas. Luego copia o descarga el `TRASPASO.md`.
- **Revisión de rutinas** en el panel: te marca en rojo o amarillo las que conviene pausar o espaciar.
- **Web bilingüe lista para publicar** (`scripts/build-site.sh` → `dist/`), con guía en [docs/publicar.md](docs/publicar.md).

<a id="install"></a>

## 🚀 Empieza en 3 pasos

1. **Añade el bot, o solo la skill.**
   - **Bot nuevo:** pronto habrá una plantilla lista. De momento, crea un bot y pégale el prompt de abajo. <!-- TODO(PLACEHOLDER): enlace de plantilla pendiente (ver PLACEHOLDERS.md) -->
   - **Tu propio bot:** pega esto en su chat:
     > Instala la skill de https://contextbot.app/es/skill.md en mi biblioteca de skills, guárdala exactamente como está escrita y confírmamelo.
2. **Mira el semáforo.** Pregúntale *«¿De qué color estamos?»* o pega su `STATUS.md` en el [panel](https://contextbot.app/es/dashboard/).
3. **Cambia de bot si toca.** En rojo, sigue la [guía con BotDuplicator](docs/integracion-botduplicator.md): la memoria viaja en un archivo de traspaso ([ejemplo](examples/TRASPASO.md.example)). En la vista [Traspaso del panel](https://contextbot.app/es/dashboard/?demo#handoff) ves qué se lleva el bot nuevo.

Más detalle en [docs/instalacion.md](docs/instalacion.md).

## 🖥️ La página y el panel

<div align="center">
<img src="assets/landing.png" alt="Página de presentación de Context Bot" width="820">
</div>

### El panel

<div align="center">
<img src="assets/dashboard.png" alt="Panel con tres bots en verde, amarillo y rojo" width="820">
</div>

Apunta tus bots, pega su estado y mira de un vistazo cuál necesita atención. Detecta solo líneas como `semaforo: rojo`. Debajo, **Revisa tus rutinas**: apunta cada rutina (bot, frecuencia, si aún la necesitas) y te sugiere pausarla o bajar su frecuencia. Puedes exportar e importar bots y rutinas en JSON. Con **Traspaso** eliges un bot en amarillo o rojo, ves cómo pasan sus cosas al bot nuevo y te llevas el `TRASPASO.md`; también puedes pegar uno para revisarlo. Nada sale de tu ordenador.

## 💡 Trucos para gastar menos

No respondas «ok» a cada mensaje, junta tus peticiones, pausa las rutinas que no uses y espacia las demás. Todos los trucos, con sus fuentes, en [docs/tips-ahorro.md](docs/tips-ahorro.md). Los que aún no hemos podido confirmar están en [docs/tips-pendientes.md](docs/tips-pendientes.md).

## ❓ Preguntas frecuentes

<details><summary><b>¿Es gratis?</b></summary>

Sí. Gratis y de código abierto, con licencia MIT.
</details>

<details><summary><b>¿Tengo que saber programar?</b></summary>

No. Copias, pegas y hablas con tu bot como siempre.
</details>

<details><summary><b>¿Pierdo mi conversación al migrar?</b></summary>

No. Al duplicar un bot, la memoria aprendida no se copia, así que el bot escribe un archivo de traspaso (`TRASPASO.md`) con sus preferencias, decisiones y estado. El bot nuevo lo lee y lo guarda en su memoria. El antiguo sigue existiendo para consulta: ocúltalo, no lo borres.
</details>

<details><summary><b>¿El tamaño que calcula es exacto?</b></summary>

No, es una estimación orientativa a partir de la longitud de la charla. Suficiente para saber cuándo conviene actuar.
</details>

<details><summary><b>¿Dónde se guardan los datos del panel?</b></summary>

Solo en tu navegador (`localStorage`). No hay servidor.
</details>

<details><summary><b>¿Es oficial de Grok Bot?</b></summary>

No. Es un proyecto comunitario, sin relación oficial con Grok Bot ni xAI.
</details>

## 🗺️ Hoja de ruta

Ideas para próximas versiones. No hay fechas: dependen del tiempo libre y de lo que pidáis.

- [x] Web y panel en inglés y en español.
- [x] Pegar un `TRASPASO.md` en el panel para ver qué se lleva el bot nuevo.
- [x] Versión en inglés de la skill ([`skills/context-bot/en/SKILL.md`](skills/context-bot/en/SKILL.md), en <https://contextbot.app/skill.md>).
- [x] Plantilla del bot lista para publicar ([templates/context-bot-template.md](templates/context-bot-template.md)).
- [x] Estado en directo opcional en el panel con un conector MCP: código y pruebas en [`worker/`](worker/), ver [docs/conector.md](docs/conector.md). Aún sin desplegar.
- [ ] Que el panel funcione sin conexión (instalable como app).
- [ ] Probar el traspaso de memoria en más casos reales y mejorar la plantilla.
- [ ] Más trucos para gastar menos, siempre con fuente.

¿Echas algo en falta? [Propón una idea](https://github.com/AnaGuiDev/context-bot/issues/new?template=idea.yml).

## 🤝 Contribuir

Las ideas, correcciones y mejoras son bienvenidas. Lee [CONTRIBUTING.md](CONTRIBUTING.md), abre un [issue](https://github.com/AnaGuiDev/context-bot/issues) y respeta el [Código de conducta](CODE_OF_CONDUCT.md).

## ☕ Apoya el proyecto

Context Bot es y seguirá siendo gratis. Si te ha ahorrado algún rato, puedes:

<div align="center">

[![Invítame a un café](https://img.shields.io/badge/Inv%C3%ADtame%20a%20un%20caf%C3%A9-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=000)](https://buymeacoffee.com/soyanadev)
[![Propinas en X](https://img.shields.io/badge/Propinas%20en%20X-000000?style=for-the-badge&logo=x&logoColor=fff)](https://x.com/SoyAnaDev)

</div>

- **☕ Buy Me a Coffee:** [invítame a un café](https://buymeacoffee.com/soyanadev).
- **💸 Propinas en X:** desde el [perfil de X](https://x.com/SoyAnaDev), botón de Propinas.
- **Sígueme en X** para enterarte de las novedades: [@SoyAnaDev](https://x.com/SoyAnaDev).

**⭐ [Dale una estrella al repositorio](https://github.com/AnaGuiDev/context-bot)** y **[sígueme en X, @SoyAnaDev](https://x.com/SoyAnaDev)**: es la forma más fácil de ayudar, y te enterarás antes de las novedades. Compartirlo con quien le venga bien también ayuda muchísimo.

## 🔒 Privacidad

La web no usa cookies ni seguimiento, y la fuente y el vídeo se sirven desde la propia web. El panel guarda tus datos solo en tu navegador (`localStorage`). Más detalle en la [página de privacidad](https://contextbot.app/es/privacidad.html). Para avisar de un fallo de seguridad, lee [SECURITY.md](SECURITY.md).

## 💛 Créditos

Hecho con cariño por **Ana Gui**. Gracias a quienes prueban, opinan y mejoran el kit.

Iconos de insignias: [shields.io](https://shields.io). Fuente [Nunito](https://github.com/googlefonts/nunito) (licencia SIL OFL 1.1). Código de conducta basado en el [Contributor Covenant](https://www.contributor-covenant.org/).

## 📄 Licencia

[MIT](LICENSE) © 2026 Ana Gui

> Proyecto comunitario no oficial. No está afiliado a Grok Bot ni a xAI.
