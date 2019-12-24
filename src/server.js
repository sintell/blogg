import * as sapper from '@sapper/server';
import compression from 'compression';
import polka from 'polka';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka().use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
);

export default app.handler;

if (!process.env.NOW_REGION) {
  app.listen(PORT, err => {
    if (err) console.error('error', err);
  });
}
