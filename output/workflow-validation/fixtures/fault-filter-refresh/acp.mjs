import {readFile} from 'node:fs/promises';
import {createClient} from './bridge-client.mjs';

export class AcpBridge {
  constructor(base) {
    this.base=base;
    this.sessionId=null;
    this.client=null;
    this.busy=false;
  }
  async start() {
    this.close();
    try {
      const token=(await readFile('/sandbox/bridge-token','utf8')).trim();
      this.client=createClient({url:'http://host.docker.internal:17820/infer',token});
      this.sessionId='bridge';
      return {session:{sessionId:this.sessionId}};
    } catch {
      this.close();
      throw Error('Inference bridge initialization failed');
    }
  }
  async ask(question,sources) {
    if (!this.sessionId || !this.client) throw Error('ACP unavailable');
    if (this.busy) throw Error('A question is already running');
    this.busy=true;
    try {
      return await this.client(question,sources);
    } finally {
      this.busy=false;
    }
  }
  close() {
    this.sessionId=null;
    this.client=null;
  }
}
