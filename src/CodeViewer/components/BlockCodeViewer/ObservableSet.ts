export class ObservableSet extends WeakSet<Element> {
  private readonly listeners = new WeakMap<Element, Function>();

  addListener(item: Element, cb: Function) {
    this.listeners.set(item, cb);

    return () => {
      this.listeners.delete(item);
    };
  }

  add(item: Element) {
    if (super.has(item)) return this;

    super.add(item);
    this.listeners.get(item)?.();
    return this;
  }
}
