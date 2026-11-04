# Kit de lanzamiento

Borradores para cuando publiques. **Nada de esto se ha publicado.** Hay una versión revisada del hilo, en inglés y en español, en [MARKETING-REVIEW.md](../MARKETING-REVIEW.md). Revísalo, cámbialo a tu gusto y publícalo tú cuando la web y el repositorio estén en marcha.

Los enlaces ya apuntan a `https://contextbot.app`. Antes de publicar, ejecuta `scripts/rellenar-placeholders.sh` para poner tu usuario de X y de Buy Me a Coffee.

## Posts para X en español (como Ana Gui)

### Opción 1 · Post único

> ¿Tu bot de Grok Bot va cada vez más lento en las charlas largas? 🐢
>
> He hecho Context Bot: un semáforo 🟢🟡🔴 que te avisa cuándo resumir y cuándo pasar a un bot nuevo con un archivo de traspaso.
>
> Gratis y de código abierto 👇
> https://contextbot.app/es/

*(Adjunta el vídeo `assets/video/promo-es-16x9.mp4`, o `promo-es-9x16.mp4` para quien lo vea en el móvil.)*

### Opción 2 · Hilo corto

**1/4**
> Cuanto más larga es la charla con tu bot, más tarda y más gasta: en cada respuesta vuelve a leerlo todo.
>
> Casi nadie se da cuenta hasta que ya va lento. Así que he hecho una cosa 🧵

**2/4**
> Context Bot es un semáforo para tu bot:
> 🟢 todo bien
> 🟡 toca resumir
> 🔴 mejor pasar a un bot nuevo
>
> Tu bot lo vigila solo y apunta en qué estáis en un STATUS.md.

**3/4**
> Lo que más me preocupaba: al duplicar un bot, la memoria no se copia.
>
> Por eso el bot escribe un archivo de traspaso con tus preferencias, decisiones y tareas. El bot nuevo lo lee y sigue donde lo dejaste. Sin contraseñas, claro.

**4/4**
> El panel te enseña qué pasa al bot nuevo (memoria, tareas, archivos, rutinas) y te da el TRASPASO.md. También revisa tus rutinas.
>
> Gratis, sin cuentas ni cookies:
> https://contextbot.app/es/
>
> Proyecto no oficial, hecho con cariño 💛

### Opción 3 · Truco + enlace

> Un truco sencillo para que tu semana de Grok Bot dure más: no contestes «ok» a cada mensaje. Cada respuesta del bot relee toda la charla.
>
> He juntado este y otros trucos, todos con su fuente, aquí 👇
> https://github.com/AnaGuiDev/context-bot/blob/main/docs/tips-ahorro.md

## X posts in English (as Ana Gui)

### Option 1 · Single post

> Is your Grok Bot getting slower as the chat gets longer? 🐢
>
> I made Context Bot: a 🟢🟡🔴 traffic light that tells you when to summarise and when to move to a fresh bot with a handoff file.
>
> Free and open source 👇
> https://contextbot.app/

*(Attach `assets/video/promo-en-16x9.mp4`, or `promo-en-9x16.mp4` for mobile viewers.)*

### Option 2 · Short thread

**1/4**
> The longer your chat with a bot, the slower and pricier it gets: every reply rereads the whole thing.
>
> Most people don't notice until it's already sluggish. So I built something 🧵

**2/4**
> Context Bot is a traffic light for your bot:
> 🟢 all good
> 🟡 time to summarise
> 🔴 better move to a new bot
>
> Your bot keeps an eye on it and writes down where you are in a STATUS.md.

**3/4**
> What worried me most: duplicating a bot doesn't copy its memory.
>
> So the bot writes a handoff file with your preferences, decisions and tasks. The new bot reads it and picks up where you left off. No passwords, of course.

**4/4**
> The dashboard shows what travels to the new bot (memory, tasks, files, routines) and hands you the file. It reviews your routines too.
>
> Free, no account, no cookies:
> https://contextbot.app/
>
> Unofficial project, made with care 💛

### Option 3 · Tip + link

> A simple way to make your Grok Bot week last longer: don't reply "ok" to every message. Every reply rereads the whole chat.
>
> I've collected this and other tips, each with a source 👇
> https://github.com/AnaGuiDev/context-bot/blob/main/docs/en/tips.md

## Descripción corta para directorios

**Una línea (máx. ~80 caracteres):**
> Un semáforo para que tus charlas con Grok Bot no se vuelvan lentas ni caras.

**Párrafo corto:**
> Context Bot es un kit gratuito y de código abierto para Grok Bot. Tu bot vigila el tamaño de la conversación, mantiene un resumen del trabajo y te avisa en verde, amarillo o rojo. Cuando toca, escribe un archivo de traspaso para que un bot nuevo siga donde lo dejaste. Incluye un panel en el navegador, sin cuentas ni cookies. Proyecto comunitario no oficial.

**Etiquetas:** grok-bot, productividad, agentes de IA, código abierto, español.

**In English · one line:**
> Keep your bot fast: a traffic light for long Grok Bot chats.

**In English · short paragraph:**
> Context Bot is a free, open-source kit for Grok Bot. Your bot watches how big the conversation is, keeps a summary of the work and warns you on green, yellow or red. When it's time, it writes a handoff file so a new bot can pick up where you left off. It comes with a browser dashboard, no account and no cookies. Unofficial community project.

**Tags:** grok-bot, productivity, ai-agents, open-source.

## Lista de comprobación del lanzamiento

### Antes
- [ ] `contextbot.app` comprado en Cloudflare Registrar y la web en Cloudflare Pages con HTTPS activo (ver [publicar.md](publicar.md)). Con `.app`, sin certificado no carga nada.
- [ ] `scripts/rellenar-placeholders.sh` ejecutado y `grep -rn "TODO" .` revisado.
- [ ] Repositorio creado como Ana Gui, con descripción, temas e imagen social.
- [ ] Web en marcha con HTTPS. Panel con `?demo` probado en móvil, en inglés y en español, incluida la vista Traspaso.
- [ ] Perfil de X listo: foto, biografía, enlace a la web y **Propinas** activadas.
- [ ] Página de Buy Me a Coffee creada.
- [ ] Fecha puesta en `CHANGELOG.md` y versión v0.2.0 creada.
- [ ] La vista previa del enlace en X muestra la imagen del semáforo (`/` en inglés, `/es/` en español).

### El día
- [ ] Publicar el post o el hilo, con el vídeo.
- [ ] Fijar el post en el perfil.
- [ ] Contestar dudas con calma. Si algo falla, abrir un issue para no olvidarlo.

### Después
- [ ] Apuntar en issues las ideas que lleguen.
- [ ] Añadir a `tips-ahorro.md` solo los trucos que tengan fuente.
- [ ] No publicar cifras de uso ni testimonios sin permiso y sin datos reales.
