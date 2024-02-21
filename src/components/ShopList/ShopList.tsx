import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useBeforeUnload } from "react-router-dom";
import styles from "./shoplist.css";
import { ShopItem } from "@components/ShopItem";

interface IShopItem {
  title: string;
  isChecked: boolean;
  id: number;
}

export function ShopList() {
  const [shopList, setShopList] = useState<IShopItem[]>([]);
  const itemTitleRef: React.RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    const shopListStr: string = localStorage.getItem("shopList") ?? "";

    if (shopListStr) {
      const shopList: IShopItem[] = JSON.parse(shopListStr);
      setShopList(shopList);
    }
  }, []);

  useEffect(() => {
    if (itemTitleRef.current) {
      itemTitleRef.current.focus();
    }
  }, [shopList.length]);

  useBeforeUnload(() => {
    saveShopList();
  });

  function saveShopList() {
    localStorage.setItem("shopList", JSON.stringify(shopList));
  }

  function setItemChecked(itemId: number) {
    const newList: IShopItem[] = shopList.map(item => {
      if (item.id == itemId) {
        const updatedItem = {
          ...item,
          isChecked: !item.isChecked,
        };
        return updatedItem;
      }
      return item;
    });
    setShopList(newList);
  }

  function changeItemTitle(itemId: number, title: string) {
    const newList: IShopItem[] = shopList.map(item => {
      if (item.id == itemId) {
        const updatedItem = {
          ...item,
          title: title,
        };
        return updatedItem;
      }
      return item;
    });
    setShopList(newList);
  }

  function addNewShopItem() {
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

  function handleItemCheck(itemId: number) {
    setItemChecked(itemId);
  }

  function handleItemTitleChange(itemId: number, e: ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const title: string = el.value ?? "";
    changeItemTitle(itemId, title);
  }

  function handleItemBlure(itemId: number, e: ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const title: string = el.value ?? "";
    if (!title) {
      deleteItem(itemId);
    }
  }

  function handleNewItemBtn() {
    addNewShopItem();
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
