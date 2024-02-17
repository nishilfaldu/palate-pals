import Link from "next/link";



interface MenuItemProps {
  label: string;
  otherClassName?: string;
  href?: string;
  onClick?: () => void;
  widthClassName?: string;
}

export function MenuItem({ onClick, label, href, otherClassName }: MenuItemProps) {
  return (
    <Link
      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${otherClassName}`}
      onClick={onClick}
      href={href ?? "#"}
      role="menuitem"
    >
      {label}
    </Link>
  );
};

export default MenuItem;
