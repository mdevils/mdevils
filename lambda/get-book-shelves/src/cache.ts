import {s3} from './s3';

export class Cache<T> {
  protected expiresAfter: number;
  protected cacheFilename: string;
  protected bucketName: string;
  protected getValue: () => Promise<T>;
  protected updating = false;

  constructor({
    expiresAfter,
    cacheFilename,
    bucketName,
    getValue
  }: {
    expiresAfter: number,
    cacheFilename: string,
    bucketName: string,
    getValue: () => Promise<T>
  }) {
    this.expiresAfter = expiresAfter;
    this.cacheFilename = cacheFilename;
    this.bucketName = bucketName;
    this.getValue = getValue;
  }

  protected updateValueIfNecessary() {
    if (this.updating) {
      return;
    }
    this.updating = true;
    this.getValue().then((value) => {
      this.updating = false;
      return this.cacheValue(value);
    }).catch((e) => console.log(e));
  }

  protected cacheValue(value: T) {
    return s3.upload(this.cacheFilename, this.bucketName, JSON.stringify(value));
  }

  async get(): Promise<T> {
    try {
      const cacheFile = await s3.download(this.cacheFilename, this.bucketName);
      if ((Date.now() - cacheFile.lastModified.getTime()) > this.expiresAfter) {
        this.updateValueIfNecessary();
      }
      return JSON.parse(cacheFile.body);
    } catch (e) {
      const result = await this.getValue();
      this.cacheValue(result).catch((e) => console.error(e));
      return result;
    }
  }
}
