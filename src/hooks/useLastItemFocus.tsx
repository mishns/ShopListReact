import { useEffect, useRef } from "react";

export function useLastItemFocus<ItemType>(list: ItemType[]) {
  const lastItemTitleRef: React.RefObject<HTMLInputElement> = useRef(null);
  useEffect(() => {
    if (lastItemTitleRef.current) {
      lastItemTitleRef.current.focus();
    }
  }, [list.length]);
  return lastItemTitleRef;
}
