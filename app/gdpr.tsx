/*
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function GdprScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */ /*}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.headerBack}
          hitSlop={10}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.headerTitle}>GDPR</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {/* Εδώ βάλε ό,τι κείμενο θες */ /*}
          <Text style={styles.title}>GDPR Policy</Text>

          <Text style={styles.paragraph}>
            Γράψε εδώ το κείμενο που θέλεις για το GDPR. Μπορείς να βάλεις
            τίτλους, παραγράφους, bullets κτλ.
          </Text>

          <Text style={styles.subtitle}>1. What data we collect</Text>
          <Text style={styles.paragraph}>(Γράψε εδώ…)</Text>

          <Text style={styles.subtitle}>2. How we use your data</Text>
          <Text style={styles.paragraph}>(Γράψε εδώ…)</Text>

          <Text style={styles.subtitle}>3. Your rights</Text>
          <Text style={styles.paragraph}>(Γράψε εδώ…)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "600" },
  headerRightSpacer: { width: 40, height: 40 },

  content: { padding: 16, paddingBottom: 24 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: { fontSize: 14, lineHeight: 20, color: "#374151" },
}); */
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function GdprScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const title = t("legal.gdpr.title");
  const paragraphs = useMemo(() => {
    const arr = t("legal.gdpr.paragraphs", { returnObjects: true });
    return Array.isArray(arr) ? (arr as string[]) : [];
  }, [t]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.headerBack}
          hitSlop={10}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.headerTitle}>{title}</Text>
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
    </SafeAreaView>
  );
}

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
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "600" },
  headerRightSpacer: { width: 40, height: 40 },

  content: { padding: 16, paddingBottom: 24 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 14, padding: 16 },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
    marginBottom: 10,
  },
});
