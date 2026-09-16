// Serviço de geolocalização (latitude, longitude e altitude).

import { Geolocation } from '@capacitor/geolocation';

export interface Localizacao {
  latitude: number;
  longitude: number;
  altitude: number | null;
}

export async function verificarPermissaoLocalizacao(): Promise<boolean> {
  const status = await Geolocation.checkPermissions();

  if (status.location !== 'granted' && status.coarseLocation !== 'granted') {
    const resultado = await Geolocation.requestPermissions();
    return resultado.location === 'granted' || resultado.coarseLocation === 'granted';
  }

  return true;
}

export async function obterLocalizacaoAtual(): Promise<Localizacao> {
  const posicao = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 10000,
  });

  return {
    latitude: posicao.coords.latitude,
    longitude: posicao.coords.longitude,
    altitude: posicao.coords.altitude,
  };
}