import React, { ChangeEvent } from "react";
import styles from "./shoplist.css";
import { ShopItem, ShopItemData } from "@components/ShopItem";
import {
  useStateItemListWithLocalStorage,
  useLastItemInputFocus,
} from "@root/src/hooks";

const STORAGE_NAME = "shopList";

export function ShopList() {
  const {
    stateList: shopList,
    addItem,
    updateItem,
    deleteItem,
  } = useStateItemListWithLocalStorage<ShopItemData>(STORAGE_NAME);
  const lastItemTitleRef = useLastItemInputFocus<ShopItemData>(shopList);

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
        {shopList.map((item: ShopItemData) => (
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
      <button className={styles.newItemBtn} onClick={handleNewItemBtn}>
        Новый элемент
      </button>
    </div>
  );
}
