import { useState } from "react";

export interface IStateListItem {
  id: number;
}

export function useStateItemList<ItemType extends IStateListItem>() {
  const [stateList, setStateList] = useState<ItemType[]>([]);
  function updateItem(itemId: number, propName: string, value: unknown) {
    const newList: ItemType[] = stateList.map(item =>
      item.id == itemId ? { ...item, [`${propName}`]: value } : item,
    );
    setStateList(newList);
  }

  function addItem(item: ItemType) {
    setStateList([...stateList, item]);
  }

  function deleteItem(itemId: number) {
    setStateList(StateList => StateList.filter(item => item.id != itemId));
  }

  return { stateList, setStateList, addItem, updateItem, deleteItem };
}
