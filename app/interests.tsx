import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconSymbol } from "@/components/ui/icon-symbol";

export const STORAGE_KEY = "user:interests";

// Map interest ids to translation key and related knowledge category ids
export const CATEGORIES = [
  { id: "football", key: "interests.categories.football", catIds: [1] },
  { id: "basketball", key: "interests.categories.basketball", catIds: [2] },
  { id: "tennis", key: "interests.categories.tennis", catIds: [3] },
  { id: "coaching", key: "interests.categories.coaching", catIds: [5] },
  { id: "volunteering", key: "interests.categories.volunteering", catIds: [] },
];

export default function InterestsScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const insets = useSafeAreaInsets();

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setSelected(JSON.parse(raw));
        }
      } catch (e) {
        console.log("Failed to load interests:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = useCallback((id: string) => {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }, []);

  const onSave = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
      Alert.alert(t("interests.saved", { defaultValue: "Interests saved" }));
      router.back();
    } catch (e) {
      console.log("Save interests failed:", e);
      Alert.alert(t("interests.saveError", { defaultValue: "Failed to save" }));
    }
  }, [selected, router, t]);

  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={[
          styles.header,
          { paddingTop: insets.top, height: 56 + insets.top },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          android_ripple={{ color: "rgba(0,0,0,0.05)" }}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color="#0B2A3A" />
        </Pressable>

        <Text style={styles.title} numberOfLines={1}>
          {t("interests.title", { defaultValue: "Interests" })}
        </Text>

        <Pressable
          onPress={onSave}
          style={styles.saveBtn}
          android_ripple={{ color: "rgba(11,94,147,0.08)" }}
        >
          <Text style={styles.saveText}>
            {t("interests.save", { defaultValue: "Save" })}
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.hint}>
          {t("interests.hint", {
            defaultValue: "Choose categories you are interested in.",
          })}
        </Text>

        {loading ? (
          <Text style={styles.loading}>
            {t("interests.loading", { defaultValue: "Loading..." })}
          </Text>
        ) : (
          CATEGORIES.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => toggle(c.id)}
              style={[styles.row, selected[c.id] ? styles.rowSelected : null]}
              android_ripple={{ color: "rgba(0,0,0,0.03)" }}
            >
              <View style={styles.rowLeft}>
                <IconSymbol name="chevron.right" size={18} color="#9CA3AF" />
              </View>

              <Text style={styles.rowTitle}>
                {t(c.key, { defaultValue: c.id })}
              </Text>

              <View style={styles.checkboxWrap}>
                {selected[c.id] ? (
                  <View style={styles.checkCircleSelected}>
                    <MaterialIcons name="check" size={16} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={styles.checkCircle} />
                )}
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 16, fontWeight: "700", color: "#111827" },
  saveBtn: { padding: 8 },
  saveText: { color: "#0B5E93", fontWeight: "700" },

  container: { padding: 16, gap: 12 },
  hint: { color: "#6B7280", marginBottom: 8 },
  loading: { color: "#6B7280" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
  },
  rowLeft: { width: 24, alignItems: "center" },
  rowTitle: { flex: 1, fontSize: 16, color: "#111827" },
  checkboxWrap: { width: 36, alignItems: "center" },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "transparent",
  },
  checkCircleSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0B5E93",
    alignItems: "center",
    justifyContent: "center",
  },
  rowSelected: {
    backgroundColor: "#ECF8FF",
    borderColor: "#CFEFFF",
  },
});
