import { MenuItem } from "@/types/menu";

export const highlightedDishes: MenuItem[] = [
  {
    id: 1,
    name: "Nyama Choma Deluxe",
    category: "Grill",
    description:
      "Tender goat meat slow-roasted over charcoal, served with kachumbari and smoky mukimo.",
    price: "1,800",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000150/imgi_145_Asset4_f24mf2.png",
    dietary: ["gluten-free"],
    popular: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Ugali na Tilapia",
    category: "Seafood",
    description:
      "Pan-fried tilapia fillet served alongside creamy plantain stew with fresh coriander and garlic.",
    price: "1,600",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000027/imgi_119_img_2708_uwhwot.webp",
    dietary: ["dairy-free"],
    popular: true,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Githeri Royale",
    category: "Vegetarian",
    description:
      "A refined take on the classic Kikuyu dish—slow-simmered maize and beans with caramelized onions, bell peppers, and coconut cream.",
    price: "1,200",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000019/imgi_153_potageconti_4eb416b1-978x705_ldrcpa.jpg",
    dietary: ["vegan", "gluten-free"],
    popular: true,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Chapati Wraps with Minced Beef",
    category: "Street Food",
    description:
      "Golden flaky chapatis rolled with spicy minced beef, served with tangy tomato chutney.",
    price: "1,500",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000359/imgi_167_14KOMOLAFE-rex2-rolex-zkfc-mediumSquareAt3X_mijmie.jpg",
    dietary: [],
    popular: true,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Sukumawiki & Spiced Chicken",
    category: "Local",
    description:
      "Garlic sautéed sukumawiki paired with turmeric-spiced roast chicken and a side of ugali fingers.",
    price: "1,700",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000504/Sukumawiki_Spiced_Chicken_slzfas.jpg",
    dietary: ["gluten-free"],
    popular: true,
    rating: 4.9,
  },
  {
    id: 6,
    name: "Ndengu Coconut Curry",
    category: "Vegetarian",
    description:
      "Green grams slow-cooked in spiced coconut milk with ginger, served over soft brown rice.",
    price: "1,300",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000608/imgi_135_maxresdefault_yg2d8m.webp",
    dietary: ["vegan"],
    popular: true,
    rating: 4.7,
  },
  {
    id: 7,
    name: "Ugali Mix",
    category: "Local",
    description:
      "Quality ugali flour cooked and mixed together with spiced meat and sukumawiki.",
    price: "1,400",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753000086/imgi_113_30-foods-you-should-eat-in-kenya_yvt5zq.jpg",
    dietary: ["gluten-free"],
    popular: true,
    rating: 4.7,
  },
];

