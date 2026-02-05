import { KNOWLEDGE_ITEMS, KnowledgeItem } from "@/data/knowledge";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function Card({ item, onPress }: { item: KnowledgeItem; onPress: () => void }) {
  const { t } = useTranslation();

  const title = t(`knowledge.items.${item.id}.title`, {
    defaultValue: item.title,
  });

  const categoryLabels = item.categories.map((c) =>
    t(`knowledge.category.${c}`, { defaultValue: String(c) }),
  );

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.categories}>
        {t("knowledge.categories")}: {categoryLabels.join(", ")}
      </Text>
    </Pressable>
  );
}

function SectionGrid({
  heading,
  items,
  onPressItem,
}: {
  heading: string;
  items: KnowledgeItem[];
  onPressItem: (item: KnowledgeItem) => void;
}) {
  if (!items.length) return null;

  const rows = chunk(items, 2);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{heading}</Text>

      {rows.map((row, idx) => (
        <View key={idx} style={styles.row}>
          {row.map((item) => (
            <Card key={item.id} item={item} onPress={() => onPressItem(item)} />
          ))}

          {row.length === 1 && <View style={styles.cardSpacer} />}
        </View>
      ))}
    </View>
  );
}

export default function KnowledgeHub() {
  const router = useRouter();
  const { t } = useTranslation();

  const modules = KNOWLEDGE_ITEMS.filter((x) => x.type === "module");
  const resources = KNOWLEDGE_ITEMS.filter((x) => x.type === "resource");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionGrid
        heading={t("knowledge.modules")}
        items={modules}
        onPressItem={(item) => router.push(`/(knowledge)/${item.id}`)}
      />

      <SectionGrid
        heading={t("knowledge.resources")}
        items={resources}
        onPressItem={(item) => router.push(`/(knowledge)/${item.id}`)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 10,
    gap: 6,
  },
  cardSpacer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 12,
  },
  title: {
    fontWeight: "700",
  },
  categories: {
    fontSize: 12,
    color: "#6B7280",
  },
});
