# Next steps · Siguientes pasos

Actualizado: 11 de noviembre de 2026. Este documento distingue cambios de código de validación del producto y publicación externa.

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
5. **Hosting:** la web se publica con Wrangler en Cloudflare Pages, proyecto `context-bot`, destino `context-bot-cfv.pages.dev`. El identificador de cuenta solo está en el workflow `Publicar web` y no se repite aquí. `main` activa ese workflow; el worker se despliega por separado. La antigua cuenta/destino `context-bot-dkp.pages.dev` no debe reutilizarse. Esta revisión no modifica DNS ni publica. Tras la futura integración, comprobar ejecución, `https://contextbot.app/` y el contenido servido.
6. **Revisión del plan:** ver [selección, evidencias y pendientes](docs/revision-plan-2026-11.md). Las PRs están encadenadas 7 → 8 → 9 → 10 → 11, y encima va la revisión de la fase 8, sin fusionar. Antes de publicar falta una comprobación visual real, el render de la CSP y validar el conector con Grok. El worker de `delete_bot`, NFC y los límites de registro no está desplegado con esta rama.

English: repository changes do not republish hosted Grok templates or update already-installed skills. The migration narrative is not independent validation. The historical skill percentage table stays, with a note that those percentages orient the colour and are not a measurement. The Cloudflare account id stays in the Pages workflow only. Verify actual domain bytes and the deployment run separately; do not infer the hosting provider from headers alone.

## Comprobaciones reproducibles / Checks

```bash
CB_OFFLINE=1 bash scripts/build-site.sh
python3 tests/site-contract.py
python3 tests/security-headers.py
python3 worker/gen-tips.py --check
node --test tests/*.cjs
node --check src/js/dashboard.js
node --check src/js/live.js
git diff --check
```

Revisar `/`, `/es/`, `/dashboard/`, `/dashboard/?demo` y `/es/dashboard/?demo` en navegador. No editar ni versionar `dist/`.

## Deshacer / Rollback

Revertir el commit de squash de la PR, revisar y fusionar la reversión. Volver a comprobar la ejecución de publicación y el contenido del dominio. No borrar datos del panel ni cambiar DNS. La reversión de Git no revierte una plantilla o una rutina modificada separadamente en Grok.
