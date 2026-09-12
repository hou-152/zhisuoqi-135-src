// 知所栖 135 · 桌面版
//
// 做法：**不在 Electron 里重写一遍服务**。main 进程起的就是 scripts/serve-lib.mjs
// ——和 `node scripts/serve-135.mjs` 完全相同的那份代码，只是在随机端口上，
// 然后把窗口指向它。所以网页版和桌面版不会各走各的、修一个漏一个。
//
// 桌面版比网页版多出来的只有一件事：**能写真文件**。
//   ~/Documents/知所栖-135/学习记录.json    ← 自己的那棵树（所有者 05:09「保留它本地嘛」）
//   ~/Documents/知所栖-135/产物/<课题>.md   ← dbs-learning-beta 的 SKILL.md 写死的产物路径
// 网页版这两件都做不到，只能在 localStorage 里存，清一次浏览器数据就没了。

import { app, BrowserWindow, Menu, shell, dialog } from 'electron';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { createZssServer } from './lib/serve-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const PACKAGED = app.isPackaged;
// 开发态：根目录 = 项目根（有 prototype/ 和 .agents/skills/）。
// 打包态：根目录 = Resources/assets —— 由 scripts/build-app.mjs 备好，
//         **只装 prototype/ 与 .agents/skills/，绝不装 .private/**。
const ROOT = PACKAGED ? join(process.resourcesPath, 'assets') : join(HERE, '..');
const DATA_DIR = join(homedir(), 'Documents', '知所栖-135');
// 打包版不内置 key：读用户自己的这一份。开发态读项目的 .private/llm.env。
const ENV_FILE = PACKAGED ? join(DATA_DIR, 'llm.env') : join(ROOT, '.private', 'llm.env');

let win = null, server = null, port = 0;

async function boot() {
  mkdirSync(DATA_DIR, { recursive: true });
  // 第一次开：留一张说明，免得用户打开目录只看到两个空文件夹
  const readme = join(DATA_DIR, '说明.md');
  if (!existsSync(readme)) {
    writeFileSync(readme, [
      '# 知所栖 135 · 本地数据',
      '',
      '这个目录是桌面版存东西的地方，**只在你自己的电脑上**。',
      '',
      '- `学习记录.json` —— 你那棵树上每个概念的验收结果（复述过没过、漏了什么）',
      '- `产物/` —— skill 跑出来的产物（例如 dbs-learning-beta 的判据与最小实验）',
      '',
      '网页版没有写文件的权限，只能存在浏览器里；桌面版把这两样落成真文件，',
      '你可以直接备份、搜索、丢进别的工具。',
      '',
      '想让桌面版接上模型：在这个目录放一个 `llm.env`，内容三行 ——',
      '',
      '```',
      'export LLM_API_BASE=https://api.deepseek.com',
      'export LLM_API_KEY=你的key',
      'export LLM_MODEL=deepseek-chat',
      '```',
      '',
      '（打包版**不内置任何 key**；从源码跑 `cd app && npm start` 时读的是项目的 `.private/llm.env`。）',
      '',
      `生成时间：${new Date().toLocaleString('zh-CN', { hour12: false })}`,
      '',
    ].join('\n'));
  }

  const s = await createZssServer({ root: ROOT, port: 0, dataDir: DATA_DIR,
    version: app.getVersion(), envFile: ENV_FILE, packaged: PACKAGED });
  server = s.server; port = s.port;

  win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 1040, minHeight: 640,
    backgroundColor: '#08090a',
    titleBarStyle: 'hiddenInset',      // macOS：让红绿灯浮在内容上，更像 Linear 那种桌面 App
    trafficLightPosition: { x: 14, y: 16 },
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  win.loadURL(`http://127.0.0.1:${port}/知所栖-壳.html`);
  win.on('closed', () => { win = null; });

  // 外链走系统浏览器，不在 app 里开
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });

  buildMenu();
}

function buildMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    { role: 'editMenu' },
    {
      label: '视图',
      submenu: [
        { label: '知识体系', accelerator: 'CmdOrCtrl+1', click: () => win?.webContents.executeJavaScript(`setView('graph')`) },
        { label: '策展', accelerator: 'CmdOrCtrl+2', click: () => win?.webContents.executeJavaScript(`setView('curate')`) },
        { label: '待你看一眼', accelerator: 'CmdOrCtrl+3', click: () => win?.webContents.executeJavaScript(`setView('todo')`) },
        { label: '我在学', accelerator: 'CmdOrCtrl+4', click: () => win?.webContents.executeJavaScript(`setView('mine')`) },
        { label: '对话', accelerator: 'CmdOrCtrl+5', click: () => win?.webContents.executeJavaScript(`setView('chat')`) },
        { type: 'separator' },
        { label: '图谱', click: () => win?.webContents.executeJavaScript(`setMode('grid')`) },
        { label: '星球', click: () => win?.webContents.executeJavaScript(`setMode('sphere')`) },
        { type: 'separator' },
        { role: 'reload' }, { role: 'toggleDevTools' }, { type: 'separator' }, { role: 'togglefullscreen' },
      ],
    },
    {
      label: '数据',
      submenu: [
        {
          label: '把学习记录存成文件',
          accelerator: 'CmdOrCtrl+S',
          click: async () => {
            const json = await win?.webContents.executeJavaScript(`JSON.stringify({marks, insertMarks, axis, exportedAt: Date.now()})`);
            if (!json) return;
            mkdirSync(DATA_DIR, { recursive: true });
            writeFileSync(join(DATA_DIR, '学习记录.json'), JSON.stringify(JSON.parse(json), null, 1));
            dialog.showMessageBox(win, { type: 'info', message: '已存到本地', detail: join(DATA_DIR, '学习记录.json') });
          },
        },
        { label: '打开数据目录', accelerator: 'CmdOrCtrl+Shift+O', click: () => shell.openPath(DATA_DIR) },
        { type: 'separator' },
        { label: `服务端口：${port}`, enabled: false },
      ],
    },
    { role: 'windowMenu' },
    {
      role: 'help',
      submenu: [
        { label: '网页版（给评委的链接）', click: () => shell.openExternal('https://hou-152.github.io/zhisuoqi-135/') },
        { label: '本地数据在：~/Documents/知所栖-135', click: () => shell.openPath(DATA_DIR) },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(boot);
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) boot(); });
app.on('window-all-closed', () => { server?.close(); if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', () => server?.close());
