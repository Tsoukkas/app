import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FaqBot } from "@/components/FaqBot";

export default function TermsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const title = t("legal.terms.title");
  const paragraphs = useMemo(() => {
    const arr = t("legal.terms.paragraphs", { returnObjects: true });
    return Array.isArray(arr) ? (arr as string[]) : [];
  }, [t]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.headerBack}
          hitSlop={10}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>

          {paragraphs.map((p, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {p}
            </Text>
          ))}
        </View>
      </ScrollView>
      <FaqBot />
    </SafeAreaView>
  );
}

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },

  header: {
    height: 56,
    backgroundColor: "#B7C334",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  headerBack: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: clamp(16, 14, 18),
    fontWeight: "700",
    textAlign: "center",
  },
  headerRightSpacer: { width: 40, height: 40 },

  content: {
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    width: "100%",
  },

  title: {
    fontSize: clamp(18, 16, 22),
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },

  paragraph: {
    fontSize: clamp(14, 13, 16),
    lineHeight: clamp(20, 18, 24),
    color: "#374151",
    marginBottom: 10,
  },
});
