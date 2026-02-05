import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

type VideoItem = {
  id: string;
  embedUrl: string;
};

export default function HomeScreen() {
  const { t } = useTranslation();

  // 🔥 ΒΑΖΕΙΣ ΕΔΩ ΤΑ CANVA EMBED VIDEOS
  const videos: VideoItem[] = useMemo(
    () => [
      {
        id: "1",
        embedUrl:
          "https://www.canva.com/design/DAG_IIfXhVc/uqyaO46QnnFAxoD9iVhqJw/watch",
      },
      {
        id: "2",
        embedUrl:
          "https://www.canva.com/design/DAG_IIfXhVc/uqyaO46QnnFAxoD9iVhqJw/watch",
      },
      {
        id: "3",
        embedUrl:
          "https://www.canva.com/design/DAG_IIfXhVc/uqyaO46QnnFAxoD9iVhqJw/watch",
      },
    ],
    [],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        source={require("@/assets/images/Football4aChance_logo.png")}
        style={styles.logoImage}
      />

      <Text style={styles.h2}>
        {t("explore.title", { defaultValue: "Videos / Impact Stories" })}
      </Text>

      {/* Videos */}
      {videos.map((video, index) => (
        <View key={video.id} style={styles.card}>
          <Text style={styles.title}>
            {t("explore.impactStory", {
              num: index + 1,
              defaultValue: `Impact Story #${index + 1}`,
            })}
          </Text>

          <View style={styles.videoWrapper}>
            <WebView
              source={{ uri: video.embedUrl }}
              javaScriptEnabled
              domStorageEnabled
              allowsFullscreenVideo
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingTop: 60,
  },
  logoImage: {
    width: width * 0.6,
    height: width * 0.3,
    resizeMode: "contain",
    alignSelf: "center",
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 12,
    gap: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  videoWrapper: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
  },
});
