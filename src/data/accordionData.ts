import { v4 as uuidv4 } from "uuid";

export const accordionData = [
  {
    id: uuidv4(),
    title: "About Us",
    content: [
      { id: uuidv4(), text: "Our Company", link: "/placeholder" },
      { id: uuidv4(), text: "Our Coffee", link: "/placeholder" },
      { id: uuidv4(), text: "Stories and News", link: "/placeholder" },
      { id: uuidv4(), text: "Starbucks Archive", link: "/placeholder" },
      { id: uuidv4(), text: "Investor Relations", link: "/placeholder" },
      { id: uuidv4(), text: "Customer Service", link: "/placeholder" },
      { id: uuidv4(), text: "Contact Us", link: "/placeholder" },
    ],
  },
  {
    id: uuidv4(),
    title: "Careers",
    content: [
      { id: uuidv4(), text: "Culture and Values", link: "/placeholder" },
      {
        id: uuidv4(),
        text: "Inclusion, Diversity and Equity",
        link: "/placeholder",
      },
      { id: uuidv4(), text: "College Achievement Plan", link: "/placeholder" },
      { id: uuidv4(), text: "Alumni Community", link: "/placeholder" },
      { id: uuidv4(), text: "U.S. Careers", link: "/placeholder" },
      { id: uuidv4(), text: "International Careers", link: "/placeholder" },
    ],
  },
  {
    id: uuidv4(),
    title: "Social Impact",
    content: [
      { id: uuidv4(), text: "People", link: "/placeholder" },
      { id: uuidv4(), text: "Planet", link: "/placeholder" },
      {
        id: uuidv4(),
        text: "Environmental and Social Impact Reporting",
        link: "/placeholder",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "For Business Partners",
    content: [
      { id: uuidv4(), text: "Landlord Support Center", link: "/placeholder" },
      { id: uuidv4(), text: "Suppliers", link: "/placeholder" },
      { id: uuidv4(), text: "Corporate Gift Card Sales", link: "/placeholder" },
      {
        id: uuidv4(),
        text: "Office and Foodservice Coffee",
        link: "/placeholder",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Order and Pick Up",
    content: [
      { id: uuidv4(), text: "Order on the App", link: "/placeholder" },
      { id: uuidv4(), text: "Suppliers", link: "/placeholder" },
      { id: uuidv4(), text: "Order on the Web", link: "/placeholder" },
      { id: uuidv4(), text: "Delivery", link: "/placeholder" },
      { id: uuidv4(), text: "Order and Pick Up Options", link: "/placeholder" },
      {
        id: uuidv4(),
        text: "Explore and Find Coffee for Home",
        link: "/placeholder",
      },
    ],
  },
];
