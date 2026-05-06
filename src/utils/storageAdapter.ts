import { Platform } from 'react-native';

// Web Storage - usa localStorage (navegador)
export const WebStorageAdapter = {
  getItem: (key: string) => Promise.resolve(globalThis?.localStorage?.getItem(key) ?? null),
  setItem: (key: string, value: string) => {
    globalThis?.localStorage?.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    globalThis?.localStorage?.removeItem(key);
    return Promise.resolve();
  },
};

// Mobile Storage - usa expo-secure-store (armazenamento criptografado nativo)
let NativeStorageAdapter: any = null;

if (Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const SecureStore = require('expo-secure-store');
  NativeStorageAdapter = {
    getItem: (key: string) => SecureStore.getItemAsync(key),
    setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
    removeItem: (key: string) => SecureStore.deleteItemAsync(key),
  };
}

// Escolhe o adapter baseado na plataforma
export const storageAdapter = Platform.OS === 'web' ? WebStorageAdapter : NativeStorageAdapter;
