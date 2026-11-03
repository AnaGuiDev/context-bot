# Kit de lanzamiento

Borradores para cuando publiques. **Nada de esto se ha publicado.** Revísalo, cámbialo a tu gusto y publícalo tú cuando la web y el repositorio estén en marcha.

Antes de usar estos textos, ejecuta `scripts/rellenar-placeholders.sh`: los enlaces `TODO-DOMINIO` se cambiarán solos.

## Posts para X (como Ana Gui)

### Opción 1 · Post único

> ¿Tu bot de Grok Bot va cada vez más lento en las charlas largas? 🐢
>
> He hecho Control de Contexto: un semáforo 🟢🟡🔴 que te avisa cuándo resumir y cuándo pasar a un bot nuevo sin perder nada.
>
> Gratis y de código abierto 👇
> https://TODO-DOMINIO/

*(Adjunta el vídeo `assets/video/promo-16x9.mp4` o el 9:16 si lo ves desde el móvil.)*

### Opción 2 · Hilo corto

**1/4**
> Cuanto más larga es la charla con tu bot, más tarda y más gasta: en cada respuesta vuelve a leerlo todo.
>
> Casi nadie se da cuenta hasta que ya va lento. Así que he hecho una cosa 🧵

**2/4**
> Control de Contexto es un semáforo para tu bot:
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
> También trae un panel para revisar tus bots y rutinas, y trucos para gastar menos (cada uno con su fuente).
>
> Gratis, sin cuentas ni cookies:
> https://TODO-DOMINIO/
>
> Proyecto no oficial, hecho con cariño 💛

### Opción 3 · Truco + enlace

> Un truco sencillo para que tu semana de Grok Bot dure más: no contestes «ok» a cada mensaje. Cada respuesta del bot relee toda la charla.
>
> He juntado este y otros trucos, todos con su fuente, aquí 👇
> https://github.com/ana-gui/control-de-contexto/blob/main/docs/tips-ahorro.md

## Descripción corta para directorios

**Una línea (máx. ~80 caracteres):**
> Un semáforo para que tus charlas con Grok Bot no se vuelvan lentas ni caras.

**Párrafo corto:**
> Control de Contexto es un kit gratuito y de código abierto para Grok Bot. Tu bot vigila el tamaño de la conversación, mantiene un resumen del trabajo y te avisa en verde, amarillo o rojo. Cuando toca, escribe un archivo de traspaso para que un bot nuevo siga sin perder nada. Incluye un panel en el navegador, sin cuentas ni cookies. Proyecto comunitario no oficial.

**Etiquetas:** grok-bot, productividad, agentes de IA, código abierto, español.

## Lista de comprobación del lanzamiento

### Antes
- [ ] Dominio comprado y apuntado (ver [publicar.md](publicar.md)).
- [ ] `scripts/rellenar-placeholders.sh` ejecutado y `grep -rn "TODO" .` revisado.
- [ ] Repositorio creado como Ana Gui, con descripción, temas e imagen social.
- [ ] Web en marcha con HTTPS. Panel con `?demo` probado en móvil.
- [ ] Perfil de X listo: foto, biografía, enlace a la web y **Propinas** activadas.
- [ ] Página de Buy Me a Coffee creada.
- [ ] Fecha puesta en `CHANGELOG.md` y versión v0.2.0 creada.
- [ ] La vista previa del enlace en X muestra la imagen del semáforo.

### El día
- [ ] Publicar el post o el hilo, con el vídeo.
- [ ] Fijar el post en el perfil.
- [ ] Contestar dudas con calma. Si algo falla, abrir un issue para no olvidarlo.

### Después
- [ ] Apuntar en issues las ideas que lleguen.
- [ ] Añadir a `tips-ahorro.md` solo los trucos que tengan fuente.
- [ ] No publicar cifras de uso ni testimonios sin permiso y sin datos reales.
