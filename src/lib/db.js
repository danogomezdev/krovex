import { supabase } from './supabase'

// ── PROJECTS ──────────────────────────────────────────────
export const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (error) throw error; return data
}
export const createProject = async (p) => {
  const { data, error } = await supabase.from('projects').insert([p]).select().single()
  if (error) throw error; return data
}
export const updateProject = async (id, p) => {
  const { data, error } = await supabase.from('projects').update(p).eq('id', id).select().single()
  if (error) throw error; return data
}
export const deleteProject = async (id) => {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

// ── SERVICES ──────────────────────────────────────────────
export const getServices = async () => {
  const { data, error } = await supabase.from('services').select('*').order('order_index')
  if (error) throw error; return data
}
export const createService = async (s) => {
  const { data, error } = await supabase.from('services').insert([s]).select().single()
  if (error) throw error; return data
}
export const updateService = async (id, s) => {
  const { data, error } = await supabase.from('services').update(s).eq('id', id).select().single()
  if (error) throw error; return data
}
export const deleteService = async (id) => {
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
}

// ── CLIENTS ───────────────────────────────────────────────
export const getClients = async () => {
  const { data, error } = await supabase
    .from('clients')
    .select('*, client_notes(id,content,created_at)')
    .order('created_at', { ascending: false })
  if (error) throw error; return data
}
export const getClient = async (id) => {
  const { data, error } = await supabase
    .from('clients')
    .select('*, client_notes(id,content,created_at)')
    .eq('id', id)
    .single()
  if (error) throw error; return data
}
export const createClient = async (c) => {
  const { data, error } = await supabase.from('clients').insert([c]).select().single()
  if (error) throw error; return data
}
export const updateClient = async (id, c) => {
  const { data, error } = await supabase.from('clients').update(c).eq('id', id).select().single()
  if (error) throw error; return data
}
export const deleteClient = async (id) => {
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) throw error
}

// ── CLIENT NOTES ──────────────────────────────────────────
export const addNote = async (clientId, content) => {
  const { data, error } = await supabase
    .from('client_notes')
    .insert([{ client_id: clientId, content }])
    .select().single()
  if (error) throw error; return data
}
export const deleteNote = async (id) => {
  const { error } = await supabase.from('client_notes').delete().eq('id', id)
  if (error) throw error
}

// ── CLIENTS DUE SOON (vencen en X días) ───────────────────
export const getClientsDueSoon = async (days = 3) => {
  const future = new Date()
  future.setDate(future.getDate() + days)
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('payment_status', 'active')
    .eq('has_maintenance', true)
    .lte('payment_due_date', future.toISOString().split('T')[0])
    .gte('payment_due_date', new Date().toISOString().split('T')[0])
  if (error) throw error; return data
}
export const getClientsOverdue = async () => {
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('has_maintenance', true)
    .neq('payment_status', 'suspended')
    .lt('payment_due_date', today)
  if (error) throw error; return data
}

// ── SITE CONFIG ───────────────────────────────────────────
export const getSiteConfig = async () => {
  const { data, error } = await supabase.from('site_config').select('*')
  if (error) throw error
  return (data || []).reduce((acc, r) => ({ ...acc, [r.key]: r.value }), {})
}
export const updateSiteConfig = async (configs) => {
  const rows = Object.entries(configs).map(([key, value]) => ({ key, value }))
  const { error } = await supabase.from('site_config').upsert(rows, { onConflict: 'key' })
  if (error) throw error
}
