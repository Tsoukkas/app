/*
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { AppLanguage } from "../src/lib/i18n";
import { useAppLanguage } from "../src/providers/language-provider";

export default function LanguageScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useAppLanguage();

  const pick = async (lng: AppLanguage) => {
    await setLanguage(lng);
    router.back();
  };

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

        <Text style={styles.headerTitle}>{t("screens.language")}</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>{t("language.choose")}</Text>

        <LangRow
          title={t("language.english")}
          selected={language === "en"}
          onPress={() => pick("en")}
        />
        <LangRow
          title={t("language.greek")}
          selected={language === "el"}
          onPress={() => pick("el")}
        />
      </View>
    </SafeAreaView>
  );
}

function LangRow({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.rowText}>{title}</Text>
      {selected ? (
        <MaterialIcons name="check" size={22} color="#16A34A" />
      ) : null}
    </Pressable>
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
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  headerRightSpacer: { width: 40, height: 40 },

  container: { padding: 16 },
  label: { marginBottom: 10, color: "#374151", fontSize: 14 },

  row: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 54,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowText: { fontSize: 16, color: "#111827", fontWeight: "600" },
}); */
/*
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import type { AppLanguage } from "../src/lib/i18n";
import { useAppLanguage } from "../src/providers/language-provider";

export default function LanguageScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useAppLanguage();

  const pick = async (lng: AppLanguage) => {
    await setLanguage(lng);
    router.back();
  };

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

        <Text style={styles.headerTitle}>{t("screens.language")}</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>{t("language.choose")}</Text>

        <LangRow
          title={t("language.english")}
          selected={language === "en"}
          onPress={() => pick("en")}
        />
        <LangRow
          title={t("language.greek")}
          selected={language === "el"}
          onPress={() => pick("el")}
        />
      </View>
    </SafeAreaView>
  );
}

function LangRow({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.rowText}>{title}</Text>
      {selected ? (
        <MaterialIcons name="check" size={22} color="#16A34A" />
      ) : null}
    </Pressable>
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
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  headerRightSpacer: { width: 40, height: 40 },

  container: { padding: 16 },
  label: { marginBottom: 10, color: "#374151", fontSize: 14 },

  row: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 54,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowText: { fontSize: 16, color: "#111827", fontWeight: "600" },
});
*/
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { AppLanguage } from "../src/lib/i18n";
import { useAppLanguage } from "../src/providers/language-provider";

export default function LanguageScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useAppLanguage();

  const pick = async (lng: AppLanguage) => {
    await setLanguage(lng);
    router.back();
  };

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
          {t("screens.language")}
        </Text>

        <View style={styles.headerRightSpacer} />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>{t("language.choose")}</Text>

        <LangRow
          title={t("language.english")}
          selected={language === "en"}
          onPress={() => pick("en")}
        />
        <LangRow
          title={t("language.greek")}
          selected={language === "el"}
          onPress={() => pick("el")}
        />
      </View>
    </SafeAreaView>
  );
}

function LangRow({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.rowText}>{title}</Text>
      {selected ? (
        <MaterialIcons name="check" size={22} color="#16A34A" />
      ) : null}
    </Pressable>
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

  container: {
    padding: 16,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  label: {
    marginBottom: 10,
    color: "#374151",
    fontSize: clamp(14, 13, 16),
  },

  row: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 54,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowText: {
    fontSize: clamp(16, 14, 18),
    color: "#111827",
    fontWeight: "600",
  },
});
