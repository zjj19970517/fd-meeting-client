import { encrypt, decrypt } from '../crypto';

interface globalConfig {
  type?: 'localStorage' | 'sessionStorage';
  namespace?: string;
  expire?: number;
  isEncrypt?: boolean;
}

const defaultOptions: globalConfig = {
  type: 'localStorage', // 存储类型，localStorage | sessionStorage
  namespace: '', // 命名空间
  expire: 3 * 24 * 60, // 过期时间，默认为 3 天，单位为分钟
  isEncrypt: true, // 支持加密、解密数据处理
};

export default class Storage {
  options: globalConfig = {};

  constructor(options: globalConfig = {}) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  autoAddPrefix(key: string) {
    return this.options.namespace ? this.options.namespace + '__' + key : key;
  }

  /**
   * 设置存储
   * @param key
   * @param value
   * @param expire 过期时间，单位为 分钟
   * @returns
   */
  setItem(key: string, value: unknown, expire: number = 24 * 60) {
    if (value === '' || value === null || value === undefined) {
      // 空值重置
      value = null;
    }
    if (isNaN(expire) || expire < 0) {
      // 过期时间值合理性判断
      throw new Error('Storage expire must be a number');
    }
    // 构建存储内容
    const content = {
      value, // 存储值
      time: Date.now(), // 存储时间
      expire: Date.now() + 1000 * 60 * expire, // 过期时间
    };
    window[this.options.type || 'localStorage'].setItem(
      this.autoAddPrefix(key),
      // 是否需要加密，判断装载加密数据或原数据
      this.options.isEncrypt
        ? encrypt(JSON.stringify(content))
        : JSON.stringify(content)
    );
    return true;
  }

  /**
   * 获取存储值
   * @param key
   * @returns
   */
  getItem(key: string) {
    if (this.options.namespace) {
      key = this.autoAddPrefix(key);
    }
    if (!window[this.options.type].getItem(key)) {
      // 不存在判断
      return null;
    }

    const storageVal = this.options.isEncrypt
      ? JSON.parse(decrypt(window[this.options.type].getItem(key) as string))
      : JSON.parse(window[this.options.type].getItem(key) as string);
    const now = Date.now();
    if (now >= storageVal.expire) {
      // 过期销毁
      this.remove(key, false);
      return null;
    } else {
      return storageVal.value;
    }
  }

  /**
   * 删除某一个 key 的相关存储
   * @param key
   */
  remove(key: string, needNamespace = true) {
    if (needNamespace && this.options.namespace) {
      key = this.autoAddPrefix(key);
    }
    window[this.options.type].removeItem(key);
  }

  // 清空
  clear() {
    window[this.options.type].clear();
  }
}
