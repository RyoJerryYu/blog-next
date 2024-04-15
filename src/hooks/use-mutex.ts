import { Mutex } from 'async-mutex';
import { createContext, createElement, useContext } from 'react';

class MutexMap {
  mutexes: Map<string, Mutex> = new Map();

  // not async, writing map is atomic
  getMutex(key: string) {
    if (!this.mutexes.has(key)) {
      this.mutexes.set(key, new Mutex());
    }
    return this.mutexes.get(key)!;
  }
}

const MutexContext = createContext<MutexMap>(new MutexMap());

export function useMutex(key: string) {
  const mutexMap = useContext(MutexContext)
  return mutexMap.getMutex(key)
}

export type MutexProviderProps = {
  children: React.ReactNode
}

export function MutexProvider({ children }: MutexProviderProps) {
  return createElement(MutexContext.Provider, {value: new MutexMap()}, children);
}