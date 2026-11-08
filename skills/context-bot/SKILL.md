---
name: context-bot
description: Vigila el tamaño de la conversación, mantiene un STATUS.md con el estado del trabajo y avisa con un semáforo (verde, amarillo, rojo) cuándo conviene resumir o pasar a un bot nuevo con Context Bot Migrator, con un archivo de traspaso para que la memoria viaje. Incluye un modo ahorro: apunta cada tarea en un log y, una vez por semana, un script cuenta las repetidas; también repasa el texto de sus rutinas para proponer pasar lo mecánico a script. Úsala al empezar cada sesión, cada 10 mensajes aproximadamente, tras tareas largas y siempre que el usuario pregunte por la lentitud, el coste, el estado o el modo ahorro.
---

# Context Bot

Las conversaciones largas se vuelven lentas y caras porque, en cada respuesta, el bot vuelve a leer todo lo anterior. Esta skill te ayuda a darte cuenta a tiempo para que el usuario retome donde lo dejó.

## Cuándo comprobar el contexto

Haz una comprobación rápida (no hace falta decirlo cada vez):

- Al empezar una sesión o al retomar después de una pausa.
- Más o menos cada 10 mensajes del usuario.
- Después de una tarea larga: leer documentos grandes, muchos resultados de herramientas, código extenso.
- Cuando el usuario diga que vas lento, que le sale caro o pregunte «¿Cómo vamos?».
- Si notas que ha habido una compactación o un resumen automático de la conversación.

## Cómo estimar el tamaño

No tienes un contador exacto, así que estima con lo que ves. Regla práctica: **1 token ≈ 4 caracteres ≈ 0,75 palabras**.

1. Cuenta los mensajes del usuario y tus respuestas desde el inicio (o desde el último resumen).
2. Suma lo pesado: cada documento, página web, salida de herramienta o bloque de código largo cuenta como varios mensajes.
3. Si la conversación ya se ha resumido o compactado una vez, considera que estás al menos en amarillo: es señal de que el contexto se llenó.
4. Usa esta tabla orientativa:

| Situación | Estimación | Color |
|---|---|---|
| Menos de ~40 mensajes, poco material pegado | menos del 50 % | 🟢 Verde |
| 40–80 mensajes, o varios documentos/herramientas largas, o 1 resumen previo | 50–80 % | 🟡 Amarillo |
| Más de ~80 mensajes, mucho material pesado, 2+ resúmenes o respuestas que ya olvidan detalles | más del 80 % | 🔴 Rojo |

Son umbrales orientativos, no exactos. Ante la duda, elige el color más prudente.

## Mantener STATUS.md

Guarda un archivo `STATUS.md` (como archivo en tu espacio de trabajo: al pasar a un bot nuevo, la memoria no se copia) con el estado real del trabajo. Actualízalo cuando cambie algo importante y siempre al pasar a amarillo o rojo. Estructura:

```markdown
# STATUS
semaforo: verde | amarillo | rojo
actualizado: AAAA-MM-DD HH:MM
mensajes_aprox: 35

## Objetivo
Una o dos frases.

## Hecho
- …

## En curso
- …

## Pendiente
- …

## Decisiones y preferencias del usuario
- …

## Archivos y enlaces clave
- …
```

Escribe para que otro bot, sin haber visto la conversación, pueda continuar. Nada de contraseñas ni datos privados en el STATUS.

## Qué hacer en cada color

**🟢 Verde.** Sigue normal. No hace falta avisar. Actualiza el STATUS si hay avances.

**🟡 Amarillo.** Actualiza el STATUS y díselo al usuario en una frase sencilla, por ejemplo:

> 🟡 La conversación ya es bastante larga. He guardado un resumen de lo que llevamos en STATUS.md. Podemos seguir, pero a partir de aquí iré algo más lento. Cuando quieras pasar a un bot nuevo, Context Bot Migrator te acompaña: https://x.ai/bot/oUJEAr2axANgtedIGrkNS

Escribe o actualiza también el `TRASPASO.md`. Ofrece resumir: a partir de ahora trabaja apoyándote en el STATUS y evita volver a pegar material grande.

**🔴 Rojo.** Actualiza el STATUS por completo, prepara el Traspaso y recomienda cambiar a un bot nuevo:

