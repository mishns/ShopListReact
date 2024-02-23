import { useBeforeUnload } from "react-router-dom";

export function useSaveStateToLocalStorageBeforeUnload<StateType>(
  state: StateType,
  storageName: string,
) {
  useBeforeUnload(() => {
    localStorage.setItem(storageName, JSON.stringify(state));
  });
}
