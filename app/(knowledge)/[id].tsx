import { KNOWLEDGE_ITEMS } from "@/data/knowledge";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

export default function KnowledgeDetails() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = KNOWLEDGE_ITEMS.find((x) => x.id === id);

  if (!item) {
    return (
      <Text style={{ padding: 20 }}>
        {t("knowledge.notFound", { defaultValue: "Content not found" })}
      </Text>
    );
  }

  const title = t(`knowledge.items.${item.id}.title`, {
    defaultValue: item.title,
  });

  const content = t(`knowledge.items.${item.id}.content`, {
    defaultValue: item.content,
  });

  const categoryLabels = item.categories.map((c) =>
    t(`knowledge.category.${c}`, { defaultValue: String(c) }),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      {/* Badge: Module / Resource */}
      <Text
        style={[
          styles.badge,
          item.type === "module" ? styles.moduleBadge : styles.resourceBadge,
        ]}
      >
        {item.type === "module"
          ? t("knowledge.badge.module", { defaultValue: "Module" })
          : t("knowledge.badge.resource", { defaultValue: "Resource" })}
      </Text>

      <Text style={styles.categories}>
        {t("knowledge.categories")}: {categoryLabels.join(", ")}
      </Text>

      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "700",
  },
  moduleBadge: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
  },
  resourceBadge: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
  },
  categories: {
    color: "#6B7280",
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    color: "#111827",
  },
});
