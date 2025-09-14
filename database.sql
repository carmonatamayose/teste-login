-- SQL para criar a tabela user_credentials no Supabase
-- Execute este código no editor SQL do seu projeto Supabase

-- Criar a tabela user_credentials
CREATE TABLE IF NOT EXISTS public.user_credentials (
  id BIGSERIAL PRIMARY KEY,
  usuario TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar políticas de segurança (Row Level Security)
ALTER TABLE public.user_credentials ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções (cadastro)
CREATE POLICY "Permitir inserção de credenciais" ON public.user_credentials
  FOR INSERT WITH CHECK (true);

-- Política para permitir leitura (login)
CREATE POLICY "Permitir leitura de credenciais" ON public.user_credentials
  FOR SELECT USING (true);

-- Opcional: Política para permitir atualizações (se necessário)
CREATE POLICY "Permitir atualização de credenciais" ON public.user_credentials
  FOR UPDATE USING (true);

-- Comentários para documentação
COMMENT ON TABLE public.user_credentials IS 'Tabela para armazenar credenciais de usuários';
COMMENT ON COLUMN public.user_credentials.usuario IS 'Nome de usuário único';
COMMENT ON COLUMN public.user_credentials.senha IS 'Senha do usuário (texto simples)';
COMMENT ON COLUMN public.user_credentials.timestamp IS 'Data e hora de criação/atualização';