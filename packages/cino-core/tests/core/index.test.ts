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

  // 检测应用是否注册成功
  expect(innerApp === cinoApp).toBeTruthy();
  // 检测应用集是否挂载成功
  expect(cinoApp.curSet === cino.applicationSet).toBeTruthy();
  // 检测向上访问是否可以访问成功
  expect(cinoApp.curSet?.curCino === cino).toBeTruthy();
});
