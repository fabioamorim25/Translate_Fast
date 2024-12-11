import { app, BrowserWindow, ipcMain } from "electron";
import log from "electron-log";
import path from "path";
import fs from "fs";

import { dbPath, dbUrl, isDev, latestMigration, Migration } from "./constants";
import { ipcRequestHandler } from "./ipcRequestHandler";
import { prisma, runPrismaCommand } from "./prisma";
import { MenuBuilder } from "./menu";
import { IpcRequest } from "../api";
import { appRouter } from "./app/routes/router";//fazer o back end encontrar as rotas


// ESTILIZAR A BARRA SUPERIOR
import {
  setupTitlebar,
  attachTitlebarToWindow,
} from "custom-electron-titlebar/main";
setupTitlebar();

const createWindow = async () => {
  let needsMigration;
  const dbExists = fs.existsSync(dbPath);
  if (!dbExists) {
    needsMigration = true;
    // prisma for whatever reason has trouble if the database file does not exist yet.
    // So just touch it here
    fs.closeSync(fs.openSync(dbPath, "w"));
  } else {
    try {
      const latest: Migration[] =
        await prisma.$queryRaw`select * from _prisma_migrations order by finished_at`;
      needsMigration =
        latest[latest.length - 1]?.migration_name !== latestMigration;
    } catch (e) {
      log.error(e);
      needsMigration = true;
    }
  }

  if (needsMigration) {
    try {
      const schemaPath = path.join(
        app.getAppPath().replace("app.asar", "app.asar.unpacked"),
        "prisma",
        "schema.prisma"
      );
      log.info(
        `Needs a migration. Running prisma migrate with schema path ${schemaPath}`
      );

      // first create or migrate the database! If you were deploying prisma to a cloud service, this migrate deploy
      // command you would run as part of your CI/CD deployment. Since this is an electron app, it just needs
      // to run every time the production app is started. That way if the user updates the app and the schema has
      // changed, it will transparently migrate their DB.
      await runPrismaCommand({
        command: ["migrate", "deploy", "--schema", schemaPath],
        dbUrl,
      });
      log.info("Migration done.");

      // seed
      // log.info("Seeding...");
      // await seed(prisma);
    } catch (e) {
      log.error(e);
      process.exit(1);
    }
  } else {
    log.info("Does not need migration");
  }

  // DEFINIR A TELA PRINCIPAL----------------------------------
  const win = new BrowserWindow({
    width: 1400,
    height: 710,
    icon:'./src/server/icon.jpg',
    // autoHideMenuBar:true, //ocultar a barra superior de ferramentas
    titleBarStyle: "hidden", // Esconde a barra de título padrão do Electron
    titleBarOverlay: true, // Usa os controles padrão do Windows
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // DEFINIR O TEMPLATE----------------------------------------
  attachTitlebarToWindow(win);
  const typeTemplate = "Production"; //'Dev' ou 'Production'
  const menuBuilder = MenuBuilder(win, app.name, typeTemplate);
  menuBuilder.buildMenu();

  if (isDev) {
    // in dev mode, load the vite dev server
    await win.loadURL("http://localhost:5173");
  } else {
    await win.loadFile("dist/index.html");
  }
  win.webContents.openDevTools();
};

// DA ACESSO AS ROTAS DO BACK END NO FRONT END-----------------
app.whenReady().then(() => {
  ipcMain.handle("trpc", (event, req: IpcRequest) => {
    return ipcRequestHandler({
      endpoint: "/trpc", //url raiz para acessas as rotas
      req,
      router: appRouter, // lista com todas as rotas do sistema
      createContext: async () => {
        return {};
      },
    });
  });
  // ----------------------------------------------------------

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
