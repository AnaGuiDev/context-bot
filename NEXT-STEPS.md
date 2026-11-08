# Next steps · Siguientes pasos

Actualizado: 8 de noviembre de 2026. Este documento distingue cambios de código de validación del producto y publicación externa.

## Preparado en el repositorio / Prepared in the repository

- Web y panel bilingües; instalación en el bot existente como recorrido principal, demo visible y herramientas opcionales plegadas.
- Skill ES y EN con informes recurrentes en una Page, solo tras confirmación. La rutina actualiza los datos; la Page no los obtiene sola.
- Descripciones públicas en [template-descriptions.md](docs/template-descriptions.md), separadas de instrucciones internas. Cambiar el repositorio no actualiza la plantilla de Grok.
- Demo aislada del almacenamiento local; pruebas en `tests/` y comprobaciones antes de publicar.
- Privacidad diferenciada entre modo local y conector opcional. Conector aún etiquetado «En pruebas».

## Pendientes reales / Remaining external work

1. **Plantillas en Grok:** aplicar la descripción pública y actualizar las skills instaladas, volver a publicar e inspeccionar la ficha externa. No se ha efectuado desde este cambio de repositorio.
2. **Validación:** existe un [relato de migración del 5 de noviembre](docs/ejemplo-migracion.md), con datos que el propio relato marca como no comprobables desde fuera. Es experiencia documentada, no validación independiente ni una nueva ejecución en esta entrega. Verificar una migración completa y el ciclo Page → rutina → actualización → aviso de éxito/fallo → descarga con fuentes autorizadas antes de acreditar esos recorridos.
3. **Tracción:** ejecutar el [experimento de activación](docs/activation-experiment.md). No hay nuevas métricas ni entrevistas atribuidas a esta entrega.
4. **Estimación de contexto:** la portada ya no equipara mensajes y porcentajes. Por la petición de conservar el resto de ambas skills, su tabla histórica de porcentajes permanece intacta; no está calibrada y no debe interpretarse como medición. Revisar esa tabla en un cambio separado si se autoriza modificar el comportamiento existente.
5. **Hosting:** el workflow `Publicar web` existe, pero su ejecución anterior al cambio (42256217040) falló en `configure-pages`: GitHub no encontraba un sitio Pages habilitado. Las cabeceras del dominio muestran infraestructura Cloudflare, sin demostrar por sí solas qué servicio lo publica. Comprobar el workflow del commit fusionado y comparar la skill servida con la fuente antes de declarar despliegue completado. No cambiar DNS para resolver esta discrepancia.

English: repository changes do not republish hosted Grok templates or update already-installed skills. The migration narrative is not independent validation. The historical skill percentage table is preserved at the user's request, not calibrated. Verify actual domain bytes and the deployment run separately; do not infer the hosting provider from headers alone.

## Comprobaciones reproducibles / Checks

```bash
CB_OFFLINE=1 bash scripts/build-site.sh
python3 tests/site-contract.py
node --test tests/dashboard-demo.cjs
node --check src/js/dashboard.js
node --check src/js/live.js
git diff --check
```

Revisar `/`, `/es/`, `/dashboard/`, `/dashboard/?demo` y `/es/dashboard/?demo` en navegador. No editar ni versionar `dist/`.

## Deshacer / Rollback

Revertir el commit de squash de la PR, revisar y fusionar la reversión. Volver a comprobar la ejecución de publicación y el contenido del dominio. No borrar datos del panel ni cambiar DNS. La reversión de Git no revierte una plantilla o una rutina modificada separadamente en Grok.
