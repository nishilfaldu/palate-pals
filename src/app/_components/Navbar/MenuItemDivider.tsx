interface MenuItemDividerProps {
    otherClassName?: string;
  }
  
  export function MenuItemDivider({ otherClassName }: MenuItemDividerProps) {
    return (
      <div className={`border-t border-gray-200 my-2 ${otherClassName}`} />
    );
  };
  
  export default MenuItemDivider;
  