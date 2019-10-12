import {handler} from '../src'

async function test() {
  console.log(await handler());
}

test().catch((e) => {
  console.error(e);
  process.exit(1);
});
