import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export const LoginForm = () => {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Função para salvar credenciais na tabela user_credentials
  const salvarCredenciais = async (usuario: string, senha: string) => {
    try {
      const { data, error } = await supabase
        .from('user_credentials')
        .insert([
          {
            usuario: usuario,
            senha: senha,
            timestamp: new Date().toISOString()
          }
        ])
        .select()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro ao salvar credenciais:', error)
      throw error
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        // Verificar credenciais na tabela user_credentials
        const { data, error } = await supabase
          .from('user_credentials')
          .select('*')
          .eq('usuario', usuario)
          .eq('senha', senha)
          .single()

        if (error || !data) {
          throw new Error('Usuário ou senha inválidos')
        }

        toast({
          title: 'Login realizado com sucesso!',
          description: `Bem-vindo de volta, ${usuario}!`
        })
      } else {
        // Salvar novas credenciais
        await salvarCredenciais(usuario, senha)
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Suas credenciais foram salvas.'
        })
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Entrar na conta' : 'Criar conta'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isLogin ? 'Entre com suas credenciais' : 'Crie sua nova conta'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Nome de usuário</Label>
              <Input
                id="usuario"
                type="text"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar conta')}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
            >
              {isLogin ? 'Não tem uma conta? Criar conta' : 'Já tem uma conta? Entrar'}
            </button>
            
            {isLogin && (
              <div className="text-xs text-gray-500">
                Esqueceu sua senha? 
                <button className="text-blue-600 hover:underline ml-1">
                  Recuperar senha
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
