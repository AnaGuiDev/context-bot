# Seguridad

## Versiones con soporte

| Versión | Soporte |
|---|---|
| 0.2.x | ✅ |
| 0.1.x | ❌ |

## Cómo avisar de un fallo

Si encuentras un problema de seguridad (por ejemplo, algo en el panel que pudiera ejecutar código de un `STATUS.md` pegado, o una forma de que el archivo de traspaso filtre datos), **no abras un issue público**.

Usa el aviso privado de GitHub: pestaña **Security** del repositorio → **Report a vulnerability**.

Intentaré responder en unos días. Cuando esté arreglado, lo apuntaré en el `CHANGELOG.md` y, si quieres, te daré las gracias por tu nombre.

## Qué datos maneja el proyecto

- **La web y el panel** no usan cookies ni seguimiento. El panel guarda los datos solo en `localStorage`, en tu navegador.
- **Los archivos `STATUS.md` y `TRASPASO.md`** los escribe tu bot. Nunca deben llevar contraseñas, claves, tokens ni datos de tarjeta. Revísalos antes de compartirlos.
