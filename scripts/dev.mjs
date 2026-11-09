// Normalize host/port flags across VS Code, AI Studio and hosted previews.
import {spawn} from 'node:child_process';
const args=process.argv.slice(2);let host='0.0.0.0',port=process.env.PORT||'3000';
for(let i=0;i<args.length;i++){if(['--host','--hostname','-H'].includes(args[i]))host=args[++i];else if(['--port','-p'].includes(args[i]))port=args[++i];}
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','-H',host,'-p',port],{stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??0));
