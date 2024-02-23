import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./shoplist.css";
import { ShopItem, IShopItem } from "@components/ShopItem";
import {
  useRestoreStateFromLocalStorage,
  useSaveStateToLocalStorageBeforeUnload,
} from "@hooks/index";

const STORAGE_NAME = "shopList";

export function ShopList() {
  const [shopList, setShopList] = useState<IShopItem[]>([]);
  const itemTitleRef: React.RefObject<HTMLInputElement> = useRef(null);

  useRestoreStateFromLocalStorage<IShopItem[]>(setShopList, STORAGE_NAME);
  useSaveStateToLocalStorageBeforeUnload(shopList, STORAGE_NAME);

  useEffect(() => {
    if (itemTitleRef.current) {
      itemTitleRef.current.focus();
    }
  }, [shopList.length]);

  function updateItem(itemId: number, propName: string, value: unknown) {
    const newList: IShopItem[] = shopList.map(item =>
      item.id == itemId ? { ...item, [`${propName}`]: value } : item,
    );
    setShopList(newList);
  }

  function addItem() {
    const newItem = {
      title: "",
      isChecked: false,
      id: Math.floor(Math.random() * 1000),
    };
    setShopList([...shopList, newItem]);
  }

  function deleteItem(itemId: number) {
    setShopList(shopList => shopList.filter(item => item.id != itemId));
  }

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
    addItem();
  }

  return (
    <div className={styles.shopListSection}>
      <h1 className={styles.listHeader}>Список покупок</h1>
      <ul className={styles.shopList}>
        {shopList.map(item => (
          <li key={item.id} className={styles.shopItem}>
            <ShopItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              onCheck={handleItemCheck}
              onTitleChange={handleItemTitleChange}
              onTitleBlure={handleItemBlure}
              titleRef={itemTitleRef}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleNewItemBtn}>Новый элемент</button>
    </div>
  );
}
