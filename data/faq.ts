// data/faq.ts
export type FaqNode = {
  id: string;
  title: string; // τι θα βλέπει ο χρήστης στο κουμπί
  answer: string; // τι θα δείχνει το bot
  next?: string[]; // ids από επόμενες επιλογές (flow)
};

export const FAQ_NODES: Record<string, FaqNode> = {
  start: {
    id: "start",
    title: "Ξεκίνα",
    answer: "Γεια σου! Διάλεξε ένα θέμα 👇",
    next: ["account", "map", "privacy", "contact"],
  },

  account: {
    id: "account",
    title: "Λογαριασμός / Σύνδεση",
    answer: "Τι χρειάζεσαι για τον λογαριασμό;",
    next: ["reset_password", "change_language", "back"],
  },
  reset_password: {
    id: "reset_password",
    title: "Ξέχασα τον κωδικό",
    answer:
      "Αν έχεις επιλογή “Forgot password” στη σύνδεση, πάτησέ την και ακολούθησε τα βήματα από email.",
    next: ["back"],
  },
  change_language: {
    id: "change_language",
    title: "Αλλαγή γλώσσας",
    answer: "Πήγαινε Profile → Language και επίλεξε γλώσσα.",
    next: ["back"],
  },

  map: {
    id: "map",
    title: "Χάρτης δεν εμφανίζεται",
    answer:
      "Δοκίμασε: 1) έλεγξε άδεια τοποθεσίας, 2) σιγουρέψου ότι τρέχεις σε Android/iOS (όχι web), 3) δοκίμασε σε πραγματική συσκευή.",
    next: ["back"],
  },

  privacy: {
    id: "privacy",
    title: "Privacy / GDPR",
    answer:
      "Μπορείς να δεις τους όρους και το GDPR από Profile → Terms / GDPR.",
    next: ["back"],
  },

  contact: {
    id: "contact",
    title: "Επικοινωνία",
    answer: "Θες να επικοινωνήσεις με την ομάδα; Δες το About για στοιχεία.",
    next: ["back"],
  },

  back: {
    id: "back",
    title: "⬅️ Πίσω στο μενού",
    answer: "Οκ! Διάλεξε ένα θέμα 👇",
    next: ["account", "map", "privacy", "contact"],
  },
};
