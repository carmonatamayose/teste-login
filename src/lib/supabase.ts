import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Função para criar a tabela de credenciais se não existir
export const initializeDatabase = async () => {
  try {
    // Criar tabela user_credentials se não existir
    const { error } = await supabase.rpc('create_user_credentials_table')
    if (error && !error.message.includes('already exists')) {
      console.error('Erro ao criar tabela:', error)
    }
  } catch (error) {
    console.error('Erro na inicialização do banco:', error)
  }
}
