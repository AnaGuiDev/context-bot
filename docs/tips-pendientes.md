# Trucos pendientes de verificar

Ideas que suenan razonables pero que **no** hemos podido respaldar con una fuente oficial. Por eso no aparecen en la landing. Si encuentras documentación que las confirme (o las desmienta), abre un issue con el enlace.

| Idea | Por qué está pendiente |
|---|---|
| Usar reacciones en vez de responder | No hay documentación sobre si una reacción dentro de la app inicia un turno. Ojo: en Slack, una rutina **sí** puede dispararse con una reacción ([Routines](https://cursor.com/help/grok-bot/routines)). |
| Rutinas que se quedan calladas si no hay novedades | Callarse no evita el gasto: la ejecución ya ha gastado uso al comprobar ([Routines](https://cursor.com/help/grok-bot/routines)). Puede reducir mensajes, pero no hemos visto que ahorre uso. |
| Pausar bots que no usas | No hemos encontrado documentación de que un bot parado gaste por sí solo; lo que gasta son sus rutinas (truco 3). No existe un «pausar bot» documentado. |
| Usar conectores en vez de que el bot maneje el navegador | Lo comenta un usuario en el [foro](https://forum.cursor.com/t/best-practices-for-using-grok-bot-more-token-efficiently/175188), sin confirmación oficial. |
| Agrupar rutinas pequeñas en una diaria y otra semanal | Lo propone un usuario en el [foro](https://forum.cursor.com/t/best-practices-for-using-grok-bot-more-token-efficiently/175188). Encaja con «cada ejecución gasta», pero no está documentado como recomendación. |
