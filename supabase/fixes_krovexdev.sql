-- ============================================================
-- KROVEX.DEV — SQL Fixes
-- Ejecutar en Supabase SQL Editor del proyecto krovex.dev
-- ============================================================

-- FIX 1: Agregar columna notes a clients (si no existe)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS notes TEXT;

-- FIX 2: Excluir client_notes del payload en create/update
-- Este fix es en el código (db.js), no en SQL

-- FIX 3: Verificar estructura mínima de tablas
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name IN ('clients', 'client_notes', 'projects', 'services', 'site_config');
