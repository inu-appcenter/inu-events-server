import fs from 'fs';
import express from 'express';
import {log} from './log';

export async function registerRoutes(app: express.Application, dir: string = '/routes') {
  const files = fs.readdirSync(dir);

  for (const path of files) {
    if (path.startsWith('.') || path.startsWith('_')) {
      continue;
    }

    const filePath = dir + '/' + path;
    const stats = fs.lstatSync(filePath);

    const isFile = stats.isFile();
    const isSourceFile = path.endsWith('.ts') || path.endsWith('.js');

    if (isFile && isSourceFile) {
      log(`라우터를 등록합니다: ${path}`);

      const router = (await import(filePath)).default as express.Router;

      app.use(router);
    } else if (stats.isDirectory()) {
      await registerRoutes(app, filePath);
    }
  }
}
