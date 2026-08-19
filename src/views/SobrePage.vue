<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sobre</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item lines="none">
          <ion-label>
            <h2>Galeria Foto</h2>
            <p>Versão {{ versao }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

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
  IonItem,
  IonLabel,
  IonAccordionGroup,
  IonAccordion,
} from "@ionic/vue";
import packageJson from "../../package.json";

const versao = packageJson.version;
</script>

<style scoped>
.conteudo-termo p {
  margin-bottom: 12px;
  color: var(--ion-color-medium-shade);
  line-height: 1.5;
}
</style>