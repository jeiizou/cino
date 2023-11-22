import { expect, test } from 'vitest';

import { Application, CinoCore } from '../../lib/index';

test('create cino core & register cino app', () => {
  const cino = new CinoCore();

  const appId = Symbol('cinoApp');
  const cinoApp = new Application({
    id: appId,
    info: {
      name: '测试应用'
    }
  });
  cino.applicationSet?.register(cinoApp);
  const innerApp = cino.applicationSet?.findAppByID(appId);
  expect(innerApp === cinoApp).toBeTruthy();
});
