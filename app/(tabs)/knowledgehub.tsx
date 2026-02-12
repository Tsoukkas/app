import { CATEGORIES, STORAGE_KEY } from "@/app/interests";
import { KNOWLEDGE_ITEMS, KnowledgeItem } from "@/data/knowledge";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FaqBot } from "@/components/FaqBot";

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

  // Map numeric category ids to interest/category labels defined in CATEGORIES.
  const categoryLabels = item.categories
    .map((catId) => {
      const found = CATEGORIES.find((c) => c.catIds.includes(catId));
      if (found) return t(found.key, { defaultValue: found.id });
      // fall back to legacy knowledge.category translations
      return t(`knowledge.category.${catId}`, { defaultValue: String(catId) });
    })
    .filter(Boolean);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />

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

  const [selectedInterests, setSelectedInterests] = useState<
    Record<string, boolean>
  >({});

  // Load interests on mount and every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      let active = true;
      (async () => {
        try {
          const raw = await AsyncStorage.getItem(STORAGE_KEY);
          if (!active) return;
          if (raw) setSelectedInterests(JSON.parse(raw));
          else setSelectedInterests({});
        } catch (e) {
          console.log("Failed to load interests in KnowledgeHub:", e);
        }
      })();

      return () => {
        active = false;
      };
    }, []),
  );

  const selectedCategories = useMemo(() => {
    return CATEGORIES.filter((c) => selectedInterests[c.id]);
  }, [selectedInterests]);

  const clearFilters = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setSelectedInterests({});
    } catch (e) {
      console.log("Failed to clear interests:", e);
    }
  };

  // Expand selected interest ids to knowledge category ids set
  const selectedCatIds = useMemo(() => {
    const set = new Set<number>();
    for (const c of CATEGORIES) {
      if (selectedInterests[c.id]) {
        for (const k of c.catIds) set.add(k);
      }
    }
    return set;
  }, [selectedInterests]);

  const modules = useMemo(() => {
    const items = KNOWLEDGE_ITEMS.filter((x) => x.type === "module");
    if (selectedCatIds.size === 0) return items;
    return items.filter((it) =>
      it.categories.some((c) => selectedCatIds.has(c)),
    );
  }, [selectedCatIds]);

  const resources = useMemo(() => {
    const items = KNOWLEDGE_ITEMS.filter((x) => x.type === "resource");
    if (selectedCatIds.size === 0) return items;
    return items.filter((it) =>
      it.categories.some((c) => selectedCatIds.has(c)),
    );
  }, [selectedCatIds]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.container}>
        {selectedCategories.length > 0 ? (
          <View style={styles.filterBar}>
            <View style={styles.filterBadges}>
              {selectedCategories.map((c) => (
                <View key={c.id} style={styles.badge}>
                  <Text style={styles.badgeText}>{t(c.key)}</Text>
                </View>
              ))}
            </View>

            <Pressable onPress={clearFilters} style={styles.clearBtn}>
              <Text style={styles.clearText}>
                {t("interests.clear", { defaultValue: "Clear filters" })}
              </Text>
            </Pressable>
          </View>
        ) : null}
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
      <FaqBot />
    </SafeAreaView>
  );
}

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
    flexGrow: 1,
  },
  section: {
    gap: 12,
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
  },
  filterBar: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
  },
  filterBadges: { flexDirection: "row", flexWrap: "wrap", gap: 8, flex: 1 },
  badge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  badgeText: { color: "#2563EB", fontWeight: "700" },
  clearBtn: { marginLeft: 8 },
  clearText: { color: "#6B7280", fontWeight: "600" },
  sectionTitle: {
    fontSize: clamp(22, 18, 26),
    fontWeight: "800",
    textAlign: "center",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    flexGrow: 1,
    flexBasis: "48%",
    minWidth: 160,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 10,
    gap: 6,
    overflow: "hidden", // για να μην “ξεφεύγει” κάτι οπτικά
  },
  cardSpacer: {
    flexGrow: 1,
    flexBasis: "48%",
    minWidth: 160,
  },
  image: {
    width: "100%",
    height: 110, // FIXED height για "σταθερή" εικόνα μέσα στο card
    borderRadius: 12,
  },
  title: {
    fontWeight: "700",
    flexWrap: "wrap",
  },
  categories: {
    fontSize: clamp(12, 11, 13),
    color: "#6B7280",
    flexWrap: "wrap",
  },
});
