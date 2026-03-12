# Krovex v2 — CRM + Portfolio

## Instalación rápida

```bash
npm install
cp .env.example .env   # completar con tus claves
npm run dev            # http://localhost:5173
```

---

## 1. Configurar Supabase

1. Crear cuenta en [supabase.com](https://supabase.com) (gratis)
2. Crear nuevo proyecto
3. **SQL Editor → New query** → pegar `supabase_setup.sql` y ejecutar
4. **Settings → API** → copiar Project URL y anon key al `.env`
5. **Authentication → Users → Add user** → crear tu usuario admin

---

## 2. Configurar EmailJS

Registrate en [emailjs.com](https://emailjs.com) — plan gratuito: 200 emails/mes.

### Crear 4 templates

**Template 1: `template_contact` — Formulario del sitio**
```
Asunto: Nuevo mensaje de {{from_name}}
Cuerpo:
Nombre: {{from_name}}
Email: {{from_email}}
Servicio: {{service}}
Mensaje: {{message}}
```

**Template 2: `template_warning` — Aviso 3 días antes**
```
Para: {{client_email}}
Asunto: Recordatorio de pago — Krovex

Hola {{client_name}},

Te recordamos que el mantenimiento de tu sitio ({{site_url}})
vence el {{due_date}}.

Monto: {{currency}} {{amount}}

Por favor regularizá el pago para evitar interrupciones en el servicio.

Saludos,
Krovex
```

**Template 3: `template_overdue` — Pago vencido**
```
Para: {{client_email}}
Asunto: ⚠️ Pago vencido — tu sitio puede suspenderse

Hola {{client_name}},

Tu pago de mantenimiento venció el {{due_date}}.

Si no regularizás el pago en los próximos días,
tu sitio {{site_url}} será suspendido.

Monto pendiente: {{currency}} {{amount}}

Contactanos para coordinar el pago.

Krovex
```

**Template 4: `template_suspend` — Suspensión**
```
Para: {{client_email}}
Asunto: 🔴 Tu sitio ha sido suspendido — Krovex

Hola {{client_name}},

Debido a la falta de pago del mantenimiento,
tu sitio {{site_url}} ha sido suspendido.

Monto pendiente: {{currency}} {{amount}}

Para reactivar tu sitio, contactanos a la brevedad.

Krovex
```

### Variables disponibles en todos los templates:
- `{{client_name}}` — nombre del cliente
- `{{client_email}}` — email del cliente
- `{{site_url}}` — URL del sitio
- `{{due_date}}` — fecha de vencimiento
- `{{amount}}` — precio del mantenimiento
- `{{currency}}` — moneda (ARS/USD/EUR)

---

## 3. Variables de entorno (.env)

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key

VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_EMAILJS_TEMPLATE_CONTACT=template_contact
VITE_EMAILJS_TEMPLATE_WARNING=template_warning
VITE_EMAILJS_TEMPLATE_OVERDUE=template_overdue
VITE_EMAILJS_TEMPLATE_SUSPEND=template_suspend
```

---

## Panel Admin — /admin

| Sección | Qué podés hacer |
|---------|----------------|
| **Dashboard** | Resumen, alertas de pagos vencidos y próximos |
| **Clientes** | CRUD completo, suspender/reactivar, enviar emails, notas internas |
| **Portfolio** | Proyectos del sitio público |
| **Servicios** | Precios y características |
| **Configuración** | Textos del sitio y claves EmailJS |

### Flujo de cobro de mantenimiento

1. Agregás un cliente con mantenimiento activado y fecha de vencimiento
2. El dashboard te avisa automáticamente cuando quedan 3 días o ya venció
3. Desde el detalle del cliente podés:
   - Enviar aviso 3 días antes (automático o manual)
   - Enviar aviso de pago vencido
   - **Suspender el sitio** → se envía email automático al cliente
   - **Reactivar** cuando pague

### Cómo suspender un sitio realmente

El "bloqueo" funciona así:
- Marcás el cliente como suspendido en Krovex
- El sistema envía el email al cliente
- **Vos vas a Vercel** (donde hosteaste el sitio) y lo pausás/eliminás

Cuando el cliente pague:
- Reactivás en Krovex
- Reactivás en Vercel

> 💡 **Consejo para el futuro**: Siempre hostear los sitios de clientes en
> tu cuenta de Vercel, en proyectos separados. Así tenés control total.

---

## Build / Deploy

```bash
npm run build   # genera /dist
```

Deploy gratuito en [Vercel](https://vercel.com) — conectás tu repo y listo.
