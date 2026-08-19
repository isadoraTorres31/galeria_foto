<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>camera</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Preview da foto -->
      <img
        v-if="fotoSrc"
        :src="fotoSrc"
        style="width: 100%; border-radius: 12px"
      />
      <!-- Placeholder vazio -->
      <IonCard v-else>
        <IonCardContent> Nenhuma foto selecionada </IonCardContent>
      </IonCard>
      <IonButton expand="block" @click="tirarFoto"> Tirar Foto </IonButton>
      <IonButton expand="block" fill="outline" @click="abrirGaleria">
        Galeria
      </IonButton>
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
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { toastController } from "@ionic/vue"

const fotoSrc = ref<string | null>(null);
async function tirarFoto() {
  try {
    const foto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 90,
      width: 800,
    });
     
    fotoSrc.value = foto.dataUrl ?? null;
  } catch (err: unknown) {
    // Usuário cancelou ou negou permissão
    if (String(err).includes("cancelled")) return;
    await mostrarToast("Não foi possível acessar a câmera", "danger");
  }
}
async function abrirGaleria() {
  const foto = await Camera.getPhoto({
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Photos,
  });
  fotoSrc.value = foto.dataUrl ?? null;
}

async function mostrarToast(message: string, color: string = 'primary', duration = 2000) {
  const toast = await toastController.create({
    message,
    duration,
    color,
    position: 'bottom'
  });
  await toast.present();
}

async function verificarPermissao() {
  const status = await Camera.checkPermissions()

  if (status.camera !== 'granted') {
    const result = await Camera.requestPermissions()
    if (result.camera !== 'granted') {
      await mostrarToast("Permissão de câmera negada", "danger")
      return false
    }
  }
    return true
}

onMounted(verificarPermissao())
</script>
