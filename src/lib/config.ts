// Public Supabase config used on the frontend (GitHub Pages has no env vars)
// Safe to expose the anon key on the client when using proper RLS in Supabase

export const PUBLIC_SUPABASE_URL = ""; // opcional: cole aqui a URL do seu projeto
export const PUBLIC_SUPABASE_ANON_KEY = ""; // opcional: cole aqui a anon key do seu projeto

export const loadSupabaseConfig = () => {
  const url = (localStorage.getItem("supabaseUrl") || PUBLIC_SUPABASE_URL || "").trim();
  const anonKey = (localStorage.getItem("supabaseAnonKey") || PUBLIC_SUPABASE_ANON_KEY || "").trim();
  return { url, anonKey };
};