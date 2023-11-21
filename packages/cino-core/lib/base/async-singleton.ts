/**
 * 一个异步的单例类
 * 示例:
 * const asyncSingletonInstance = await AsyncSingleton.getInstance(async () => {
 *  console.log("async initialize...");
 *  await new Promise((resolve) => setTimeout(resolve, 1000));
 * })
 */
export class AsyncSingleton {
  // 我们用一个静态变量来存放类的实例
  protected static instance: AsyncSingleton;
  // 初始化操作的主要异步 Promise
  private static initializingPromise: Promise<void>;

  // 我们将构造函数设为私有，禁止外部直接创建实例
  protected constructor() {}

  // 'getInstance' 方法是获取实例的主要方法，如果实例不存在，就创建并返回这个实例
  public static async getInstance(
    initialize: () => void | Promise<void> = () => {}
  ): Promise<AsyncSingleton> {
    // 判断实例是否已经存在
    if (!this.instance) {
      // 如果实例不存在，使用 Promise.resolve() 方法调用初始化函数
      // 确保无论 initialize() 是返回一个普通值还是一个 Promise，都可以被正确处理
      this.initializingPromise = Promise.resolve(initialize()).then(() => {
        // 在初始化完成后，创建单例类的实例
        this.instance = new this();
      });
      // 等待初始化操作完成
      await this.initializingPromise;
    }
    // 返回创建的实例
    return this.instance;
  }

  // 'getInstanceSync' 是获取已创建实例的同步方法，这个方法不包含异步操作，所以只能在已经完成初始化后调用
  public static getInstanceSync(): AsyncSingleton {
    // 判断实例是否存在
    if (this.instance) {
      // 如果实例存在，直接返回
      return this.instance;
    } else {
      // 如果实例不存在，抛出错误
      throw new Error('Singleton instance is not initialized yet.');
    }
  }
}
