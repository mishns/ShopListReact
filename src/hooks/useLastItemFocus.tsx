import { useEffect, useRef } from "react";

export function useLastItemFocus<ListType>(list: ListType[]) {
  const lastItemTitleRef: React.RefObject<HTMLInputElement> = useRef(null);
  useEffect(() => {
    if (lastItemTitleRef.current) {
      lastItemTitleRef.current.focus();
    }
  }, [list.length]);
  return lastItemTitleRef;
}
