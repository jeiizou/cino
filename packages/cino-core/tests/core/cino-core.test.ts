import { expect, test } from 'vitest';

import { Application, CinoCore } from '../../lib/index';

test('create cino core & install cino app', () => {
  // 初始化cino对象
  const cino = new CinoCore();
  // 创建一个测试应用
  const appId = Symbol('cinoApp');
  const cinoApp = new Application({
    id: appId,
    info: {
      name: '测试应用'
    }
  });

  // 安装应用
  cino.installApp(cinoApp);

  const innerApp = cino.getApp(appId);

  // 检测应用是否注册成功
  expect(innerApp === cinoApp).toBeTruthy();
  // 检测应用集是否挂载成功
  expect(cinoApp.curSet === cino.applicationSet).toBeTruthy();
  // 检测向上访问是否可以访问成功
  expect(cinoApp.curSet?.curCino === cino).toBeTruthy();
});
