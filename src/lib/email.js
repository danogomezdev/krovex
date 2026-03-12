import emailjs from 'emailjs-com'

const SVC  = () => import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
const KEY  = () => import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'
const TPL  = {
  contact:  () => import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT  || 'template_contact',
  warning:  () => import.meta.env.VITE_EMAILJS_TEMPLATE_WARNING  || 'template_warning',
  overdue:  () => import.meta.env.VITE_EMAILJS_TEMPLATE_OVERDUE  || 'template_overdue',
  suspend:  () => import.meta.env.VITE_EMAILJS_TEMPLATE_SUSPEND  || 'template_suspend',
}

// Formulario de contacto del sitio
export const sendContactEmail = (form) =>
  emailjs.send(SVC(), TPL.contact(), {
    from_name:  form.name,
    from_email: form.email,
    service:    form.service,
    message:    form.message,
  }, KEY())

// Aviso 3 días antes del vencimiento
export const sendPaymentWarning = (client) =>
  emailjs.send(SVC(), TPL.warning(), {
    client_name:    client.name,
    client_email:   client.email,
    site_url:       client.site_url,
    due_date:       client.payment_due_date,
    amount:         client.maintenance_price,
    currency:       client.currency || 'ARS',
  }, KEY())

// Pago vencido
export const sendOverdueNotice = (client) =>
  emailjs.send(SVC(), TPL.overdue(), {
    client_name:    client.name,
    client_email:   client.email,
    site_url:       client.site_url,
    due_date:       client.payment_due_date,
    amount:         client.maintenance_price,
    currency:       client.currency || 'ARS',
  }, KEY())

// Suspensión del sitio
export const sendSuspensionNotice = (client) =>
  emailjs.send(SVC(), TPL.suspend(), {
    client_name:    client.name,
    client_email:   client.email,
    site_url:       client.site_url,
    amount:         client.maintenance_price,
    currency:       client.currency || 'ARS',
  }, KEY())
