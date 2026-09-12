import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

export const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/** Spawn a browser-like process while keeping caller-owned arguments and cwd intact. */
export function spawnProcess(executable, args, options = {}) {
  return spawn(executable, args, { stdio: 'ignore', ...options });
}

/**
 * Poll Chrome/Electron's DevTools target list and return the first matching page.
 * Returning null on timeout lets each acceptance script keep its error message.
 */
export async function waitForPage(port, {
  endpoint = '/json/list',
  attempts = 40,
  intervalMs = 250,
  waitBeforePoll = false,
  predicate = target => target.type === 'page',
} = {}) {
  for (let i = 0; i < attempts; i++) {
    if (waitBeforePoll) await sleep(intervalMs);
    try {
      const response = await fetch(`http://127.0.0.1:${port}${endpoint}`);
      const targets = await response.json();
      const page = targets.find(predicate);
      if (page) return page;
    } catch {
      // DevTools 端口还没起来，按原脚本继续轮询。
    }
    if (!waitBeforePoll) await sleep(intervalMs);
  }
  return null;
}

export class CDP {
  constructor(ws, { onEvent } = {}) {
    this.ws = ws;
    this.id = 0;
    this.waiting = new Map();
    this.events = [];
    ws.onmessage = event => {
      const raw = typeof event.data === 'string' ? event.data : event.data.toString();
      const message = JSON.parse(raw);
      if (message.id && this.waiting.has(message.id)) {
        this.waiting.get(message.id)(message);
        this.waiting.delete(message.id);
      } else if (message.method) {
        this.events.push(message);
        onEvent?.(message);
      }
    };
  }

  static async open(url, options = {}) {
    const ws = new WebSocket(url);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });
    return new CDP(ws, options);
  }

  send(method, params = {}) {
    const id = ++this.id;
    const promise = new Promise(resolve => this.waiting.set(id, resolve));
    this.ws.send(JSON.stringify({ id, method, params }));
    return promise;
  }

  async eval(expression, { onException } = {}) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    const details = result.result?.exceptionDetails;
    if (details) {
      if (onException) return onException(details, expression);
      throw new Error(details.text + ' :: ' + expression.slice(0, 80));
    }
    return result.result?.result?.value;
  }

  async screenshot(file) {
    const result = await this.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(file, Buffer.from(result.result.data, 'base64'));
    return file;
  }

  close() {
    this.ws.close();
  }
}

export const openCDP = CDP.open;
