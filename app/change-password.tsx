/*
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ChangePasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const MIN_LEN = 8;

  const onSubmit = async () => {
    if (!user) return;

    if (newPassword !== confirmPassword) {
      Alert.alert(t("password.errorTitle"), t("password.errorMismatch"));
      return;
    }

    if (newPassword.length < MIN_LEN) {
      Alert.alert(
        t("password.errorTitle"),
        t("password.errorTooShort", { min: MIN_LEN }),
      );
      return;
    }

    try {
      setLoading(true);

      // ✅ Clerk: update password (requires current password)
      // Depending on Clerk version, the method is one of these:
      // - user.updatePassword({ currentPassword, newPassword })
      // - user.update({ password: newPassword })  (less common)
      await user.updatePassword({
        currentPassword,
        newPassword,
      });

      Alert.alert(t("password.successTitle"), t("password.successMsg"));
      router.back();
    } catch (e: any) {
      // Αν θες, εδώ κάνουμε mapping Clerk errors σε translated messages.
      Alert.alert(t("password.errorTitle"), t("password.errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("password.title")}</Text>

      <Text style={styles.label}>{t("password.current")}</Text>
      <TextInput
        value={currentPassword}
        onChangeText={setCurrentPassword}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
      />

      <Text style={styles.label}>{t("password.new")}</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
      />

      <Text style={styles.label}>{t("password.confirm")}</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
      />

      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={[styles.button, loading && { opacity: 0.6 }]}
      >
        <Text style={styles.buttonText}>
          {loading ? t("password.saving") : t("password.save")}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
  label: { fontSize: 13, fontWeight: "700" },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "700" },
});
*/
import { useUser } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView as SafeAreaViewSA } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const MIN_LEN = 8;

  const onSubmit = async () => {
    if (!user) return;

    if (newPassword !== confirmPassword) {
      Alert.alert(t("password.errorTitle"), t("password.errorMismatch"));
      return;
    }

    if (newPassword.length < MIN_LEN) {
      Alert.alert(
        t("password.errorTitle"),
        t("password.errorTooShort", { min: MIN_LEN }),
      );
      return;
    }

    try {
      setLoading(true);

      await user.updatePassword({
        currentPassword,
        newPassword,
      });

      Alert.alert(t("password.successTitle"), t("password.successMsg"));
      router.back();
    } catch (e: any) {
      Alert.alert(t("password.errorTitle"), t("password.errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaViewSA style={styles.safe} edges={["top"]}>
      {/* Header όπως τα άλλα screens */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.headerBack}
          hitSlop={10}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {t("password.title")}
        </Text>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Content */}
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.card}>
            <Text style={styles.title}>{t("password.title")}</Text>

            <Text style={styles.label}>{t("password.current")}</Text>
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              placeholder={t("password.current")}
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>{t("password.new")}</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              placeholder={t("password.new")}
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.label}>{t("password.confirm")}</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              placeholder={t("password.confirm")}
              placeholderTextColor="#9CA3AF"
            />

            <Pressable
              onPress={onSubmit}
              disabled={loading}
              style={[styles.button, loading && { opacity: 0.6 }]}
            >
              <Text style={styles.buttonText}>
                {loading ? t("password.saving") : t("password.save")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaViewSA>
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
    flex: 1,
    padding: 16,
  },
  inner: {
    width: "100%",
    maxWidth: 520,
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
    marginBottom: 12,
  },

  label: {
    fontSize: clamp(13, 12, 14),
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    width: "100%",
    color: "#111827",
  },

  button: {
    marginTop: 14,
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  buttonText: { color: "white", fontWeight: "800" },
});
