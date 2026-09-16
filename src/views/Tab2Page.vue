<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Minhas fotos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Minhas fotos</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list v-if="fotos.length">
        <ion-item v-for="foto in fotos" :key="foto.name">
          <ion-thumbnail slot="start">
            <ion-img :src="foto.src" :alt="`Foto ${foto.name}`" />
          </ion-thumbnail>
          <ion-label>{{ foto.name }}</ion-label>
          <ion-button
            slot="end"
            fill="clear"
            color="danger"
            :aria-label="`Excluir foto ${foto.name}`"
            @click="excluirFoto(foto.name)"
>
            <ion-icon :icon="trashOutline" aria-hidden="true" />
          </ion-button>
        </ion-item>
      </ion-list>

      <ion-card v-else>
        <ion-card-content>Nenhuma foto armazenada.</ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  toastController,
} from '@ionic/vue'

import { onIonViewWillEnter } from '@ionic/vue'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { trashOutline } from 'ionicons/icons'
import { ref } from 'vue'

type Foto = {
  name: string
  src: string
}

const fotos = ref<Foto[]>([])

async function mostrarToast(message: string, color: string = 'danger', duration = 2000) {
  const toast = await toastController.create({
    message,
    duration,
    color,
    position: 'bottom',
  })

  await toast.present()
}

async function carregarFotos() {
  try {
    const { files } = await Filesystem.readdir({ directory: Directory.Data, path: '' })
    const arquivos = files.filter(
      (file) => file.name.startsWith('foto-') && file.name.endsWith('.jpg'),
    )

    fotos.value = await Promise.all(
      arquivos.map(async (file) => {
        const resultado = await Filesystem.readFile({
          directory: Directory.Data,
          path: file.name,
        })

        return {
          name: file.name,
          src: `data:image/jpeg;base64,${resultado.data}`,
        }
      }),
    )
  } catch {
    fotos.value = []
    await mostrarToast('Não foi possível carregar as fotos', 'danger')
  }
}

async function excluirFoto(nomeArquivo: string) {
  try {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: nomeArquivo,
    })

    fotos.value = fotos.value.filter((foto) => foto.name !== nomeArquivo)
  } catch {
    await mostrarToast('Não foi possível excluir a foto', 'danger')
  }
}

onIonViewWillEnter(() => {
  void carregarFotos();
});