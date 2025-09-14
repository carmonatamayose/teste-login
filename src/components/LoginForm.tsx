import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSupabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [cfgUrl, setCfgUrl] = useState('')
  const [cfgKey, setCfgKey] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    setCfgUrl(localStorage.getItem('supabaseUrl') || '')
    setCfgKey(localStorage.getItem('supabaseAnonKey') || '')
  }, [])

  const handleSaveConfig = () => {
    localStorage.setItem('supabaseUrl', cfgUrl.trim())
    localStorage.setItem('supabaseAnonKey', cfgKey.trim())
    try {
      // valida imediatamente
      getSupabase()
      toast({ title: 'Configurações salvas', description: 'Supabase configurado com sucesso.' })
      setShowConfig(false)
    } catch (e: any) {
      toast({ title: 'Erro ao configurar', description: e.message, variant: 'destructive' })
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = getSupabase()
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo de volta!'
        })
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password
        })
        if (error) throw error
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Verifique seu email para confirmar a conta.'
        })
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao autenticar. Verifique a configuração do Supabase.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="size-16 rounded-full mx-auto flex items-center justify-center shadow" aria-hidden>
            <svg className="size-8 text-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Entrar na conta' : 'Criar conta'}
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Entre com suas credenciais' : 'Crie sua nova conta'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Nome de usuário ou Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar conta')}
            </Button>
          </form>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              {isLogin ? 'Não tem uma conta? Criar' : 'Já tem uma conta? Entrar'}
            </button>
            <button
              type="button"
              onClick={() => setShowConfig((s) => !s)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {showConfig ? 'Fechar configurações' : 'Configurar Supabase'}
            </button>
          </div>

          {showConfig && (
            <div className="space-y-3 rounded-md border p-3">
              <div className="space-y-1">
                <Label htmlFor="cfgUrl">Supabase URL</Label>
                <Input id="cfgUrl" value={cfgUrl} onChange={(e) => setCfgUrl(e.target.value)} placeholder="https://xxxxx.supabase.co" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cfgKey">Supabase anon key</Label>
                <Input id="cfgKey" value={cfgKey} onChange={(e) => setCfgKey(e.target.value)} placeholder="eyJhbGci..." />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={() => setShowConfig(false)}>Cancelar</Button>
                <Button type="button" onClick={handleSaveConfig}>Salvar configurações</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Dica: Você pode embutir esses valores no código depois para publicar no GitHub Pages.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
