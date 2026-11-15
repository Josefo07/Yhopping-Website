const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const { NextRequest } = require('next/server');
const file = path.resolve('app/api/contacto/route.ts');
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const route = new Module(file, module);
route.filename = file;
route.paths = module.paths;
route._compile(compiled, file);
const { POST } = route.exports;
const originalFetch = global.fetch;
const originalKey = process.env.RESEND_API_KEY;
const originalFrom = process.env.CONTACT_FROM_EMAIL;
after(() => { global.fetch = originalFetch; for (const [key,value] of [['RESEND_API_KEY',originalKey],['CONTACT_FROM_EMAIL',originalFrom]]) { if(value === undefined) delete process.env[key]; else process.env[key] = value; } });
const valid = { nombre:'Prueba',email:'example@example.com',telefono:'+528112345678',empresa:'Ejemplo',mensaje:'Esta es una prueba local sin enviar correo.' };
function request(data, origin = 'https://yhopping.com') { return new NextRequest('https://yhopping.com/api/contacto',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(data)}); }
test('rejects malformed fields and cross-origin submissions without sending', async () => {
  global.fetch = () => { throw Error('Must not send'); };
  assert.equal((await POST(request({...valid,email:'bad'}))).status,400);
  assert.equal((await POST(request({...valid,mensaje:'short'}))).status,400);
  assert.equal((await POST(request({...valid,empresa:123}))).status,400);
  assert.equal((await POST(request({...valid,website:'spam'}))).status,400);
  assert.equal((await POST(request(valid,'https://other.example'))).status,403);
});
test('does not claim success when mail is unconfigured', async () => {
  delete process.env.RESEND_API_KEY; delete process.env.CONTACT_FROM_EMAIL;
  assert.equal((await POST(request(valid))).status,503);
});
test('reports provider failures and accepts only confirmed provider response', async () => {
  process.env.RESEND_API_KEY='local-test';process.env.CONTACT_FROM_EMAIL='Yhopping <web@example.com>';
  global.fetch = async () => new Response('{}',{status:500});
  assert.equal((await POST(request(valid))).status,502);
  global.fetch = async () => Response.json({});
  assert.equal((await POST(request(valid))).status,502);
  const calls=[];
  global.fetch = async (url, options) => {calls.push({url,options});return Response.json({id:'mock-only'});};
  const response=await POST(request(valid));
  assert.equal(response.status,200);assert.deepEqual(await response.json(),{ok:true});
  const body=JSON.parse(calls[0].options.body);
  assert.deepEqual(body.to,['atencionaclientes@yhopping.com']);assert.equal(body.reply_to,valid.email);
  assert.match(calls[0].options.headers['Idempotency-Key'],/^contact-[a-f0-9]{64}$/);
  assert.ok(body.text.includes(valid.mensaje));
});
