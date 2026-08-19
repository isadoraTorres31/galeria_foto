export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

const CHAVE_USUARIOS = "galeria_foto_usuarios";
const CHAVE_SESSAO = "galeria_foto_sessao";

function obterUsuarios(): Usuario[] {
  const dados = localStorage.getItem(CHAVE_USUARIOS);
  return dados ? JSON.parse(dados) : [];
}

function salvarUsuarios(usuarios: Usuario[]) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

export function cadastrar(usuario: Usuario): { ok: boolean; erro?: string } {
  const usuarios = obterUsuarios();

  if (usuarios.some((u) => u.email === usuario.email)) {
    return { ok: false, erro: "Já existe uma conta com este e-mail." };
  }

  usuarios.push(usuario);
  salvarUsuarios(usuarios);
  return { ok: true };
}

export function login(email: string, senha: string): { ok: boolean; erro?: string } {
  const usuarios = obterUsuarios();
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

  if (!usuario) {
    return { ok: false, erro: "E-mail ou senha inválidos." };
  }

  localStorage.setItem(CHAVE_SESSAO, JSON.stringify({ nome: usuario.nome, email: usuario.email }));
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(CHAVE_SESSAO);
}

export function estaAutenticado(): boolean {
  return localStorage.getItem(CHAVE_SESSAO) !== null;
}

export function usuarioAtual(): { nome: string; email: string } | null {
  const dados = localStorage.getItem(CHAVE_SESSAO);
  return dados ? JSON.parse(dados) : null;
}