import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { AppMap } from "@/components/AppMap";
import type { Place } from "@/components/map-types";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const { width } = Dimensions.get("window");

type Action = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function HomeScreen() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const email = isLoaded ? user?.primaryEmailAddress?.emailAddress : null;

  const { t, i18n } = useTranslation();

  const places: Place[] = useMemo(
    () => [
      {
        id: "1",
        title: t("map.places.1.title", { defaultValue: "Basketball Court" }),
        description: t("map.places.1.description", {
          defaultValue: "Open daily 08:00–22:00",
        }),
        latitude: 35.1856,
        longitude: 33.3823,
        image: require("@/assets/images/football.jpg"),
      },
      {
        id: "2",
        title: t("map.places.2.title", { defaultValue: "Football Field" }),
        description: t("map.places.2.description", {
          defaultValue: "Free entry • Parking nearby",
        }),
        latitude: 35.1702,
        longitude: 33.3612,
        image: require("@/assets/images/football.jpg"),
      },
      {
        id: "3",
        title: t("map.places.3.title", { defaultValue: "Tennis Court" }),
        description: t("map.places.3.description", {
          defaultValue: "Booking required",
        }),
        latitude: 35.1915,
        longitude: 33.3768,
        image: require("@/assets/images/football.jpg"),
      },
    ],
    // ⚠️ βάζουμε language dependency για να αλλάζει live όταν αλλάζει γλώσσα
    [i18n.language, t],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("@/assets/images/Football4aChance_logo.png")}
        style={styles.logoImage}
      />

      <Text style={styles.h2}>
        {t("map.title", { defaultValue: "Map Integration" })}
      </Text>
      <Text style={styles.h3}>
        {t("map.subtitle", {
          defaultValue: "Sports Facilities, Courts & Resources",
        })}
      </Text>

      {/* ✅ Map */}
      <AppMap places={places} />
    </ScrollView>
  );
}

function ActionCard({
  title,
  description,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ThemedView style={styles.iconCircle}>
        <Ionicons name={icon} size={22} color="#2563EB" />
      </ThemedView>

      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      <ThemedText type="default">{description}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingTop: 60,
  },
  header: {
    padding: 16,
    borderRadius: 16,
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  logoImage: {
    width: width * 0.6,
    height: width * 0.3,
    borderRadius: 12,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  h3: {
    fontSize: 18,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    flexBasis: "48%",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    gap: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
});
