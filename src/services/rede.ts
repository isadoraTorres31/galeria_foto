// Serviço de monitoramento de conexão com a internet.

import { Network } from '@capacitor/network';
import { ref } from 'vue';

export const online = ref(true);

let listenerRegistrado = false;

export async function iniciarMonitoramentoRede() {
  const status = await Network.getStatus();
  online.value = status.connected;

  if (!listenerRegistrado) {
    Network.addListener('networkStatusChange', (status) => {
      online.value = status.connected;
    });
    listenerRegistrado = true;
  }
}