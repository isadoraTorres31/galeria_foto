// Serviço de persistência local das fotos da galeria (por usuário logado).

import { usuarioAtual } from "@/services/auth";

export interface Foto {
  id: string;
  src: string;
}

function chaveFotos(): string {
  const usuario = usuarioAtual();
  return `galeria_foto_fotos_${usuario?.email ?? "anonimo"}`;
}

export function obterFotos(): Foto[] {
  const dados = localStorage.getItem(chaveFotos());
  return dados ? JSON.parse(dados) : [];
}

export function adicionarFoto(src: string): Foto[] {
  const fotos = obterFotos();
  const novaFoto: Foto = { id: Date.now().toString(), src };
  fotos.unshift(novaFoto);
  localStorage.setItem(chaveFotos(), JSON.stringify(fotos));
  return fotos;
}

export function removerFoto(id: string): Foto[] {
  const fotos = obterFotos().filter((f) => f.id !== id);
  localStorage.setItem(chaveFotos(), JSON.stringify(fotos));
  return fotos;
}