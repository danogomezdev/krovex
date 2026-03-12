-- ============================================================
-- KROVEX v2 — Script SQL para Supabase
-- Ir a: Supabase → SQL Editor → New query → pegar y ejecutar
-- ============================================================

-- 1. PROYECTOS (portfolio público)
CREATE TABLE IF NOT EXISTS projects (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  category         TEXT NOT NULL DEFAULT 'Otro',
  description      TEXT,
  long_description TEXT,
  tech             TEXT[] DEFAULT '{}',
  image_url        TEXT,
  url              TEXT,
  github_url       TEXT,
  featured         BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICIOS (con precios)
CREATE TABLE IF NOT EXISTS services (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon         TEXT DEFAULT 'Globe',
  name         TEXT NOT NULL,
  description  TEXT,
  price_from   NUMERIC,
  price_to     NUMERIC,
  currency     TEXT DEFAULT 'ARS',
  features     TEXT[] DEFAULT '{}',
  highlighted  BOOLEAN DEFAULT false,
  order_index  INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CLIENTES (CRM)
CREATE TABLE IF NOT EXISTS clients (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Datos personales
  name               TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT,
  company            TEXT,
  -- Proyecto
  site_url           TEXT,
  -- Mantenimiento
  has_maintenance    BOOLEAN DEFAULT false,
  maintenance_price  NUMERIC,
  currency           TEXT DEFAULT 'ARS',
  -- Estado y pagos
  payment_due_date   DATE,
  payment_status     TEXT DEFAULT 'development',
  -- Timestamps
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- 4. NOTAS INTERNAS de clientes
CREATE TABLE IF NOT EXISTS client_notes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CONFIGURACIÓN DEL SITIO (key-value)
CREATE TABLE IF NOT EXISTS site_config (
  key   TEXT PRIMARY KEY,
  value TEXT
);

-- ── Row Level Security ────────────────────────────────────
ALTER TABLE projects     ENABLE ROW LEVEL SECURITY;
ALTER TABLE services     ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients      ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config  ENABLE ROW LEVEL SECURITY;

-- Lectura pública (proyectos, servicios, config)
CREATE POLICY "public_read_projects"    ON projects    FOR SELECT USING (true);
CREATE POLICY "public_read_services"    ON services    FOR SELECT USING (true);
CREATE POLICY "public_read_site_config" ON site_config FOR SELECT USING (true);

-- Escritura solo autenticados
CREATE POLICY "auth_all_projects"     ON projects     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_services"     ON services     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_clients"      ON clients      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_notes"        ON client_notes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_site_config"  ON site_config  FOR ALL USING (auth.role() = 'authenticated');

-- Trigger para updated_at en clients
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Datos iniciales ───────────────────────────────────────
INSERT INTO site_config (key, value) VALUES
  ('hero_subtitle',       'Soluciones digitales profesionales que impulsan tu negocio.'),
  ('contact_email',       'hello@krovex.dev'),
  ('contact_phone',       '+54 9 XXX XXX XXXX'),
  ('contact_location',    'Argentina'),
  ('social_github',       '#'),
  ('social_linkedin',     '#'),
  ('social_instagram',    '#'),
  ('stats_projects',      '50+'),
  ('stats_satisfaction',  '100%'),
  ('stats_support',       '24/7')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- USUARIO ADMIN
-- Ir a: Supabase → Authentication → Users → Add user
-- Email:    admin@krovex.dev  (o el que quieras)
-- Password: (elegís vos, mínimo 8 caracteres)
-- ============================================================

-- ============================================================
-- PAYMENT_STATUS VÁLIDOS:
--   development → en desarrollo
--   delivered   → entregado (sin mantenimiento)
--   active      → activo y al día
--   overdue     → pago vencido
--   suspended   → sitio suspendido
-- ============================================================
