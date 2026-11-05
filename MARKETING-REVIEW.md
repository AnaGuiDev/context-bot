# Marketing review and launch plan

A frank review of everything people see before they install Context Bot (website, README, repo, social cards, promo videos, launch posts), plus an honest launch plan. Nothing here has been published.

House rules for everything below:

- **No invented numbers.** No user counts, time saved, money saved or star counts until they are real. The site only shows the star count once it reaches 10.
- **No testimonials** unless a real person said it publicly and agreed to be quoted.
- **Say "unofficial"** wherever Grok Bot is named in a headline or card.
- **Public author:** Ana Gui ([@SoyAnaDev](https://x.com/SoyAnaDev), GitHub [AnaGuiDev](https://github.com/AnaGuiDev)). **Project account:** [@contextbotapp](https://x.com/contextbotapp).

---

## TL;DR: do these first

1. **Test the Context Bot Migrator handoff end to end once** (see [NEXT-STEPS.md](NEXT-STEPS.md)). The pitch now leads with "a handoff file brings your memory along". It has to be true before launch day.
2. **Repo settings on GitHub:** new description, more topics, social preview image, and a `v0.2.0` release. Commands are below.
3. **Post the X thread with the 9:16 video natively in post 1** and the link later in the thread (see the launch plan).
4. **Next video pass:** a new 2-second hook, a dark brand end card with a clear verb, louder mix, bigger UI on mobile. Details below. Don't redo the whole thing: most of the footage is fine.
5. **Pin a post on both X accounts** and put `contextbot.app` in both bios.

---

## 1. Positioning

**One line:** A traffic light for long Grok Bot chats.
**Promise:** Keep your bot fast and cheap.
**How:** 🟢 carry on · 🟡 summarize · 🔴 move to a fresh bot, with a handoff file.
**Why trust it:** free, open source (MIT), no download, no sign-up, unofficial community project.

What makes it different is the red light. Lots of people say "start a new chat when it gets long". Context Bot tells you *when*, and makes moving less scary because your bot writes the handoff file for you.

### Honesty checklist (wording to avoid)

| Avoid | Why | Use instead |
| --- | --- | --- |
| "fixes that", "solves" | The chat still grows; Context Bot tells you when to act. | "helps with that", "tells you when" |
| "lossless", "nothing lost", "lose nothing" | A handoff file is a summary. Things can be missed. | "pick up where you left off", "your memory comes along" |
| "saves X% / X tokens" | We don't measure it. | "every reply rereads the whole chat" (sourced) |
| "1 minute" as a promise | Depends on the person. | "about a minute" |
| "official", Grok logo-style art | It isn't. | "unofficial community project" |

Status in the repo after this PR:

- **Website:** clean, no "nothing lost".
- **READMEs:** clean.
- **[docs/lanzamiento.md](docs/lanzamiento.md):** the four "without losing anything" lines are softened.
- **Still to clean:**
  - **[GitHub repo description](https://github.com/AnaGuiDev/context-bot):** says "lossless handoff". Fix it with the command in section 4.
  - **Video:** says "Nothing lost" / "lose nothing".

**Spelling:** the site and READMEs now use US English (summarize, color) to match the X banner. The video uses "summarize" too. Keep it consistent in posts.

---

## 2. Website (this PR)

### Before

The old site was clean and honest, but quiet:

- A white page with a generic headline.
- A small traffic light.
- Install instructions before any reason to care.
- No visual link to the new X banner and avatar.

### After

| Area | What changed |
| --- | --- |
| **Hero** | A pain-to-relief headline: "Long chats make your bot slow & pricey. **Keep it fast & cheap.**" (ES: "Charla larga, bot lento y caro. **Mantenlo rápido y barato.**"). It has a "Your bot is still typing…" kicker and a live traffic light you can click. It cycles green → yellow → red only while visible, and has a Pause button. It's static with `prefers-reduced-motion`. |
| **CTAs** | The primary button copies the install prompt, with a "Copied" confirmation for screen readers. The secondary button is "Star on GitHub". Both are repeated at the end of the page. |
| **Brand** | Dark navy and purple gradient with glowing red, yellow and green lights, matching the X banner and avatar. Nunito is self-hosted (39 KB). |
| **Story** | New sections: the problem (three everyday pains plus *why*, with a source), before/after, and the three lights told as short stories with their thresholds. |
| **Kept and polished** | The three steps, a full-width install box with a copy button, the video (still loads only on click), the six tips with sources, the GitHub and donations block (Buy Me a Coffee and tips on X) and the FAQ (now 7 questions). |
| **Honest proof** | Free, MIT, no download, unofficial. The GitHub star count is fetched at build time and shown only once it reaches 10. No ratings, numbers or quotes. |
| **Links** | @contextbotapp in the footer, the support block, the dashboard and the 404 page. |
| **Dashboard, privacy, 404** | Same brand and header, skip links, footers with the X account. All dashboard IDs and JS are unchanged. |
| **SEO / social** | New OG images (EN and ES) in the banner style. Adds `og:image:type`, `twitter:site` = @contextbotapp, `twitter:creator` = @SoyAnaDev and image alt text. JSON-LD `SoftwareApplication` (free, no ratings). New favicon and Apple touch icon in the avatar style. |
| **Quality** | Checked at 375 px with no horizontal scroll. axe-core reports 0 violations on the landing (EN and ES), dashboard and privacy pages. No console errors. Landing HTML is about 14 KB gzipped. No frameworks, trackers or third-party requests. |

### Ideas for later (not done)

- When the public bot template link exists (`TEMPLATE` in `src/i18n.py`), the primary CTA switches to "Add to Grok Bot" automatically.
- A short `/changelog` page, once there is more than one release.
- A Spanish GIF for `README.es.md` (it currently reuses the English one).

---

## 3. Promo videos

### What's there

The files are `assets/video/promo-{en,es}-{16x9,9x16}.mp4`:

- **Format:** 45 s each, 1080p, 30 fps, H.264 + AAC, about 6.3 MB.
- **Captions:** no caption track.
- **Audio:** a music-only bed with no voiceover, identical in EN and ES. Integrated loudness is about **−18.7 LUFS**, with short near-silent gaps between scenes.
- **Spanish version:** fully localized on-screen text, same edit.

Rough shot list (EN 16:9, sampled every 2.5 s):

| Time | On screen |
| --- | --- |
| 0–2 s | Greyscale photo of a woman at a laptop, then "Waiting again?" from about 0.4 s. A small "typing…" chip. |
| 2–7 s | Light-theme status card: green, then "Context Bot warns you before it gets slow." and yellow. |
| 7–12 s | Two more greyscale reactions: "Didn't I already tell you?" |
| 12–17 s | "Your memory travels with you." Handoff view, old bot → new bot. |
| 17–25 s | "Why did it use so much?" then "Spend less, without thinking." Routine frequency card (every hour → once a day). |
| 25–35 s | "Starting from scratch. Again." then "New bot. Nothing lost." Handoff view, then a warm photo with the same line. |
| 35–40 s | Fast recap: "1. Install the skill" (raw SKILL.md code), then "3. Migrate, lose nothing". |
| 40–45 s | White end card: dots, "Context Bot.", "Keep your bot fast.", "Free and open source.", "by Ana Gui · contextbot.app" in small text. |

### Frank critique

**Hook (first 2 s): weak.**
- The first frame is a grey stock-style photo with no text, no product and no traffic light.
- "Waiting again?" is a good line, but nothing tells you *what* this is about until second 3. On X, most people decide in under 2 s.

**Pacing: the same beat four times.**
- The structure is pain photo → UI card, four times over.
- "New bot. Nothing lost." appears twice in a row.
- The recap at 35–40 s flashes past too fast to read, and step 2 is barely visible.

**Script: one overclaim, one off-topic beat.**
- "Nothing lost / lose nothing" overclaims (see the honesty checklist).
- "Spend less, without thinking" shows routine frequency. That's a real feature, but it dilutes the traffic-light story in a 45 s cut.
- The red light is never the hero. The traffic light is a tiny dot inside a UI card.

**Visual consistency.**
- The photos show different (AI-looking) women in greyscale.
- The UI is a light theme.
- The new brand is dark navy with glowing lights.
- Together they read as three different products.

**Mobile legibility (9:16): the UI text is too small.**
- At phone width (about 390 px), the handoff view's item text renders at roughly 6–7 px. It's unreadable, and it's the key "memory travels" moment.
- The status-card text is borderline.
- The headline captions are fine.

**Sound and captions.**
- Music-only works muted, which is good for X, where most people watch without sound. The on-screen text *is* the captions, so it needs to stay up longer.
- The mix is quiet for social (about −18.7 LUFS; aim for about −14).
- The gaps make it feel like it stalls.

**CTA: weak.**
- The end card is white (off-brand) and holds for about 5 s with a tiny URL and no verb.
- There's no "Install", no "Star", no handle.

**Install shot.**
- Raw `SKILL.md` code contradicts "no coding needed" for the non-developer audience.

### Concrete suggestions (next edit, no full redo)

1. **New 0–2 s hook:** the hero traffic light on the dark brand background flips 🟢 → 🟡 → 🔴 in about 1.5 s. Over it, a chat bubble with "still typing…" and a timer. Large text: "Long chat = slow bot." The current "Waiting again?" can follow at 2 s.
2. **Cut a 20–30 s version for X**: hook → three lights (one line each) → handoff (one shot, zoomed) → end card. Keep the 45 s cut for the website.
3. **One visual style.** Put the dark brand background behind every UI card, or use dark-mode UI. Either drop the photos, or use one consistent person and give them a color grade that matches the brand.
4. **Zoom the UI for 9:16.** Crop to the part that matters, so text is at least 28 px tall on a 1080-px-wide frame. Show three handoff items, not fifteen.
5. **Fix the wording:** "Nothing lost" → "Pick up where you left off" (ES: "Sigue donde lo dejaste").
6. **Replace the SKILL.md shot** with the website's "Copy install prompt" button and a "Copied ✓" state, then the prompt pasted into the chat.
7. **Audio:** normalize to about −14 LUFS (−1 dBTP), close the gaps, and add a soft "ding" on each light change. The lights become the rhythm.
8. **End card (about 2.5 s, dark brand):** a big glowing traffic light, then "Install in about a minute", then **contextbot.app**. Underneath: "Free · Open source · @contextbotapp". ES: "Instálalo en un minuto · contextbot.app/es".
9. **Posters:** today they are mid-transition frames. Use a clean frame (traffic light + headline) so the site and README thumbnails look intentional.
10. **README GIF:** `promo-en.gif` is 7.4 MB, which is slow on mobile GitHub. Use 8–10 s of the new hook at 480 px wide (aim for under 2 MB), and make an ES one.
11. **X upload:** upload natively (not a YouTube link). 9:16 or 1:1 performs best in the timeline on phones; 16:9 is fine on desktop.

---

## 4. README and repo

### README (updated in this PR)

**Top of the page:**
- OG banner as the header image.
- One pain-to-relief line, and the three lights in one line.
- Badges: live GitHub stars, MIT, website, "no coding", follow @contextbotapp. The hard-coded version badge and the workflow badge are removed, since they made the repo look more "dev tool".
- Jump links, and a clickable GIF.

**Sections:**
- Install prompt in a copyable block.
- Threshold table, and a before/after table.
- What's inside, and screenshots.
- Tips and FAQ.
- Roadmap, contributing, and support (star, coffee, tips on X).
- Privacy, credits.

**Polish:**
- Same structure in [README.es.md](README.es.md).
- The star ask comes after the value, once at the top and once at the end, and isn't pushy.

### Repo settings (owner to apply; `gh` here is read-only)

**Description.** The current one says "lossless handoff". Proposed (under 160 characters, with emoji for scannability):

> A traffic light for long Grok Bot chats: 🟢 carry on, 🟡 summarize, 🔴 move to a fresh bot with a handoff file. Free, open source, no download.

**Topics.** The repo has 15 topics; GitHub allows 20. Add `chatbot`, `token-usage`, `handoff`, `traffic-light` and `bilingual`. Leave `mcp` / `mcp-server` only once the worker is live (see [NEXT-STEPS.md](NEXT-STEPS.md)).

```bash
gh repo edit AnaGuiDev/context-bot \
  --description "A traffic light for long Grok Bot chats: 🟢 carry on, 🟡 summarize, 🔴 move to a fresh bot with a handoff file. Free, open source, no download." \
  --homepage "https://contextbot.app" \
  --add-topic chatbot --add-topic token-usage --add-topic handoff \
  --add-topic traffic-light --add-topic bilingual
```

**Social preview.** Upload it in *Settings → General → Social preview*, using `assets/brand/og-image.png` (1200×630). Without it, links to the repo show a generic GitHub card.

**Release.** Nothing is tagged yet, and `0.2.0` was never released. Fold the current "Sin publicar" entries into **v0.2.0** on launch day, set the date in `CHANGELOG.md`, and publish a GitHub release:
- Write short notes in English and Spanish.
- Attach the GIF.
- Link the website.

**About sidebar.** Tick "Releases" and untick "Packages" and "Deployments" so the sidebar stays clean.

### CHANGELOG

- Duplicate headings are tidied, and the redesign is logged.
- It's Spanish-only while the README is English-first. That's fine for the file, but write the GitHub release notes in both languages.

### FUNDING

- `.github/FUNDING.yml` now uses the native `buy_me_a_coffee: soyanadev` key, so GitHub shows a proper "Sponsor" button.
- Tips on X can't go in FUNDING. They are linked in the README and the website instead.
- Add `github: AnaGuiDev` only if GitHub Sponsors is ever set up.

### OG / meta / SEO

**In place:**
- Per-language title and description, canonical URL and `hreflang` (en, es, x-default).
- OG and Twitter cards with a 1200×630 image (separate EN and ES), image alt text and `og:image:type`.
- `twitter:site` @contextbotapp and `twitter:creator` @SoyAnaDev.
- JSON-LD `SoftwareApplication` with a price of 0 and no ratings.
- Sitemap, `theme-color` and dark `color-scheme`.

**After deploy:**
1. Paste `https://contextbot.app/` and `https://contextbot.app/es/` into the X post composer (the card should show the banner), [opengraph.xyz](https://www.opengraph.xyz/) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
2. Run Google's [Rich Results Test](https://search.google.com/test/rich-results) to validate the JSON-LD.
3. Add the site to Google Search Console and Bing Webmaster Tools, then submit `sitemap.xml`.

---

## 5. The proposed X post

> Long Grok Bot chats get slow and expensive. Context Bot helps with a traffic light: green all good, yellow time to summarise, red move to a fresh bot (memory travels with you). Free, open source, no download. Install in 1 minute: https://contextbot.app

**What works:**
- It leads with the pain.
- The mechanism is clear.
- "Free, open source, no download" removes friction.
- There's one link.

**What to change:**
- **"fixes that"** overclaims. The chat still grows; Context Bot tells you when to act.
- **The three lights are buried in a sentence.** Put them on their own lines with 🟢🟡🔴. That's the visual hook in a text post.
- **The differentiator is in parentheses.** "Memory travels with you" is the reason to care, so give it its own line.
- **"Summarise"** is UK spelling; the brand now uses "summarize".
- **"Install in 1 minute"** reads as a promise. "About a minute" is safer.
- **The link sits in the main post.** It's widely reported, though not officially confirmed, that X shows posts with external links to fewer people. On launch day, put the video natively in the first post and the link in the last post of the thread (or a reply). For a single post, keep the link but attach the video.
- **There's no "why".** "Every reply rereads the whole chat" makes it click, and it's sourced on the website.

### Improved single post (EN, 259/280)

> Long Grok Bot chats get slow and pricey: every reply rereads the whole chat.
>
> Context Bot is a traffic light for your bot:
>
> 🟢 carry on
> 🟡 time to summarize
> 🔴 move to a fresh bot, with a handoff file
>
> Free, open source, no download 👇
> https://contextbot.app

### Post único mejorado (ES, 272/280)

> Las charlas largas con Grok Bot se vuelven lentas y caras: cada respuesta relee todo.
>
> Context Bot es un semáforo para tu bot:
>
> 🟢 sigue
> 🟡 toca resumir
> 🔴 pasa a un bot nuevo, con un archivo de traspaso
>
> Gratis, de código abierto, sin descargas 👇
> https://contextbot.app/es/

---

## 6. Launch thread drafts

Post from **@SoyAnaDev** (a person converts better than a brand), then quote-post from **@contextbotapp**, and pin both. Attach the **9:16 video to post 1**. Character counts follow X's rules (links count as 23 and emoji as 2) and are all under 280.

### English

**1/5** (attach `promo-en-9x16.mp4`)
> Your Grok Bot isn't lazy. Your chat is just too long. 🐢
>
> Every reply rereads the whole conversation, so the longer it gets, the slower and pricier each answer is.
>
> I built a free, open-source helper for the "when do I start over?" problem 🧵

**2/5**
> Context Bot is a traffic light that lives in your bot:
>
> 🟢 under ~40 messages: carry on
> 🟡 40–80: your bot summarizes where you are in STATUS.md
> 🔴 80+: time for a fresh bot
>
> Rough estimates, not exact tokens. Good enough to know when to act.

**3/5** (attach the dashboard Handoff screenshot)
> The scary part of starting over: duplicating a bot doesn't copy its memory.
>
> So on red, your bot writes a handoff file with your preferences, decisions, tasks and key files. The new bot reads it and picks up where you left off.
>
> (No passwords in it. Check it before you switch.)

**4/5**
> Install = one prompt. Paste it into your bot's chat, about a minute, no download:
>
> "Install the skill at https://contextbot.app/skill.md into my skill library, save it exactly as written, then confirm."
>
> There's also a free dashboard (data stays in your browser).

**5/5**
> Free, MIT, no ads, no trackers. Unofficial community project, not affiliated with Grok Bot or xAI.
>
> 🌐 https://contextbot.app
> ⭐ https://github.com/AnaGuiDev/context-bot
>
> If it saves you a slow afternoon, a star or a share helps a lot 💛

### Español (España)

**1/5** (adjunta `promo-es-9x16.mp4`)
> Tu Grok Bot no es vago. Es que la charla es demasiado larga. 🐢
>
> Cada respuesta relee la conversación entera: cuanto más larga, más lenta y más cara.
>
> He hecho algo gratis y de código abierto para el «¿cuándo empiezo de cero?» 🧵

**2/5**
> Context Bot es un semáforo que vive en tu bot:
>
> 🟢 menos de ~40 mensajes: sigue
> 🟡 40–80: tu bot resume en qué estáis en STATUS.md
> 🔴 más de 80: toca bot nuevo
>
> Son estimaciones, no tokens exactos. Bastan para saber cuándo actuar.

**3/5** (adjunta la captura del Traspaso en el panel)
> Lo que da miedo de empezar de cero: al duplicar un bot, su memoria no se copia.
>
> Por eso, en rojo, tu bot escribe un archivo de traspaso con tus preferencias, decisiones, tareas y archivos clave. El bot nuevo lo lee y sigue donde lo dejaste.
>
> (Sin contraseñas. Revísalo antes).

**4/5**
> Se instala con un prompt. Lo pegas en el chat de tu bot, un minuto, sin descargar nada:
>
> «Instala la skill de https://contextbot.app/es/skill.md en mi biblioteca de skills, guárdala exactamente como está escrita y confírmamelo.»
>
> Y hay un panel gratis (los datos se quedan en tu navegador).

**5/5**
> Gratis, MIT, sin anuncios ni rastreadores. Proyecto comunitario no oficial, sin relación con Grok Bot ni xAI.
>
> 🌐 https://contextbot.app/es/
> ⭐ https://github.com/AnaGuiDev/context-bot
>
> Si te ahorra una tarde lenta, una estrella o compartirlo ayuda muchísimo 💛

**@contextbotapp quote-post (EN):**
> 🚦 We're live. A traffic light for long Grok Bot chats, made by @SoyAnaDev. Free and open source.

**Cita desde @contextbotapp (ES):**
> 🚦 Ya estamos aquí. Un semáforo para las charlas largas con Grok Bot, hecho por @SoyAnaDev. Gratis y de código abierto.

---

## 7. Where to share (honestly, without spamming)

Read each community's self-promotion rules first. Post once per place, as yourself, and stay to answer questions.

- **X:** the thread above. Reply helpfully to people who complain about slow or long Grok Bot chats. Only link when it actually answers their problem.
- **Grok Bot community spaces** (official forum, Discord or subreddit, if they exist and allow it): use the "Show and tell" or "Projects" area. Lead with the tip ("every reply rereads the whole chat"), not the product.
- **Reddit:** only subreddits that allow self-made tools (check the sidebar), such as AI-assistant and productivity subs. Use an honest title: "I made a free traffic light that tells you when a long Grok Bot chat should move to a fresh bot".
- **Hacker News "Show HN":** only if you're ready for blunt feedback. Use a plain title, and add a first comment explaining why and how, plus its limits (estimates, not exact tokens).
- **Product Hunt:** later, once there's a v0.3 and some real users. A launch needs people around to answer for a whole day.
- **Spanish-speaking communities:** Spanish dev and no-code groups on X, Telegram or Discord. ES is a real advantage here, since few tools in this space are bilingual.
- **Directories:** use the short descriptions in [docs/lanzamiento.md](docs/lanzamiento.md). Lists of AI tools and "awesome" lists on GitHub accept PRs, so pick ones that are maintained.
- **Not recommended:** paid boosts, follow-for-follow, cold DMs, or tagging big accounts to ask for retweets.

---

## 8. First week

| Day | Do |
| --- | --- |
| **Before** | Test the handoff end to end. Apply the repo settings and the social preview. Check the link cards on X. Write the v0.2.0 release notes. Set up both bios and pinned posts. |
| **Day 1** | Post the EN thread (morning, US time) and the ES thread (morning, Spain time) on different days or a few hours apart, not both at once. Quote from @contextbotapp. Stay online for 2–3 hours to reply. |
| **Day 2** | Post one tip with a source (from [docs/tips-ahorro.md](docs/tips-ahorro.md)), no link in the main post. Turn any good question into a FAQ entry or an issue. |
| **Day 3** | A short screen recording of the dashboard's `?demo` Handoff view (15 s, 9:16). "Here's what moves to the new bot." |
| **Day 4** | Share in one or two communities from the list above. |
| **Day 5** | A "behind the scenes" post: why a traffic light, what you decided *not* to build, and what's next on the roadmap. Ask what's confusing. |
| **Day 6–7** | Fix the top issue that people hit, ship it, and post a short "Fixed: …, thanks @person" (with their OK). Label some issues `good first issue` for contributors. |

**Ongoing:**
- Reply to every comment in the first week.
- Add new tips to `tips-ahorro.md` only when they have a source.
- Post the star count only when it's real and worth celebrating, never as pressure.

### Measuring without trackers

- **GitHub:** stars, forks, issues, and *Insights → Traffic* (views, clones, referrers). This is first-party and needs no setup.
- **Cloudflare:** if the site is on Cloudflare Pages, Cloudflare's built-in Web Analytics is cookieless. Only turn it on if you're happy with it and mention it in the privacy page. It isn't enabled today.
- **X:** post analytics (impressions, profile visits, link clicks).
- **Buy Me a Coffee:** supporters.
- **Note:** don't add Google Analytics or pixels. "No trackers" is part of the pitch.

---

## 9. Risks and disclaimers

- **Unofficial:** "unofficial community project, not affiliated with Grok Bot or xAI" belongs in the README, the site footer and post 5. Avoid using their logos.
- **Estimates:** thresholds are message counts and rough percentages, not exact token counts. Say so when asked.
- **Sources:** some "why" sources are team forum posts, not official docs. The site links them, and they shouldn't be called "official".
- **Handoff:** it's a summary the bot writes. Encourage people to read it before switching. That's already in the FAQ and thread post 3.
- **Privacy:** the dashboard keeps data in the browser, and the handoff file must not contain passwords. Keep both promises true as features grow (especially the live-status worker).
