"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";



const cuisines: { title: string; href: string; description: string }[] = [
  {
    title: "Italian Cuisine",
    href: "/cuisines/italian",
    description:
      "Experience the rich flavors and traditional dishes of Italy, from creamy risottos to savory pasta dishes and mouthwatering pizzas.",
  },
  {
    title: "Mexican Cuisine",
    href: "/cuisines/mexican",
    description:
      "Explore the vibrant and spicy flavors of Mexico, including tacos, enchiladas, tamales, and refreshing margaritas.",
  },
  {
    title: "Japanese Cuisine",
    href: "/cuisines/japanese",
    description:
      "Discover the delicate balance of flavors and artful presentation in Japanese cuisine, featuring sushi, sashimi, ramen, and tempura.",
  },
  {
    title: "Indian Cuisine",
    href: "/cuisines/indian",
    description:
      "Indulge in the bold and aromatic spices of India, with dishes like curry, biryani, tikka masala, and fluffy naan bread.",
  },
  {
    title: "French Cuisine",
    href: "/cuisines/french",
    description:
      "Experience the elegance and sophistication of French cuisine, including decadent pastries, classic sauces, and exquisite cheeses.",
  },
  {
    title: "Chinese Cuisine",
    href: "/cuisines/chinese",
    description:
      "Savor the diverse flavors and regional specialties of Chinese cuisine, featuring dim sum, stir-fries, dumplings, and aromatic teas.",
  },
];


export function CategoryNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <div className="ml-6">
            <NavigationMenuTrigger><span className="text-xl">Cuisines</span></NavigationMenuTrigger>
          </div>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {cuisines.map(cuisine => (
                <ListItem
                  key={cuisine.title}
                  title={cuisine.title}
                  href={cuisine.href}
                >
                  {cuisine.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
