import {
  IStateListItem,
  useStateItemList,
  useRestoreStateFromLocalStorage,
  useSaveStateToLocalStorageBeforeUnload,
} from "@root/src/hooks";

export function useStateItemListWithLocalStorage<
  ItemType extends IStateListItem,
>(storageName: string) {
  const stateItemList = useStateItemList<ItemType>();
  const { stateList, setStateList } = stateItemList;
  useRestoreStateFromLocalStorage<ItemType[]>(setStateList, storageName);
  useSaveStateToLocalStorageBeforeUnload(stateList, storageName);

  return stateItemList;
}
