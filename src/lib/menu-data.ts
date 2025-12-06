import { MenuItem } from "@/types/menu";

export const menuData: Record<string, Array<MenuItem>> = {
  "Featured Items": [
    {
      id: "1",
      name: "Big Mac",
      description:
        "Mouthwatering perfection starts with two 100% pure all beef patties and Big Mac sauce sandwiched between a sesame seed bun.",
      price: 5.99,
      image: "/big-mac-burger.jpg",
      calories: 550,
      popular: true,
    },
    {
      id: "2",
      name: "Quarter Pounder with Cheese",
      description:
        "Each Quarter Pounder with Cheese burger features a ¼ lb. of 100% fresh beef that's hot, deliciously juicy.",
      price: 6.49,
      image: "/quarter-pounder-burger-cheese.jpg",
      calories: 520,
      popular: true,
    },
    {
      id: "3",
      name: "10 Piece Chicken McNuggets",
      description:
        "Our tender, juicy Chicken McNuggets are made with 100% white meat chicken and no artificial colors, flavors or preservatives.",
      price: 5.49,
      image: "/chicken-mcnuggets-10-piece.jpg",
      calories: 420,
    },
    {
      id: "4",
      name: "McChicken",
      description:
        "A crispy chicken patty with lettuce and mayo on a toasted bun.",
      price: 2.49,
      image: "/mcchicken-sandwich.jpg",
      calories: 400,
    },
  ],
  "Combo Meals": [
    {
      id: "5",
      name: "Big Mac Meal",
      description: "Big Mac, medium World Famous Fries® and a medium drink.",
      price: 10.99,
      image: "/big-mac-meal-combo-fries-drink.jpg",
      calories: 1080,
      popular: true,
    },
    {
      id: "6",
      name: "Quarter Pounder Meal",
      description:
        "Quarter Pounder with Cheese, medium Fries and medium drink.",
      price: 11.49,
      image: "/quarter-pounder-meal-combo.jpg",
      calories: 1050,
    },
    {
      id: "7",
      name: "10 Piece McNuggets Meal",
      description: "10 piece Chicken McNuggets, medium Fries and medium drink.",
      price: 9.99,
      image: "/mcnuggets-meal-combo.jpg",
      calories: 950,
    },
    {
      id: "8",
      name: "Filet-O-Fish Meal",
      description: "Filet-O-Fish, medium Fries and medium drink.",
      price: 9.49,
      image: "/filet-o-fish-meal-combo.jpg",
      calories: 920,
    },
  ],
  Burgers: [
    {
      id: "9",
      name: "Double Quarter Pounder",
      description:
        "Each Double Quarter Pounder with Cheese features two quarter pound 100% fresh beef patties.",
      price: 8.99,
      image: "/double-quarter-pounder-burger.jpg",
      calories: 740,
    },
    {
      id: "10",
      name: "McDouble",
      description:
        "A simple, satisfying burger with two 100% beef patties, onions, pickles, ketchup, mustard, and cheese.",
      price: 3.19,
      image: "/mcdouble-burger.jpg",
      calories: 400,
    },
    {
      id: "11",
      name: "Cheeseburger",
      description:
        "A simple, satisfying cheeseburger with 100% beef, pickles, onions, ketchup, mustard, and cheese.",
      price: 2.49,
      image: "/mcdonalds-cheeseburger.jpg",
      calories: 300,
    },
    {
      id: "12",
      name: "Hamburger",
      description:
        "A classic McDonald's hamburger with 100% beef, onions, pickles, ketchup, and mustard.",
      price: 1.99,
      image: "/mcdonalds-hamburger.jpg",
      calories: 250,
    },
  ],
  "Chicken & Fish": [
    {
      id: "13",
      name: "Crispy Chicken Sandwich",
      description:
        "A Southern-style fried chicken sandwich with pickles and butter on a potato roll.",
      price: 5.99,
      image: "/crispy-chicken-sandwich.png",
      calories: 470,
      popular: true,
    },
    {
      id: "14",
      name: "Spicy Crispy Chicken Sandwich",
      description:
        "A Southern-style spicy fried chicken sandwich with pickles on a potato roll.",
      price: 5.99,
      image: "/spicy-crispy-chicken-sandwich.jpg",
      calories: 530,
    },
    {
      id: "15",
      name: "Filet-O-Fish",
      description:
        "Dive into our iconic Filet-O-Fish: fish filet, tartar sauce, and cheese on a steamed bun.",
      price: 5.49,
      image: "/filet-o-fish-sandwich.jpg",
      calories: 390,
    },
    {
      id: "16",
      name: "20 Piece McNuggets",
      description:
        "Our tender, juicy Chicken McNuggets made with 100% white meat chicken.",
      price: 8.99,
      image: "/20-piece-chicken-mcnuggets.jpg",
      calories: 840,
    },
  ],
  "Fries & Sides": [
    {
      id: "17",
      name: "World Famous Fries (Large)",
      description:
        "Our iconic World Famous Fries – crispy, golden, and perfectly salted.",
      price: 3.79,
      image: "/placeholder.svg?height=120&width=120",
      calories: 490,
      popular: true,
    },
    {
      id: "18",
      name: "World Famous Fries (Medium)",
      description:
        "Our iconic World Famous Fries – crispy, golden, and perfectly salted.",
      price: 3.29,
      image: "/placeholder.svg?height=120&width=120",
      calories: 320,
    },
    {
      id: "19",
      name: "Apple Slices",
      description: "Fresh, crisp apple slices. A healthy side option.",
      price: 1.49,
      image: "/placeholder.svg?height=120&width=120",
      calories: 15,
    },
    {
      id: "20",
      name: "Side Salad",
      description:
        "A fresh blend of romaine and leaf lettuces with grape tomatoes.",
      price: 2.99,
      image: "/placeholder.svg?height=120&width=120",
      calories: 15,
    },
  ],
  Beverages: [
    {
      id: "21",
      name: "Coca-Cola (Medium)",
      description: "Ice-cold Coca-Cola – the perfect refreshment.",
      price: 2.19,
      image: "/placeholder.svg?height=120&width=120",
      calories: 210,
    },
    {
      id: "22",
      name: "Sprite (Medium)",
      description: "Refreshing, crisp, and caffeine-free Sprite.",
      price: 2.19,
      image: "/placeholder.svg?height=120&width=120",
      calories: 200,
    },
    {
      id: "23",
      name: "McCafé Iced Coffee",
      description:
        "Refreshingly cool McCafé Iced Coffee made with 100% Arabica beans.",
      price: 2.99,
      image: "/placeholder.svg?height=120&width=120",
      calories: 140,
    },
    {
      id: "24",
      name: "Hi-C Orange Lavaburst",
      description: "The classic Hi-C Orange – sweet and refreshing.",
      price: 2.19,
      image: "/placeholder.svg?height=120&width=120",
      calories: 230,
    },
  ],
  "Desserts & Shakes": [
    {
      id: "25",
      name: "McFlurry with OREO Cookies",
      description:
        "The McDonald's McFlurry with OREO Cookies is a sweet, creamy dessert.",
      price: 4.49,
      image: "/placeholder.svg?height=120&width=120",
      calories: 510,
      popular: true,
    },
    {
      id: "26",
      name: "Chocolate Shake (Medium)",
      description: "Creamy vanilla soft serve blended with chocolate syrup.",
      price: 3.99,
      image: "/placeholder.svg?height=120&width=120",
      calories: 630,
    },
    {
      id: "27",
      name: "Hot Fudge Sundae",
      description: "Creamy vanilla soft serve with hot fudge topping.",
      price: 2.79,
      image: "/placeholder.svg?height=120&width=120",
      calories: 330,
    },
    {
      id: "28",
      name: "Apple Pie",
      description:
        "A baked pie with a crispy flaky crust filled with apples and cinnamon.",
      price: 1.49,
      image: "/placeholder.svg?height=120&width=120",
      calories: 230,
    },
  ],
};
