import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { loadSupabaseConfig } from './config'

let client: SupabaseClient | null = null

export const getSupabase = (): SupabaseClient => {
  if (client) return client
  const { url, anonKey } = loadSupabaseConfig()
  if (!url || !anonKey) {
    throw new Error('Supabase não configurado. Informe URL e anon key nas configurações.')
  }
  client = createClient(url, anonKey)
  return client
}
