# Ejemplo de traspaso real

> Migración real del 5 de noviembre de 2026 (hora de Madrid), hecha con Context Bot Migrator (plantilla v15). Sin secretos ni contenido privado; lo que no se anotó aparece como «no anotado».

## El bot

- Para qué sirve (genérico): bot responsable de un proyecto open source (repo, skills, web y docs) que además coordina migraciones de otros bots. El bot antiguo se llamaba «Control de Contexto» y el nuevo es «Control de Contexto 2».
- Color antes de migrar: no anotado (la migración se hizo por conversación muy larga).
- Mensajes aproximados: no anotado.
- Señales que notaste (lentitud, olvidos, resúmenes automáticos): conversación muy larga, con varios traspasos previos acumulados.

## Inventario (etapa 1)

| Elemento | Cantidad |
|---|---|
| Skills | 4 |
| Rutinas | 2 |
| Conectores | 3 (GitHub, Origin y X solo en borradores) |
| Memorias | 9 hechos de memoria |
| Tareas abiertas | 5 |

## Traspaso (etapa 2)

- Tamaño de `TRASPASO.md` (líneas): 76
- Qué corregiste al revisarlo: el propio bot antiguo lo repasó antes de crear el nuevo. Los secretos (tokens y credenciales) solo se nombran, sin valor, y el nombre real del dueño no sale en nada público: en lo público firma como Ana Gui.

## Bot nuevo y checklist (etapas 3 y 4)

- ¿Pasó la checklist a la primera? Sí.
- Qué faltaba y cómo se resolvió: antes de esta migración, el Migrator a veces pedía al dueño que cargara la skill. Se cambió para que la cargue solo (commit `a1b3e49`) y se actualizaron las skills (`112a85b` y `693c876`), ya en la plantilla v15.
- Rutinas reactivadas: 2 («Consejo semanal X» y «Recordatorio cancelar X Premium»). Se crearon en pausa en el bot nuevo y se activaron solo tras el OK del dueño, después de pausar las del bot antiguo.

## Resultado

- Cómo responde el bot nuevo comparado con el antiguo (tu impresión): retoma donde lo dejaste: el bot nuevo empezó con las tareas abiertas, las reglas de trabajo y las rutinas ya en su sitio. Su primera tarea fue precisamente rellenar este ejemplo.
- Tiempo total aproximado: no anotado (se hizo de madrugada, en una sola sesión).
- ¿Volviste al bot antiguo? No; se queda con sus rutinas en pausa por si hace falta consultarlo.
- Cita corta (opcional, con permiso): pendiente (firmará Ana Gui).

---

## Cómo hacer la migración real

1. Elige un bot tuyo en amarillo o rojo (pregúntale «¿qué color estamos?»).
2. Abre Context Bot Migrator (https://x.ai/bot/oUJEAr2axANgtedIGrkNS) y dile qué bot quieres migrar.
3. Pega en el bot antiguo la línea de la etapa 1 que te dé el Migrator y copia de vuelta los recuentos.
4. Revisa el `TRASPASO.md` antes de seguir; quita lo que no quieras pasar.
5. Di que sí para crear el bot nuevo y deja que pase la checklist con las rutinas en pausa.
6. Usa el bot nuevo un par de días y apunta tus impresiones.
7. Pásanos: los recuentos del inventario, la longitud del traspaso, si pasó la checklist, qué faltó y tu impresión. Sin datos privados.
