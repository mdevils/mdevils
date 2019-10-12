export class Cache<T> {
  protected expiresAfter: number;
  protected getValue: () => Promise<T>;

  protected value: T | undefined;
  protected valueDate: number | undefined;
  protected getValuePromise: Promise<T> | undefined;

  constructor(expiresAfter: number, getValue: () => Promise<T>) {
    this.expiresAfter = expiresAfter;
    this.getValue = getValue;
  }

  protected async updateValueIfNecessary() {
    if (this.getValuePromise) {
      return this.getValuePromise;
    }
    let now = Date.now();
    if (this.valueDate) {
      if (now - this.valueDate < this.expiresAfter) {
        return;
      }
    }
    this.getValuePromise = this.getValue();
    this.value = await this.getValuePromise;
    this.getValuePromise = undefined;
    this.valueDate = now;
  }

  async get(): Promise<T> {
    if (this.value !== undefined) {
      this.updateValueIfNecessary().catch((e) => console.error(e));
      return this.value;
    } else {
      this.getValuePromise = this.getValue();
      this.value = await this.getValuePromise;
      this.getValuePromise = undefined;
      this.valueDate = Date.now();
      return this.value;
    }
  }
}
