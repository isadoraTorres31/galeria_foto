<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sobre</ion-title>
      </ion-toolbar>
    </ion-header>
    
      <ion-content class="ion-padding">
  <ion-item v-if="!online" color="danger" lines="none" class="aviso-offline">
    <ion-icon slot="start" :icon="cloudOfflineOutline" />
    <ion-label>Você está offline. Algumas informações podem não atualizar.</ion-label>
  </ion-item>

  <!-- resto do conteúdo que já existia (nome/versão, modo escuro, localização, termos) -->

      <ion-list>
        <ion-item lines="none">
          <ion-label>
            <h2>Galeria Foto</h2>
            <p>Versão {{ versao }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-item lines="none">
      <ion-icon slot="start" :icon="moonOutline" />
      <ion-label>Modo escuro</ion-label>
      <ion-toggle slot="end" :checked="modoEscuro" @ionChange="alternarModoEscuro" />
</ion-item>

      <ion-accordion-group>
        <ion-accordion value="termos">
          <ion-item slot="header">
            <ion-label>Termos de Uso</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding conteudo-termo">
            <p>
              Ao utilizar o aplicativo Galeria Foto, você concorda em usá-lo apenas
              para fins pessoais e educacionais. O aplicativo permite capturar fotos
              pela câmera do dispositivo ou selecioná-las da galeria, exibindo-as
              em uma coleção pessoal dentro do app.
            </p>
            <p>
              O usuário é responsável pelo conteúdo das fotos adicionadas. É proibido
              usar o aplicativo para armazenar ou exibir conteúdo ilegal, ofensivo
              ou que viole direitos de terceiros.
            </p>
            <p>
              Este é um projeto acadêmico, desenvolvido para fins de estudo, sem
              garantias de disponibilidade contínua ou suporte comercial.
            </p>
          </div>
        </ion-accordion>

        <ion-accordion value="privacidade">
          <ion-item slot="header">
            <ion-label>Termos de Privacidade</ion-label>
          </ion-item>
          <div slot="content" class="ion-padding conteudo-termo">
            <p>
              As fotos capturadas ou selecionadas pelo usuário são armazenadas
              apenas localmente, no próprio dispositivo, e não são enviadas a
              nenhum servidor externo ou compartilhadas com terceiros.
            </p>
            <p>
              Os dados de cadastro (nome, e-mail e senha) também são armazenados
              apenas localmente no dispositivo, exclusivamente para fins de
              autenticação dentro do aplicativo.
            </p>
            <p>
              O aplicativo solicita permissão de acesso à câmera e à galeria de
              fotos apenas quando o usuário opta por adicionar uma nova foto,
              podendo essa permissão ser revogada a qualquer momento nas
              configurações do dispositivo.
            </p>
          </div>

            <ion-list>
  <ion-list-header>
    <ion-label>Localização</ion-label>
    <ion-button fill="clear" size="small" @click="carregarLocalizacao">
      <ion-icon slot="icon-only" :icon="refresh" />
    </ion-button>
  </ion-list-header>

  <ion-item v-if="carregandoLocalizacao">
    <ion-label>Obtendo localização...</ion-label>
    <ion-spinner slot="end" name="dots" />
  </ion-item>

  <template v-else-if="localizacao">
    <ion-item lines="none">
      <ion-label>Latitude</ion-label>
      <ion-note slot="end">{{ localizacao.latitude.toFixed(6) }}</ion-note>
    </ion-item>
    <ion-item lines="none">
      <ion-label>Longitude</ion-label>
      <ion-note slot="end">{{ localizacao.longitude.toFixed(6) }}</ion-note>
    </ion-item>
    <ion-item lines="none">
      <ion-label>Altitude</ion-label>
      <ion-note slot="end">
        {{ localizacao.altitude !== null ? localizacao.altitude.toFixed(1) + ' m' : 'Indisponível' }}
      </ion-note>
    </ion-item>
  </template>

  <ion-item v-else lines="none">
    <ion-label color="medium">Localização não disponível.</ion-label>
  </ion-item>
</ion-list>

        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonToggle,
  IonSpinner,
  IonButton,
  IonAccordionGroup,
  IonAccordion,
  toastController,
} from "@ionic/vue";
import { moonOutline, refresh } from "ionicons/icons";
import { onMounted, ref } from "vue";
import packageJson from "../../package.json";
import { cloudOfflineOutline } from "ionicons/icons";
import { online } from "@/services/rede";
import { estaModoEscuro, alternarTema } from "@/services/preferencias";
import {
  verificarPermissaoLocalizacao,
  obterLocalizacaoAtual,
  Localizacao,
} from "@/services/geolocalizacao";

const versao = packageJson.version;
const modoEscuro = ref(false);

const localizacao = ref<Localizacao | null>(null);
const carregandoLocalizacao = ref(false);

onMounted(async () => {
  modoEscuro.value = await estaModoEscuro();
  await carregarLocalizacao();
});

async function alternarModoEscuro() {
  modoEscuro.value = await alternarTema();
}

async function mostrarToast(message: string) {
  const toast = await toastController.create({
    message,
    duration: 2500,
    color: "danger",
    position: "bottom",
  });
  await toast.present();
}

async function carregarLocalizacao() {
  carregandoLocalizacao.value = true;
  try {
    const permitido = await verificarPermissaoLocalizacao();
    if (!permitido) {
      await mostrarToast("Permissão de localização negada.");
      localizacao.value = null;
      return;
    }

    localizacao.value = await obterLocalizacaoAtual();
  } catch (err) {
    await mostrarToast("Não foi possível obter a localização.");
    localizacao.value = null;
  } finally {
    carregandoLocalizacao.value = false;
  }
}
</script>

<style scoped>
.conteudo-termo p {
  margin-bottom: 12px;
  color: var(--ion-color-medium-shade);
  line-height: 1.5;
}

.aviso-offline {
  margin-bottom: 12px;
  border-radius: 8px;
}
</style>