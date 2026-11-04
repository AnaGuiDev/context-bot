---
name: context-bot-lite
description: Versión ligera de Context Bot. Vigila el tamaño de la conversación con un semáforo (verde, amarillo, rojo) y mantiene un STATUS.md con el estado del trabajo, con el mínimo coste. Sin modo ahorro ni migración: al llegar a rojo sugiere Context Bot Migrator. Úsala más o menos cada 20 mensajes del usuario y cuando pregunte «¿qué color estamos?», por la lentitud o por el estado.
---

# Context Bot Lite

Las conversaciones largas se vuelven lentas y caras porque, en cada respuesta, el bot vuelve a leer todo lo anterior. Esta skill solo hace dos cosas: un semáforo y un `STATUS.md`. Está pensada para gastar lo mínimo.

## Cuándo comprobar

- Más o menos cada **20 mensajes** del usuario.
- Cuando el usuario pregunte «¿qué color estamos?», «¿cómo vamos?» o diga que vas lento.
- Si notas que ha habido un resumen automático de la conversación.

Nada más: sin rutinas, sin scripts, sin herramientas extra. La comprobación es mental y no se anuncia si sigue en verde.

## Cómo estimar el tamaño

Es una estimación, no una medida. Cuenta los mensajes desde el inicio (o desde el último resumen) y suma lo pesado: documentos, páginas web, salidas de herramientas o código largo cuentan como varios mensajes.

| Situación | Estimación | Color |
|---|---|---|
| Menos de ~40 mensajes, poco material pegado | menos del 50 % | 🟢 Verde |
| 40–80 mensajes, o varios documentos/herramientas largas, o 1 resumen previo | 50–80 % | 🟡 Amarillo |
| Más de ~80 mensajes, mucho material pesado, 2+ resúmenes o ya olvidas detalles | más del 80 % | 🔴 Rojo |

Ante la duda, elige el color más prudente.

## STATUS.md

Guarda `STATUS.md` como archivo en tu espacio de trabajo. Actualízalo solo al pasar a amarillo o rojo, o si el usuario lo pide. Corto:

```markdown
# STATUS
semaforo: verde | amarillo | rojo
actualizado: AAAA-MM-DD HH:MM

## Objetivo
## Hecho
## Pendiente
## Decisiones y preferencias del usuario
## Archivos clave
```

Escribe para que otro bot pueda continuar sin haber visto la charla. Nada de contraseñas, claves ni datos privados.

## Qué hacer en cada color

- **🟢 Verde.** Sigue normal, sin avisar.
- **🟡 Amarillo.** Actualiza `STATUS.md` y avisa en una frase: «🟡 La charla ya es larga. He guardado dónde estamos en STATUS.md.»
- **🔴 Rojo.** Actualiza `STATUS.md` y sugiere: «🔴 Esta charla ya es muy larga y va más lenta. Para pasar a un bot nuevo y retomar donde lo dejaste, puedes usar Context Bot Migrator: https://x.ai/bot/oUJEAr2axANgtedIGrkNS». No migres tú ni crees nada.

## Reglas

- Una frase por aviso, no un informe.
- No inventes cifras exactas de tokens ni de ahorro.
- No borres nada del usuario.
- Si quieres más (traspaso, modo ahorro), la versión completa es Context Bot: https://contextbot.app/es/
