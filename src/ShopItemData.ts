class ShopItemData {
  title: string;
  isChecked: boolean;
  id: number;

  constructor(title: string, isChecked: boolean) {
    this.title = title;
    this.isChecked = isChecked;
    this.id = Date.now();
  }
}
