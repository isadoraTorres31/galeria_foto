<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Entrar</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-input
            label="E-mail"
            label-placement="floating"
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            @keyup.enter="entrar"
          />
        </ion-item>

        <ion-item>
          <ion-input
            label="Senha"
            label-placement="floating"
            v-model="senha"
            type="password"
            placeholder="Sua senha"
            @keyup.enter="entrar"
          />
        </ion-item>
      </ion-list>

      <ion-button expand="block" class="ion-margin-top" @click="entrar">
        Entrar
      </ion-button>

      <ion-button expand="block" fill="clear" router-link="/cadastro">
        Criar uma conta
      </ion-button>
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
  IonInput,
  IonButton,
  toastController,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/services/auth";

const router = useRouter();

const email = ref("");
const senha = ref("");

async function mostrarToast(message: string, color: string = "danger") {
  const toast = await toastController.create({
    message,
    duration: 2500,
    color,
    position: "bottom",
  });
  await toast.present();
}

async function entrar() {
  if (!email.value || !senha.value) {
    await mostrarToast("Preencha e-mail e senha.");
    return;
  }

  const resultado = login(email.value, senha.value);

  if (!resultado.ok) {
    await mostrarToast(resultado.erro ?? "Erro ao entrar.");
    return;
  }

  router.push("/home");
}
</script>