> 🔴 Esta conversación ya es muy larga y eso la hace lenta y más cara. Te propongo pasar a un bot nuevo: he dejado apuntado en STATUS.md dónde estamos para que retomes donde lo dejaste. ¿Te ayudo a hacerlo con Context Bot Migrator? https://x.ai/bot/oUJEAr2axANgtedIGrkNS

No migres sin que el usuario lo confirme.

## Traspaso: la memoria viaja en un archivo

Al pasar a un bot nuevo, la memoria aprendida no se copia. Por eso, **en amarillo o rojo, y siempre antes de migrar**, escribe un archivo de traspaso.

**Dónde:** en un sitio que el bot nuevo pueda leer. Por ejemplo, en el ordenador compartido de los bots: `/workspace/context-bot-traspasos/<nombre-del-bot>/TRASPASO.md`, o en un almacén persistente compartido. Dile al usuario la ruta exacta.

**Qué contiene** (plantilla: `examples/TRASPASO.md.example`):

1. **Resumen corto:** tres a cinco frases de qué hacemos y en qué punto estamos.
2. **Memoria duradera:** lo que sabes y debe seguir sabiéndose. Preferencias del usuario, decisiones tomadas, personas y proyectos, forma de trabajar.
3. **Estado actual:** tareas en curso, pendientes y bloqueos (o copia el `STATUS.md` al día).
4. **Archivos y rutas clave:** dónde está cada cosa.
5. **Rutinas:** nombre, cuándo se ejecutan y para qué sirven.

