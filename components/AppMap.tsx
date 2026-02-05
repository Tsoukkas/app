import type { Place } from "@/components/map-types";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

export function AppMap({ places }: { places: Place[] }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Place | null>(null);

  const initialRegion: Region = useMemo(
    () => ({
      latitude: places[0]?.latitude ?? 35.1856,
      longitude: places[0]?.longitude ?? 33.3823,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    }),
    [places],
  );

  return (
    <View style={styles.mapWrapper}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {places.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            onPress={() => setSelected(p)}
          />
        ))}
      </MapView>

      {selected && (
        <View style={styles.infoCard}>
          <Image source={selected.image} style={styles.infoImage} />

          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>{selected.title}</Text>
            <Text style={styles.infoDesc}>{selected.description}</Text>
          </View>

          <Pressable style={styles.clearBtn} onPress={() => setSelected(null)}>
            <Text style={styles.clearBtnText}>
              {t("map.close", { defaultValue: "Close" })}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrapper: {
    width: "100%",
    height: 360,
    borderRadius: 16,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  infoCard: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 5,
  },
  infoImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  infoText: {
    padding: 12,
    paddingBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 13,
    color: "#555",
  },
  clearBtn: {
    alignSelf: "flex-end",
    marginRight: 12,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
  clearBtnText: {
    fontWeight: "600",
  },
});
