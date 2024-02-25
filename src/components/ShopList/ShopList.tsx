import React, { ChangeEvent } from "react";
import styles from "./shoplist.css";
import { ShopItem, ShopItemData } from "@components/ShopItem";
import {
  IStateListItem,
  useStateItemList,
  useRestoreStateFromLocalStorage,
  useSaveStateToLocalStorageBeforeUnload,
  useLastItemFocus,
} from "@hooks/index";

const STORAGE_NAME = "shopList";

export function ShopList() {
  const { stateList, setStateList, addItem, updateItem, deleteItem } =
    useStateItemList<ShopItemData>();
  useRestoreStateFromLocalStorage<ShopItemData[]>(setStateList, STORAGE_NAME);
  useSaveStateToLocalStorageBeforeUnload(stateList, STORAGE_NAME);
  const lastItemTitleRef = useLastItemFocus<IStateListItem>(stateList);

  function handleItemCheck(itemId: number, e: ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const value: boolean = el.checked;
    updateItem(itemId, "isChecked", value);
  }

  function handleItemTitleChange(itemId: number, e: ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const title: string = el.value;
    updateItem(itemId, "title", title);
  }

  function handleItemBlure(itemId: number, e: ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const title: string = el.value ?? "";
    if (!title) {
      deleteItem(itemId);
    }
  }

  function handleNewItemBtn() {
    addItem(new ShopItemData(""));
  }

  return (
    <div className={styles.shopListSection}>
      <h1 className={styles.listHeader}>Список покупок</h1>
      <ul className={styles.shopList}>
        {stateList.map((item: ShopItemData) => (
          <li key={item.id} className={styles.shopItem}>
            <ShopItem
              id={item.id}
              title={item.title}
              isChecked={item.isChecked}
              onCheck={handleItemCheck}
              onTitleChange={handleItemTitleChange}
              onTitleBlure={handleItemBlure}
              titleRef={lastItemTitleRef}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleNewItemBtn}>Новый элемент</button>
    </div>
  );
}
