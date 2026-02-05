/*
export type KnowledgeItem = {
  id: string;
  title: string;
  image: any;
  categories: number[];
  content: string;
};

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: "module-1",
    title: "Module 1",
    image: require("@/assets/images/football.jpg"),
    categories: [1, 2],
    content:
      "This is Module 1.\n\nHere you explain the theory, objectives and activities.",
  },
  {
    id: "module-2",
    title: "Module 2",
    image: require("@/assets/images/football.jpg"),
    categories: [2, 5],
    content: "This is Module 2.\n\nMore educational content goes here.",
  },
  {
    id: "resources-1",
    title: "Resources 1",
    image: require("@/assets/images/football.jpg"),
    categories: [1, 3],
    content: "Resources for coaches.\n\nLinks, documents and guidelines.",
  },
  {
    id: "resources-1",
    title: "Resources 1",
    image: require("@/assets/images/football.jpg"),
    categories: [1, 3],
    content: "Resources for coaches.\n\nLinks, documents and guidelines.",
  },
];
*/
export type KnowledgeType = "module" | "resource";

export type KnowledgeItem = {
  id: string;
  type: KnowledgeType;
  title: string;
  image: any;
  categories: number[];
  content: string;
};

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: "module-1",
    type: "module",
    title: "Module 1",
    image: require("@/assets/images/football.jpg"),
    categories: [1, 2],
    content:
      "This is Module 1.\n\nHere you explain the theory, objectives and activities.",
  },
  {
    id: "module-2",
    type: "module",
    title: "Module 2",
    image: require("@/assets/images/football.jpg"),
    categories: [2, 5],
    content: "This is Module 2.\n\nMore educational content goes here.",
  },
  {
    id: "module-3",
    type: "module",
    title: "Module 3",
    image: require("@/assets/images/football.jpg"),
    categories: [2, 5],
    content: "This is Module 3.\n\nMore educational content goes here.",
  },
  {
    id: "resource-1",
    type: "resource",
    title: "Resources 1",
    image: require("@/assets/images/football.jpg"),
    categories: [1, 3],
    content: "Resources for coaches.\n\nLinks, documents and guidelines.",
  },
  {
    id: "resource-2",
    type: "resource",
    title: "Resources 2",
    image: require("@/assets/images/football.jpg"),
    categories: [1, 3],
    content: "More resources.\n\nLinks, documents and guidelines.",
  },
];
