<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Galeria</ion-title>
        <ion-buttons slot="end">
  <ion-button router-link="/sobre">
    <ion-icon slot="icon-only" :icon="informationCircleOutline" />
  </ion-button>
  <ion-button @click="sair">
    <ion-icon slot="icon-only" :icon="logOutOutline" />
  </ion-button>
</ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Olá, {{ usuario?.nome }}!</p>

      <ion-grid v-if="fotos.length > 0">
        <ion-row>
          <ion-col size="6" v-for="foto in fotos" :key="foto.id">
            <ion-card class="foto-card">
              <img :src="foto.src" />
              <ion-button
                class="botao-remover"
                color="danger"
                size="small"
                fill="solid"
                shape="round"
                @click="confirmarRemocao(foto.id)"
              >
                <ion-icon slot="icon-only" :icon="trash" />
              </ion-button>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div v-else class="vazio">
        <ion-icon :icon="imagesOutline" class="vazio-icone" />
        <p>Nenhuma foto ainda. Toque no botão + para adicionar.</p>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="abrirOpcoes">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>
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
  IonButtons,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  actionSheetController,
  alertController,
  toastController,
} from "@ionic/vue";
import { logOutOutline, add, imagesOutline, camera, images, trash, informationCircleOutline  } from "ionicons/icons";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { logout, usuarioAtual } from "@/services/auth";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { obterFotos, adicionarFoto, removerFoto, Foto } from "@/services/fotos";

const router = useRouter();
const usuario = usuarioAtual();

const fotos = ref<Foto[]>([]);

onMounted(() => {
  fotos.value = obterFotos();
});

function sair() {
  logout();
  router.push("/login");
}

async function mostrarToast(message: string, color: string = "danger") {
  const toast = await toastController.create({
    message,
    duration: 2500,
    color,
    position: "bottom",
  });
  await toast.present();
}

async function abrirOpcoes() {
  const actionSheet = await actionSheetController.create({
    header: "Adicionar foto",
    buttons: [
      { text: "Câmera", icon: camera, handler: () => capturarFoto(CameraSource.Camera) },
      { text: "Galeria", icon: images, handler: () => capturarFoto(CameraSource.Photos) },
      { text: "Cancelar", role: "cancel" },
    ],
  });
  await actionSheet.present();
}

async function capturarFoto(fonte: CameraSource) {
  const permitido = await verificarPermissao();
  if (!permitido) return;

  try {
    const foto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: fonte,
      quality: 90,
      width: 800,
    });

    if (foto.dataUrl) {
      fotos.value = adicionarFoto(foto.dataUrl);
    }
  } catch (err: unknown) {
    if (String(err).toLowerCase().includes("cancel")) return;
    await mostrarToast("Não foi possível obter a foto.");
  }
}

async function verificarPermissao(): Promise<boolean> {
  const status = await Camera.checkPermissions();

  if (status.camera !== "granted" || status.photos !== "granted") {
    const resultado = await Camera.requestPermissions();
    if (resultado.camera !== "granted" && resultado.photos !== "granted") {
      await mostrarToast("Permissão de câmera/galeria negada.");
      return false;
    }
  }

  return true;
}

async function confirmarRemocao(id: string) {
  const alerta = await alertController.create({
    header: "Remover foto",
    message: "Tem certeza que deseja remover esta foto?",
    buttons: [
      { text: "Cancelar", role: "cancel" },
      {
        text: "Remover",
        role: "destructive",
        handler: () => {
          fotos.value = removerFoto(id);
        },
      },
    ],
  });
  await alerta.present();
}
</script>

<style scoped>
.foto-card {
  margin: 0;
  position: relative;
}
.foto-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}
.botao-remover {
  position: absolute;
  top: 6px;
  right: 6px;
  --padding-start: 8px;
  --padding-end: 8px;
  margin: 0;
}
.vazio {
  text-align: center;
  margin-top: 60px;
  color: var(--ion-color-medium);
}
.vazio-icone {
  font-size: 64px;
  margin-bottom: 12px;
}
</style>