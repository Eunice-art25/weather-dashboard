export function mockLocalStorage() {
  const store: { [key: string]: string } = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value;
    },
    removeItem(key: string): void {
      delete store[key];
    },
    clear(): void {
      Object.keys(store).forEach(key => delete store[key]);
    },
    key(index: number): string | null {
      return Object.keys(store)[index] || null;
    },
    get length(): number {
      return Object.keys(store).length;
    }
  };
} 