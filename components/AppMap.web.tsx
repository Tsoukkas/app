import type { Place } from "@/components/map-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export function AppMap({ places }: { places: Place[] }) {
  const { t } = useTranslation();

  return (
    <View style={styles.webBox}>
      <Text style={styles.title}>
        {t("map.web.title", { defaultValue: "Map available on mobile only" })}
      </Text>
      <Text style={styles.sub}>
        {t("map.web.subtitle", {
          defaultValue:
            "react-native-maps is not supported on web. Use Android/iOS to see the interactive map.",
        })}
      </Text>

      <View style={{ marginTop: 12 }}>
        {places.slice(0, 3).map((p) => (
          <View key={p.id} style={styles.item}>
            <Text style={{ fontWeight: "700" }}>{p.title}</Text>
            <Text style={{ opacity: 0.8 }}>{p.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webBox: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  title: { fontWeight: "700", fontSize: 16 },
  sub: { marginTop: 6, opacity: 0.8 },
  item: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
});
