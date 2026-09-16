// Serviço de preferências do app (usa @capacitor/preferences, armazenamento
// nativo persistente, diferente do localStorage usado para dados da conta).

import { Preferences } from '@capacitor/preferences';

const CHAVE_TEMA = 'galeria_foto_tema';
const CLASSE_DARK = 'ion-palette-dark';

export async function estaModoEscuro(): Promise<boolean> {
  const { value } = await Preferences.get({ key: CHAVE_TEMA });
  return value === 'dark';
}

export async function definirTema(escuro: boolean): Promise<void> {
  document.documentElement.classList.toggle(CLASSE_DARK, escuro);
  await Preferences.set({
    key: CHAVE_TEMA,
    value: escuro ? 'dark' : 'light',
  });
}

export async function alternarTema(): Promise<boolean> {
  const atual = await estaModoEscuro();
  const novo = !atual;
  await definirTema(novo);
  return novo;
}

// Chamado uma vez, na inicialização do app, para aplicar o tema
// salvo antes da primeira tela ser exibida (evita "flash" de tema errado).
export async function aplicarTemaSalvo(): Promise<void> {
  const escuro = await estaModoEscuro();
  document.documentElement.classList.toggle(CLASSE_DARK, escuro);
}