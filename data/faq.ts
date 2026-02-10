export type FaqNode = {
  id: string;
  titleKey: string;
  answerKey: string;
  next?: string[];
};

export const FAQ_NODES: Record<string, FaqNode> = {
  start: {
    id: "start",
    titleKey: "faq.nodes.start.title",
    answerKey: "faq.nodes.start.answer",
    next: ["account", "map", "privacy", "contact"],
  },

  account: {
    id: "account",
    titleKey: "faq.nodes.account.title",
    answerKey: "faq.nodes.account.answer",
    next: ["reset_password", "change_language", "back"],
  },

  reset_password: {
    id: "reset_password",
    titleKey: "faq.nodes.reset_password.title",
    answerKey: "faq.nodes.reset_password.answer",
    next: ["back"],
  },

  change_language: {
    id: "change_language",
    titleKey: "faq.nodes.change_language.title",
    answerKey: "faq.nodes.change_language.answer",
    next: ["back"],
  },

  map: {
    id: "map",
    titleKey: "faq.nodes.map.title",
    answerKey: "faq.nodes.map.answer",
    next: ["back"],
  },

  privacy: {
    id: "privacy",
    titleKey: "faq.nodes.privacy.title",
    answerKey: "faq.nodes.privacy.answer",
    next: ["back"],
  },

  contact: {
    id: "contact",
    titleKey: "faq.nodes.contact.title",
    answerKey: "faq.nodes.contact.answer",
    next: ["back"],
  },

  back: {
    id: "back",
    titleKey: "faq.nodes.back.title",
    answerKey: "faq.nodes.back.answer",
    next: ["account", "map", "privacy", "contact"],
  },
};
