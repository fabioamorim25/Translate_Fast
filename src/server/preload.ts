import { IElectronAPI, IpcRequest } from "../api";
import { contextBridge, ipcRenderer } from "electron";

import { Titlebar, TitlebarColor } from "custom-electron-titlebar";

const api: IElectronAPI = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  trpc: (req: IpcRequest) => ipcRenderer.invoke("trpc", req),
  receive: (channel: string, func: Function) => {
    const validChannels = ["app"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  titlebar: window.addEventListener("DOMContentLoaded", () => {
    new Titlebar({
      backgroundColor: TitlebarColor.fromHex("#000000"), // Cor de fundo
      icon: "./src/server/icon.jpg", // ícone
      iconSize: 18, //tamanho da fonte
      titleHorizontalAlignment: "center", //posicionar o titulo
      minimizable: true,
      maximizable: true,
      closeable: true,
      tooltips: {
        minimize: "Minimize",
        maximize: "Maximize",
        restoreDown: "Retroceder",
        close: "Close",
      },
      // BARRA DE FERRAMENTAS:
      itemBackgroundColor: TitlebarColor.fromHex("#FF0000"), //cor de fundo das ferramentas
      containerOverflow: "hidden", //ocultar os items da barra de ferramentas
    });
  }),
};

contextBridge.exposeInMainWorld("appApi", api);
