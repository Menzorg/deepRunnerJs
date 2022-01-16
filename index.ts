import express from 'express';

const app = express();
const TIMEOUTSEC = +process.env.TIMEOUTSEC || 15;
let initiated;

app.use(express.json());
app.get('/healthz', (req, res)=>{
  res.json('ok');
});
app.post('/init', (req, res)=>{
  console.log('req?.body', req?.body);
  initiated = eval(req?.body?.params?.code);
  console.log('initiated', initiated);
  res.json('ok');
});

let timer = setTimeout(process.exit, TIMEOUTSEC * 1000);

app.post('/call', (req, res)=>{
  clearTimeout(timer);
  timer = setTimeout(process.exit, TIMEOUTSEC * 1000);
  // typeof initiated === 'function' ? res.json(initiated(req.body)) : res.json({error: 'init error'});
  if (typeof initiated !== 'function') res.json({error: 'init error'});
  const result = initiated(req.body);
  console.log('call result', result);
  res.json(result);
});
  
app.listen(process.env.PORT, () => {
  console.log(`Hello bugfixers! Listening ${process.env.PORT} port`);
})