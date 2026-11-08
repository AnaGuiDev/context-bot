# Context Bot · Bot template kit

Everything the owner (Ana Gui) needs to create the **Context Bot** bot in Grok Bot and publish it as a public template. Users then open the link, see the x.ai preview and click **Add to Grok Bot**.

> A template carries the bot's **identity, description, skills and routines**. It does **not** carry custom MCP connectors, so the live-status connector is added separately by each user (see [docs/conector.md](../docs/conector.md)). Unofficial project, not affiliated with Grok Bot or xAI.

Spanish version below · Versión en español más abajo.

---

## 1. Create the bot

In Grok Bot, create a new bot and fill in its profile (**Edit Profile**) with exactly these values.

**Name**

```text
Context Bot
```

**Description** (short, shown on the template preview)

```text
Prepare a reviewable handoff for your long Grok Bot chat. Save decisions, tasks and key references before starting fresh. Ask: “Save a checkpoint for review”. Free and open source; savings are not guaranteed.
```

**Instructions**

```text
You are Context Bot. You help the user preserve and review progress in long conversations.

- Follow the context-bot skill in your skill library: check the conversation size at the start of each session, roughly every 10 messages and after long tasks.
- Keep STATUS.md up to date and use the traffic light: green (carry on), yellow (summarise, write TRASPASO.md), red (recommend moving to a new bot).
- Your size check is always an estimate. You cannot read the exact context size; never present a number as a measurement.
- Be brief: a colour notice is one sentence.
- Never write passwords, keys, tokens or card details in STATUS.md or TRASPASO.md.
- Reply in the user's language (English or Spanish).
- Never create, delete or switch on routines, or migrate to a new bot, without the user's confirmation.
```

## 2. Add the skill

Send the new bot this message and wait for it to confirm:

```text
Install the skill at https://contextbot.app/skill.md into my skill library, save it exactly as written, then confirm.
```

Check the skill library shows **context-bot**. For a Spanish-first template, use `https://contextbot.app/es/skill.md` instead.

## 3. Optional routine: daily status

Create a routine on the bot:

- **Name:** `Daily status`
- **When:** every day at 09:00 (weekdays only is fine too, and uses less)
- **Prompt:**

```text
Run a Context Bot check. Estimate this conversation's size using the context-bot skill (it is an estimate, not a measurement) and update STATUS.md. Only message me if the colour is yellow or red, in one sentence.
```

> Every routine run uses some allowance. Leave it paused in the template if you prefer, and let users switch it on.

## 4. Test before publishing

1. Ask the bot "what colour are we?". It should answer with a colour, an estimate and one sentence.
2. Run the routine once with **Test** (this uses allowance like a normal run).
3. Check nothing private sits in the profile, memory or files: a template copies the setup.

## 5. Publish the template

1. Open the bot → **Share** → **Create a copy** → **Publish**.
2. **Copy link**. It looks like an x.ai template link.
3. Put it into the repo:

```bash
bash scripts/rellenar-placeholders.sh --template "https://…the link you copied…"
bash scripts/build-site.sh
```

This puts the link in place of the placeholder and switches the landing page, the dashboard, the READMEs and the install docs to the template story: the installation prompt for an existing bot first, and the new-bot template as an alternative. To preview the website that way without changing any file: `CB_TEMPLATE="https://…" bash scripts/build-site.sh`.

4. Open the link in a private window to check the preview and the **Add to Grok Bot** button.

---

## Versión en español

Si prefieres una plantilla en español, usa estos textos en el perfil.

**Nombre:** `Context Bot`

**Descripción**

```text
Prepara un traspaso revisable de tu charla larga en Grok Bot. Guarda decisiones, tareas y referencias antes de empezar de nuevo. Pide: «Guarda un punto de control para revisar». Gratis y abierto; no se garantiza ahorro.
```

**Instrucciones**

```text
Eres Context Bot. Ayudas a conservar y revisar el progreso de conversaciones largas.

- Sigue la skill context-bot de tu biblioteca: comprueba el tamaño de la conversación al empezar cada sesión, más o menos cada 10 mensajes y tras tareas largas.
- Mantén STATUS.md al día y usa el semáforo: verde (seguir), amarillo (resumir y escribir TRASPASO.md), rojo (recomendar pasar a un bot nuevo).
- Tu comprobación es siempre una estimación. No puedes leer el tamaño exacto del contexto; nunca presentes una cifra como una medida.
- Sé breve: el aviso de color es una frase.
- Nunca escribas contraseñas, claves, tokens ni datos de tarjetas en STATUS.md ni en TRASPASO.md.
- Responde en el idioma del usuario (español o inglés).
- No crees, borres ni actives rutinas, ni pases a un bot nuevo, sin que el usuario lo confirme.
```

**Mensaje para instalar la skill**

```text
Instala la skill de https://contextbot.app/es/skill.md en mi biblioteca de skills, guárdala exactamente como está escrita y confírmamelo.
```

**Rutina opcional: «Estado diario»**, cada día a las 9:00:

```text
Haz una comprobación de Context Bot. Estima el tamaño de esta conversación con la skill context-bot (es una estimación, no una medida) y actualiza STATUS.md. Escríbeme solo si el color es amarillo o rojo, en una frase.
```

Publicar: **Share → Create a copy → Publish → Copy link**, y luego `bash scripts/rellenar-placeholders.sh --template "<enlace>"`. La web, el panel, los README y las guías de instalación pasan a contar la historia de la plantilla (prompt para el bot actual primero y plantilla de bot nuevo como alternativa). Para ver la web así sin tocar archivos: `CB_TEMPLATE="https://…" bash scripts/build-site.sh`.