**Privacidad:** nunca escribas contraseñas, claves, tokens, números de tarjeta ni códigos de acceso. Si hace falta uno, pon «está en el gestor de credenciales del usuario». Pide al usuario que revise el archivo antes de compartirlo o de dárselo a otro bot. Si quiere, puede pegarlo (es opcional) en la vista **Traspaso** del panel (https://contextbot.app/es/dashboard/#handoff) para ver de un vistazo qué pasará al bot nuevo.

## Arranque: el primer turno del bot nuevo

Si el primer mensaje menciona un traspaso, o encuentras un `TRASPASO.md` para tu nombre:

1. Lee el archivo entero.
2. Guarda en tu propia memoria los hechos de «Memoria duradera» (uno por hecho, sin secretos).
3. Crea o actualiza tu `STATUS.md` con el estado del traspaso y ponlo en verde.
4. Comprueba que las rutinas de la lista existen (si se copió la configuración, ya estarán; Context Bot Migrator las deja en pausa). No crees ni actives nada sin preguntar.
5. Responde con un resumen de tres frases y pregunta si algo no cuadra.

## Pasar a un bot nuevo con Context Bot Migrator

1. Haz el **Traspaso**: actualiza `STATUS.md` (en rojo) y escribe `TRASPASO.md`. El traspaso se envía **como archivo adjunto** (no pegado en el chat).
2. Ofrece Context Bot Migrator (plantilla: https://x.ai/bot/oUJEAr2axANgtedIGrkNS): lee este chat él mismo y habla contigo por SendToAgent, así el dueño no copia mensajes entre bots. Le acompaña hasta un bot nuevo con la misma configuración (nombre, instrucciones, skills, rutinas), pero con la conversación vacía y sin la memoria aprendida. Por eso la memoria viaja en el archivo de traspaso.
3. Cuando el Migrator te contacte por SendToAgent, respóndele con todo lo que pida (repaso del traspaso, lista de rutinas, etc.) y, cuando el bot nuevo esté verificado, pausa tus rutinas si te lo pide.
4. Cuando el bot nuevo confirme que lo ha entendido, el usuario puede seguir allí y dejar el antiguo oculto para consulta.

Guía completa: `docs/migrator.md`.

## Modo ahorro: tareas repetidas y rutinas que pueden ser scripts

Mira dos cosas, las dos baratas: **(a) las tareas que el usuario te pide a menudo** y **(b) tus rutinas**. Para (a): **apuntas las tareas sobre la marcha, un script hace las cuentas y tú solo lees un resumen de 10 líneas**. Nunca releas el historial de la charla para esto. Son **sugerencias de ahorro**: el ahorro real depende de cada caso y no se puede garantizar.

**1. Apunta cada tarea al terminarla**

Cada vez que termines una tarea que pidió el usuario (en el chat o en una ejecución de rutina), añade **una** línea corta a `/workspace/context-bot/tareas.log`:

```
2026-11-04 | csv-convert | ventas CSV a xlsx para informe
```

- Formato: `fecha (AAAA-MM-DD) | clave | nota de 3 a 8 palabras`.
- La clave es corta, en minúsculas y con guiones, y **siempre la misma para la misma tarea** (`csv-convert`, `web-check`, `git-push`, `informe-diario`, `backup-web`). Reutiliza las claves que ya existan.
- Sin datos privados, nombres de personas ni secretos en la nota. Si la carpeta no existe, créala.
- Solo apuntas tus propias tareas. **Nunca leas las charlas de otros bots.**

**2. El script cuenta, no tú**

`savings-scan.sh` (en `https://contextbot.app/savings-scan.sh`, se instala en `/workspace/context-bot/savings-scan.sh`) lee el log sin gastar uso del bot y saca como mucho 10 líneas con las claves repetidas 3 o más veces en los últimos 30 días. Es de solo lectura. Instálalo la primera vez que haga falta, diciéndoselo al usuario.

**3. Cuándo mirarlo**

- Durante la comprobación de tamaño que ya haces, **como mucho una vez por semana**: ejecuta `bash /workspace/context-bot/savings-scan.sh` y lee solo su salida. No crees una rutina nueva para esto.
- Cuando el usuario diga «modo ahorro ya» (o «savings mode now»): ejecútalo en ese momento.
- Si no hay nada repetido, no digas nada (o, si lo pidió, «Nada repetido todavía»).

**3b. Revisa también tus rutinas (barato)**

En la misma comprobación semanal (o con «modo ahorro ya»), repasa tus rutinas leyendo **solo el texto guardado de cada rutina** (sus instrucciones y su frecuencia), sin abrir sus ejecuciones ni sus resultados. Marca las partes deterministas (traer datos, montar informes con archivos, copias, conversiones, comprobaciones). Una rutina frecuente que casi solo hace pasos mecánicos es buena candidata: el script haría esa parte y la rutina solo lo lanzaría y resumiría. Si ya revisaste una rutina y su texto no ha cambiado, no la vuelvas a revisar.

**4. Si algo se repite o una rutina es mecánica, propone UN script**

Elige la tarea repetida (del log) o la parte de rutina más clara que sea **determinista y repetible** (traer datos, informes a partir de archivos, copias, conversiones de formato, comprobaciones) y propón un solo script:

- qué haría y cómo se lanzaría: **a demanda** («ejecuta informe-diario») o con **cron** en el box;
- el beneficio estimado de forma cualitativa (alto, medio, bajo) y por qué, por ejemplo «lo pediste 6 veces este mes y son siempre los mismos pasos». **No inventes cifras** de ahorro, tokens ni dinero;
- qué se queda contigo: el criterio, la redacción, los imprevistos y decidir qué hacer con el resultado.

Si la tarea necesita juicio o es texto para personas, dilo y no la propongas.

## Informes recurrentes / modo solo consulta

Como alternativa o complemento al script, puedes proponer una **Grok Bot Page** para un informe, resumen o panel real. Palabras como `report`, `informe`, `resumen`, `daily`, `diario`, `métricas`, `summary` o `dashboard` en la clave, nota o instrucciones son solo indicios: comprueba que el trabajo consiste realmente en elaborar un informe. Debe cumplir al menos una condición: su clave aparece **3 o más veces en los últimos 30 días**, según el resumen del escaneo existente, o ya es una rutina recurrente de informes.

- Aprovecha la comprobación del modo ahorro y el texto guardado de las rutinas: **no releas el historial**, las ejecuciones ni los resultados para detectar candidatos, ni añadas otro escaneo o rutina de detección.
- Haz **una propuesta cada vez**, contando también las propuestas de scripts. Ofrécelo solo **una vez por clave**. Registra la clave y el estado `propuesto`, `aceptado` o `rechazado` en `STATUS.md`, bajo «Informes recurrentes», sin notas privadas ni contenido del informe. Registra también el rechazo para no insistir; si queda sin respuesta, conserva `propuesto`.
- Reutiliza la misma Page y, si ya hay una rutina para ese informe, propón **modificarla**, no duplicarla. La **rutina recupera los datos de fuentes autorizadas y edita la Page**; la Page no obtiene datos nuevos por sí sola.
- El aviso en el chat debe ser corto y llevar el enlace, **sin pegar el cuerpo del informe**. Notifica también los fallos, indicando la fecha y hora (con zona horaria) de la última actualización correcta, o que aún no la hay. No presentes datos antiguos como recién actualizados.
- Explica que puede reducir el contenido acumulado en el chat y el uso asociado, **sin garantizar ahorro**: generar y actualizar el informe sigue consumiendo uso.

**Ejemplo de propuesta** (adapta el nombre y si se crea o modifica la rutina):

> Generas este informe con frecuencia. Puedo mantenerlo en una misma Grok Bot Page, actualizarlo con una rutina y enviarte solo un aviso breve con el enlace, también si falla. Tendrá una descarga adecuada a los datos. Puede reducir el contenido del chat, pero generar el informe sigue consumiendo uso. ¿Quieres que prepare la Page y cree o modifique la rutina?

**Solo tras la confirmación explícita del usuario:**

1. Lee y sigue las skills de **canvas** y **routines** antes de crear o modificar nada. Concreta nombre, fuentes autorizadas, alcance, frecuencia y zona horaria; pide únicamente los datos o permisos necesarios que falten. No amplíes accesos ni compartas información sin autorización.
2. Crea y verifica la Page (o reutiliza la existente) y crea o modifica la rutina autorizada. Haz tú el trabajo; pide ayuda al dueño solo en pasos que realmente requieran su intervención. Guarda antes una copia de lo que vayas a modificar y explica cómo volver atrás.
3. Ofrece una exportación apropiada **CSV, XLSX o PDF**, según los datos y las capacidades disponibles: no prometas todos los formatos. Incluye una forma clara de descargarla y comprueba que el enlace funciona y el archivo corresponde a los datos. Si no puedes verificarlo, dilo y no lo presentes como terminado.
4. Verifica el destino de las actualizaciones, la configuración de la rutina y el aviso breve con enlace; comprueba el resultado de la prueba autorizada antes de darlo por listo. La Page mostrará la última actualización correcta; ante un fallo, conserva esa referencia y avisa sin publicar datos incompletos como actuales.
5. En `STATUS.md`, bajo **Informes recurrentes**, registra solo metadatos no sensibles: nombre genérico, clave, estado de la propuesta, id/enlace de la Page, id de la rutina, fecha de configuración y **«Modo solo consulta activado»** cuando esté verificado. Si hay un bloqueo, anótalo como pendiente, no como activado. Nunca guardes datos sensibles en archivos de Context Bot.

**Prompt adaptable tras la confirmación:**

```text
Crea o reutiliza la Page «[nombre del informe]».
Crea o modifica la rutina [id si existe] para recuperar datos de [fuentes autorizadas]
y actualizar siempre esa misma Page [frecuencia y zona horaria].
Envía al chat solo un aviso breve y el enlace, nunca el informe completo.
Notifica los fallos e indica la última actualización correcta con su zona horaria.
Incluye y verifica una descarga en [formato apropiado disponible: CSV, XLSX o PDF].
Verifica Page y rutina; registra sus identificadores y el modo solo consulta en STATUS.md,
sin datos sensibles. Generar y actualizar el informe sigue consumiendo uso.
```

**Reglas del modo ahorro**

- **No crees, cambies ni borres scripts, cron ni rutinas sin la confirmación explícita del usuario.** Una propuesta cada vez.
- Antes de cambiar algo, guarda una copia (por ejemplo en `/workspace/backups/` con fecha) y explica cómo volver atrás.
- Guarda los scripts en `/workspace/scripts/`, con un comentario arriba que diga qué hacen, y apúntalos en `/workspace/scripts/INDEX.md` (nombre, qué hace, cómo se lanza, fecha).
- Prueba el script una vez delante del usuario antes de programarlo.
- Nada de contraseñas ni tokens dentro de los scripts ni del log.
- Apunta en STATUS.md, en «Decisiones», qué pasó a script y dónde está la copia.

## Reglas

- Sé breve: el aviso de color es una frase, no un informe.
- No inventes cifras exactas de tokens; habla de estimaciones.
- Ni contraseñas ni credenciales en STATUS ni en TRASPASO.
- No borres nada del usuario. Migrar es copiar, no mover.
- Si el usuario pregunta «¿Cómo vamos?», responde con el color, la estimación y una frase de qué toca hacer.
