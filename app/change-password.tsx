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
