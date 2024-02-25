import React, { ChangeEvent } from "react";
import styles from "./shopitem.css";
import classNames from "classnames";

export class ShopItemData {
  id: number;
  title: string;
  isChecked: boolean;

  constructor(title: string, isChecked: boolean = false) {
    (this.id = Math.floor(Math.random() * 100000)),
      (this.title = title),
      (this.isChecked = isChecked);
  }
}

interface ShopItemProps {
  title: string;
  isChecked: boolean;
  id: number;
  onCheck: (id: number, e: ChangeEvent) => void;
  onTitleChange: (id: number, e: ChangeEvent) => void;
  onTitleBlure: (id: number, e: ChangeEvent) => void;
  titleRef: React.RefObject<HTMLInputElement>;
}

export function ShopItem({
  title,
  isChecked,
  id,
  onCheck,
  onTitleChange,
  onTitleBlure,
  titleRef,
}: Readonly<ShopItemProps>) {
  function handleCheck(e: ChangeEvent) {
    onCheck(id, e);
  }

  function handleTitleChange(e: ChangeEvent) {
    onTitleChange(id, e);
  }

  function handleTitleBlure(e: ChangeEvent) {
    onTitleBlure(id, e);
  }

  const titleClasses = classNames({
    [styles.ItemTitle]: true,
    [styles.isChecked]: isChecked,
  });

  return (
    <>
      <input
        // className={styles.ItemCheckbox}
        defaultChecked={isChecked}
        onChange={handleCheck}
        type="checkbox"
        name="item-checkbox"
        id="item-checkbox"
      />
      <input
        className={titleClasses}
        defaultValue={title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlure}
        type="text"
        ref={titleRef}
      />
    </>
  );
}
