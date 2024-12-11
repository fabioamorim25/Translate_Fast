import path from "path";
import {app} from "electron";

export const isDev = process.env.NODE_ENV === "development";
export const dbPath = path.join(app.getPath('userData'), "app.db");
console.log("DB Path", dbPath);
export const dbUrl = isDev ? 'file:./dev.db'! : "file:" + dbPath;

process.env.DATABASE_URL = dbUrl;// caso não tenha isso.No momento da consulta, dá um erro "Environment variable not found: DATABASE_URL" apesar de existir


// Isto tem de ser atualizado sempre que se cria uma migração!
export const latestMigration:any = [
  "20240704180201_create_database_project"
];

export const platformToExecutables: any = {
  win32: {
    migrationEngine: 'node_modules/@prisma/engines/schema-engine-windows.exe',
    queryEngine: 'node_modules/@prisma/engines/query_engine-windows.dll.node',
  },
  linux: {
    migrationEngine: 'node_modules/@prisma/engines/schema-engine-debian-openssl-1.1.x',
    queryEngine: 'node_modules/@prisma/engines/libquery_engine-debian-openssl-1.1.x.so.node'
  },
  darwin: {
    migrationEngine: 'node_modules/@prisma/engines/schema-engine-darwin',
    queryEngine: 'node_modules/@prisma/engines/libquery_engine-darwin.dylib.node'
  },
  darwinArm64: {
    migrationEngine: 'node_modules/@prisma/engines/schema-engine-darwin-arm64',
    queryEngine: 'node_modules/@prisma/engines/libquery_engine-darwin-arm64.dylib.node',
  }
};
const extraResourcesPath = app.getAppPath().replace('app.asar', ''); // impacted by extraResources setting in electron-builder.yml

function getPlatformName(): string {
  const isDarwin = process.platform === "darwin";
  if (isDarwin && process.arch === "arm64") {
    return process.platform + "Arm64";
  }

  return process.platform;
}

const platformName = getPlatformName();

export const mePath = path.join(
  extraResourcesPath,
  platformToExecutables[platformName].migrationEngine
);
export const qePath = path.join(
  extraResourcesPath,
  platformToExecutables[platformName].queryEngine
);


export interface Migration {
  id: string;
  checksum: string;
  finished_at: string;
  migration_name: string;
  logs: string;
  rolled_back_at: string;
  started_at: string;
  applied_steps_count: string;
}

