<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Criar conta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-input
            label="Nome"
            label-placement="floating"
            v-model="nome"
            type="text"
            placeholder="Seu nome completo"
          />
        </ion-item>

        <ion-item>
          <ion-input
            label="E-mail"
            label-placement="floating"
            v-model="email"
            type="email"
            placeholder="seu@email.com"
          />
        </ion-item>

        <ion-item>
          <ion-input
            label="Senha"
            label-placement="floating"
            v-model="senha"
            type="password"
            placeholder="Mínimo 4 caracteres"
          />
        </ion-item>

        <ion-item>
          <ion-input
            label="Confirmar senha"
            label-placement="floating"
            v-model="confirmarSenha"
            type="password"
            placeholder="Repita a senha"
          />
        </ion-item>
      </ion-list>

      <ion-button expand="block" class="ion-margin-top" @click="cadastrarUsuario">
        Cadastrar
      </ion-button>

      <ion-button expand="block" fill="clear" router-link="/login">
        Já tenho uma conta
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
import { cadastrar } from "@/services/auth";

const router = useRouter();

const nome = ref("");
const email = ref("");
const senha = ref("");
const confirmarSenha = ref("");

async function mostrarToast(message: string, color: string = "danger") {
  const toast = await toastController.create({
    message,
    duration: 2500,
    color,
    position: "bottom",
  });
  await toast.present();
}

async function cadastrarUsuario() {
  if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
    await mostrarToast("Preencha todos os campos.");
    return;
  }

  if (!email.value.includes("@")) {
    await mostrarToast("Digite um e-mail válido.");
    return;
  }

  if (senha.value.length < 4) {
    await mostrarToast("A senha deve ter pelo menos 4 caracteres.");
    return;
  }

  if (senha.value !== confirmarSenha.value) {
    await mostrarToast("As senhas não coincidem.");
    return;
  }

  const resultado = cadastrar({
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  });

  if (!resultado.ok) {
    await mostrarToast(resultado.erro ?? "Erro ao cadastrar.");
    return;
  }

  await mostrarToast("Conta criada com sucesso! Faça login.", "success");
  router.push("/login");
}
</script>