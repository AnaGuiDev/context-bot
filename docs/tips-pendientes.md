# Trucos pendientes de verificar

Ideas que suenan razonables pero que **no** hemos podido respaldar con una fuente oficial. Por eso no aparecen en la landing. Si encuentras documentación que las confirme (o las desmienta), abre un issue con el enlace.

| Idea | Por qué está pendiente |
|---|---|
| Usar reacciones en vez de responder | No hay documentación sobre si una reacción dentro de la app inicia un turno. Ojo: en Slack, una rutina **sí** puede dispararse con una reacción ([Routines](https://cursor.com/help/grok-bot/routines)). |
| Rutinas que se quedan calladas si no hay novedades | Callarse no evita el gasto: la ejecución ya ha gastado uso al comprobar ([Routines](https://cursor.com/help/grok-bot/routines)). Puede reducir mensajes, pero no hemos visto que ahorre uso. |
| Pausar bots que no usas | No hemos encontrado documentación de que un bot parado gaste por sí solo; lo que gasta son sus rutinas (truco 3). No existe un «pausar bot» documentado. |
| Usar conectores en vez de que el bot maneje el navegador | Lo comenta un usuario en el [foro](https://forum.cursor.com/t/best-practices-for-using-grok-bot-more-token-efficiently/175188), sin confirmación oficial. |
| Agrupar rutinas pequeñas en una diaria y otra semanal | Lo propone un usuario en el [foro](https://forum.cursor.com/t/best-practices-for-using-grok-bot-more-token-efficiently/175188). Encaja con «cada ejecución gasta», pero no está documentado como recomendación. |

## Pide que las rutinas usen scripts cuando se pueda

**Idea:** que la rutina ejecute un script o comando para comprobar algo y solo use la IA cuando haya algo que contar.

**Por qué está pendiente:** no hay respaldo en la documentación oficial ni en respuestas del equipo de Cursor (revisado el 3 de noviembre de 2026). La [página de rutinas](https://cursor.com/help/grok-bot/routines) solo dice que cada ejecución gasta uso, y no describe ninguna forma de que una rutina ejecute código sin el modelo. Las guías no oficiales que lo recomiendan ([ejemplo](https://teapawt.net/GrokBotRadar/article/2105065358038360334)) avisan de que el bot sigue gastando al decidir ejecutar el script y leer su salida, y que el ahorro no está medido. Las cifras de ahorro que circulan no tienen fuente comprobable.

**Lo que sí se puede decir:** el ahorro posible viene de que el bot lea una salida corta en lugar de mucho material. Pero no está confirmado oficialmente.
