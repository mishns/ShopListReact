import { useRestoreStateFromLocalStorage } from "@root/src/hooks/useRestoreStateFromLocalStorage";
import { useSaveStateToLocalStorageBeforeUnload } from "@root/src/hooks/useSaveStateToLocalStorageBeforeUnload";

export function useStateLocalStorage<StateType>(
  state: StateType,
  setStateFn: (state: StateType) => void,
  storageName: string,
) {
  useRestoreStateFromLocalStorage<StateType>(setStateFn, storageName);
  useSaveStateToLocalStorageBeforeUnload(state, storageName);
}
