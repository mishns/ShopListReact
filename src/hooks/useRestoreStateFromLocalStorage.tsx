import { useEffect } from "react";

export function useRestoreStateFromLocalStorage<StateType>(
  setStateFn: (state: StateType) => void,
  storageName: string,
) {
  useEffect(() => {
    const shopListStr: string = localStorage.getItem(storageName) ?? "";

    if (shopListStr) {
      const restoredList: StateType = JSON.parse(shopListStr);
      setStateFn(restoredList);
    }
  }, []);
}
