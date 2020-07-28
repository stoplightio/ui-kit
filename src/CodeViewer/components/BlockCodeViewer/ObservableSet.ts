export class ObservableSet extends Set<number> {
  private readonly listeners = new Map<number, Function>();

  addListener(item: number, cb: Function) {
    this.listeners.set(item, cb);

    return () => {
      this.listeners.delete(item);
    };
  }

  add(item: number) {
    if (super.has(item)) return this;

    super.add(item);
    this.listeners.get(item)?.();
    return this;
  }
}