// Spread highlighted dishes at the top and add dietary field to each menu item
export const menuItems: MenuItem[] = [
  ...highlightedDishes,
  {
    id: 8,
    name: "Grilled Tilapia",
    category: "seafood",
    price: "900",
    description:
      "Whole tilapia seasoned and grilled, served with kachumbari & lemon.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753170515/imgi_216_IMG_1638_e833zk.jpg",
    rating: 4.7,
    popular: false,
    dietary: [],
  },
  {
    id: 9,
    name: "Coconut prawn curry",
    category: "seafood",
    price: "1400",
    description:
      "Tiger prawns simmered in creamy coconut curry, served with rice.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753170654/imgi_221_coconut_prawn_curry_with_79671_16x9.jpg_v5fbht.webp",
    rating: 4.5,
    popular: true,
    dietary: [],
  },
  {
    id: 10,
    name: "Fried Calamari",
    category: "seafood",
    price: "1200",
    description: "Crispy golden squid rings, served with tartar sauce.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753170764/imgi_239_Air-Fryer-Calamari-1-12_sdznqn.jpg",
    rating: 4.7,
    popular: false,
    dietary: [],
  },
  {
    id: 11,
    name: "Seafood Platter",
    category: "seafood",
    price: "2000",
    description:
      "Grilled mix of fish, prawns, calamari & octopus – served with fries.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753170877/imgi_174_fb86662148be855d931b37d6c1e5fcbe_bo1bis.jpg",
    rating: 4.5,
    popular: false,
    dietary: [],
  },
  {
    id: 12,
    name: "Octopus Stew",
    category: "seafood",
    price: "1500",
    description:
      "Tender octopus cooked in rich tomato sauce with onions and herbs.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753170934/imgi_186_cimg9594_fsj1by.jpg",
    rating: 4.9,
    popular: false,
    dietary: [],
  },
  {
    id: 13,
    name: "Garlic Butter Shrimp",
    category: "seafood",
    price: "1300",
    description:
      "Succulent shrimp sautéed in garlic butter sauce – perfect with rice.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753170998/imgi_235_Garlic-Butter-Shrimp-with-Lime-and-Cilantro-4714-2_cig8gb.jpg",
    rating: 4.6,
    popular: true,
    dietary: [],
  },
  {
    id: 14,
    name: "Nyama Choma (Goat)",
    category: "main",
    price: "850",
    description: "Grilled goat meat served with ugali and kachumbari.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171062/imgi_101_nyama-choma-1-1_nd4w8i.jpg",
    rating: 4.7,
    popular: false,
    dietary: [],
  },
  {
    id: 15,
    name: "Kuku Paka",
    category: "main",
    price: "850",
    description: "Grilled chicken in creamy coconut sauce – coastal style.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171150/imgi_172_1300d1152a5c7138718444142272bcff_uft9j0.jpg",
    rating: 4.8,
    popular: false,
    dietary: [],
  },
  {
    id: 16,
    name: "Fish Pilau",
    category: "main",
    price: "700",
    description:
      "Aromatic spiced rice with fish chunks, served with kachumbari.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171210/imgi_131_Sindhi-Fish-PulaoO_l3uc9r.jpg",
    rating: 4.6,
    popular: false,
    dietary: [],
  },
  {
    id: 17,
    name: "Matoke Stew",
    category: "main",
    price: "600",
    description: "Stewed green bananas with onions, tomatoes, and spices.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171274/imgi_126_Matoke-11-1_pqsj66.jpg",
    rating: 4.9,
    popular: true,
    dietary: [],
  },
  {
    id: 18,
    name: "Beef Stew with Ugali",
    category: "main",
    price: "700",
    description:
      "Tender beef cubes in rich gravy, served with ugali and greens.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171327/imgi_127_Kenyan-Beef-Stew-Recipe-min_nk1na9.jpg",
    rating: 4.5,
    popular: false,
    dietary: [],
  },
  {
    id: 19,
    name: "Githeri Special",
    category: "vegetarian",
    price: "500",
    description:
      "Classic Kenyan mix of maize and beans, sautéed with onions and spices.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171378/imgi_97_223_l_fpg5hk.jpg",
    rating: 4.8,
    popular: true,
    dietary: [],
  },
  {
    id: 20,
    name: "Sukumawiki with Ugali",
    category: "vegetarian",
    price: "400",
    description: "Well-seasoned collard greens with a side of soft ugali.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171427/imgi_106_ugali-on-a-plate_mrmvux.jpg",
    rating: 4.8,
    popular: true,
    dietary: [],
  },
  {
    id: 21,
    name: "Maharagwe ya Nazi",
    category: "vegetarian",
    price: "500",
    description:
      "Creamy beans in coconut milk – a coastal vegetarian favorite.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171478/imgi_123_unnamed-11_edprfr.jpg",
    rating: 4.6,
    popular: false,
    dietary: [],
  },
  {
    id: 22,
    name: "Chapati & Ndengu",
    category: "vegetarian",
    price: "450",
    description: "Soft chapatis served with stewed green grams.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171564/imgi_89_Uzapoint-chapati-ndengu-lentils-376953344_ejcn4j.jpg",
    rating: 4.7,
    popular: true,
    dietary: [],
  },
  {
    id: 23,
    name: "Mandazi",
    category: "snacks",
    price: "20",
    description: "Sweet, fluffy fried dough – great with tea or as a dessert.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171640/imgi_136_Go-Live-Mandazi-_cdcx6a.jpg",
    rating: 4.8,
    popular: false,
    dietary: [],
  },
  {
    id: 24,
    name: "French Fries",
    category: "sides",
    price: "250",
    description: "Golden crispy fries, served with ketchup or mayo.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171698/imgi_164_rachel-87711-2_wudi6h.jpg",
    rating: 4.5,
    popular: true,
    dietary: [],
  },
  {
    id: 25,
    name: "Kachumbari",
    category: "sides",
    price: "150",
    description: "Fresh tomato & onion salad with lime and cilantro.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171795/imgi_223_kachumbari_4_axokni.jpg",
    rating: 4.9,
    popular: false,
    dietary: [],
  },
  {
    id: 26,
    name: "Fresh Passion Juice",
    category: "drinks",
    price: "250",
    description: "Cold-pressed passion fruit juice – no added sugar.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171846/imgi_235_passion-fruit-juice-4_hiy5sa.jpg",
    rating: 4.9,
    popular: true,
    dietary: [],
  },
  {
    id: 27,
    name: "Dawa (Hot)",
    category: "drinks",
    price: "200",
    description:
      "Honey, lemon, and ginger – perfect for relaxing or digestion.",
    image:
      "https://res.cloudinary.com/quick-prime-tech/image/upload/v1753171911/imgi_112_maxresdefault_mtfegq.jpg",
    rating: 4.9,
    popular: false,
    dietary: [],
  },
];
