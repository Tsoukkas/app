import { useAuth, useSignIn, useSignUp, useUser } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { IconSymbol } from "@/components/ui/icon-symbol";

import { FaqBot } from "@/components/FaqBot";

type RowItem = {
  id: string;
  title: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function ProfileTab() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return null;
  return isSignedIn ? <ProfileScreen /> : <AuthGate />;
}

/* ------------------------------------------
   SIGNED OUT: Login / Register
------------------------------------------ */

function AuthGate() {
  const [mode, setMode] = useState<"login" | "register">("login");
  return mode === "login" ? (
    <LoginScreen onGoRegister={() => setMode("register")} />
  ) : (
    <RegisterScreen onGoLogin={() => setMode("login")} />
  );
}

function LoginScreen({ onGoRegister }: { onGoRegister: () => void }) {
  const { t } = useTranslation();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!isLoaded || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const result = await signIn.create({
        identifier: identifier.trim(),
        password,
      });

      await setActive({ session: result.createdSessionId });

      if (remember) {
        // placeholder (persistence later if needed)
      }
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message ?? t("auth.errors.signInFailed");
      setErrorMsg(msg);
      console.log("LOGIN ERROR:", JSON.stringify(err, null, 2));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={authStyles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={authStyles.container}>
          <Image
            source={require("@/assets/images/Football4aChance_logo.png")}
            style={authStyles.logo}
            resizeMode="contain"
          />

          <View style={authStyles.titleCard}>
            <Text style={authStyles.title}>{t("auth.login.title")}</Text>
            <View style={authStyles.subtitlePill}>
              <Text style={authStyles.subtitleText}>
                {t("auth.login.subtitle")}
              </Text>
            </View>
          </View>

          <View style={{ height: 22 }} />

          <InputPill
            icon="person-outline"
            placeholder={t("auth.login.identifier")}
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <InputPill
            icon="lock-outline"
            placeholder={t("auth.login.password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            rightIcon={showPass ? "visibility-off" : "visibility"}
            onRightPress={() => setShowPass((s) => !s)}
          />

          {errorMsg ? (
            <Text style={authStyles.errorText}>{errorMsg}</Text>
          ) : null}

          <View style={authStyles.rememberRow}>
            <Text style={authStyles.rememberText}>
              {t("auth.login.remember")}
            </Text>
            <Switch value={remember} onValueChange={setRemember} />
          </View>

          <Pressable
            onPress={onSubmit}
            disabled={submitting}
            style={({ pressed }) => [
              authStyles.primaryBtn,
              pressed && { opacity: 0.9 },
              submitting && { opacity: 0.6 },
            ]}
          >
            <Text style={authStyles.primaryBtnText}>
              {submitting ? t("auth.login.signingIn") : t("auth.login.signIn")}
            </Text>
          </Pressable>

          <View style={authStyles.bottomRow}>
            <Text style={authStyles.bottomText}>
              {t("auth.login.noAccount")}
            </Text>
            <Pressable onPress={onGoRegister}>
              <Text style={authStyles.bottomLink}>
                {" "}
                {t("auth.login.signUp")}
              </Text>
            </Pressable>
          </View>

          <View style={{ height: 16 }} />
        </ScrollView>
      </KeyboardAvoidingView>
      <FaqBot />
    </SafeAreaView>
  );
}

function RegisterScreen({ onGoLogin }: { onGoLogin: () => void }) {
  const { t } = useTranslation();
  const { signUp, setActive, isLoaded } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!isLoaded || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const result = await signUp.create({
        emailAddress: emailAddress.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
      } else {
        Alert.alert(
          "Almost there",
          "Please check your email for verification to complete sign up.",
        );
      }
    } catch (err: any) {
      const msg = err?.errors?.[0]?.message ?? t("auth.errors.signUpFailed");
      setErrorMsg(msg);
      console.log("REGISTER ERROR:", JSON.stringify(err, null, 2));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={authStyles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={authStyles.container}>
          <Image
            source={require("@/assets/images/Football4aChance_logo.png")}
            style={authStyles.logo}
            resizeMode="contain"
          />

          <View style={authStyles.titleCard}>
            <Text style={authStyles.title}>{t("auth.register.title")}</Text>
            <View style={authStyles.subtitlePill}>
              <Text style={authStyles.subtitleText}>
                {t("auth.register.subtitle")}
              </Text>
            </View>
          </View>

          <View style={authStyles.registerHintRow}>
            <Text style={authStyles.bottomText}>
              {t("auth.register.alreadyRegistered")}
            </Text>
            <Pressable onPress={onGoLogin}>
              <Text style={authStyles.hereLink}>
                {" "}
                {t("auth.register.loginHere")}
              </Text>
            </Pressable>
          </View>

          <View style={{ height: 12 }} />

          <View style={authStyles.twoCols}>
            <View style={{ flex: 1 }}>
              <Text style={authStyles.fieldLabel}>
                {t("auth.register.nameLabel")}
              </Text>
              <InputPill
                icon="person-outline"
                placeholder={t("auth.register.name")}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={authStyles.fieldLabel}>
                {t("auth.register.surnameLabel")}
              </Text>
              <InputPill
                icon="person-outline"
                placeholder={t("auth.register.surname")}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <Text style={authStyles.fieldLabel}>
            {t("auth.register.emailLabel")}
          </Text>
          <InputPill
            icon="email"
            placeholder={t("auth.register.email")}
            value={emailAddress}
            onChangeText={setEmailAddress}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={authStyles.fieldLabel}>
            {t("auth.register.passwordLabel")}
          </Text>
          <InputPill
            icon="lock-outline"
            placeholder={t("auth.register.password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            rightIcon={showPass ? "visibility-off" : "visibility"}
            onRightPress={() => setShowPass((s) => !s)}
          />

          {errorMsg ? (
            <Text style={authStyles.errorText}>{errorMsg}</Text>
          ) : null}

          <Pressable
            onPress={onSubmit}
            disabled={submitting}
            style={({ pressed }) => [
              authStyles.primaryBtn,
              pressed && { opacity: 0.9 },
              submitting && { opacity: 0.6 },
            ]}
          >
            <Text style={authStyles.primaryBtnText}>
              {submitting
                ? t("auth.register.creating")
                : t("auth.register.signUp")}
            </Text>
          </Pressable>

          <View style={{ height: 16 }} />
        </ScrollView>
      </KeyboardAvoidingView>
      <FaqBot />
    </SafeAreaView>
  );
}

function InputPill({
  icon,
  rightIcon,
  onRightPress,
  ...props
}: {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  rightIcon?: React.ComponentProps<typeof MaterialIcons>["name"];
  onRightPress?: () => void;
} & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={authStyles.inputPill}>
      <MaterialIcons name={icon} size={20} color="#0B2A3A" />
      <TextInput
        {...props}
        placeholderTextColor="#D9E6EF"
        style={authStyles.input}
      />
      {rightIcon ? (
        <Pressable onPress={onRightPress} hitSlop={10}>
          <MaterialIcons name={rightIcon} size={20} color="#D9E6EF" />
        </Pressable>
      ) : null}
    </View>
  );
}

/* ------------------------------------------
   SIGNED IN: Profile page
------------------------------------------ */

function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();

  const insets = useSafeAreaInsets(); // ✅ αυτό δίνει top inset (notch)

  const fullName = isLoaded
    ? user?.fullName ||
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      ""
    : "";
  const email = isLoaded ? user?.primaryEmailAddress?.emailAddress || "" : "";
  const avatarUrl = isLoaded ? user?.imageUrl : null;

  const generalSettings: RowItem[] = useMemo(
    () => [
      {
        id: "interests",
        title: t("profile.interests"),
        icon: "favorite-border",
        onPress: () => router.push("/interests"),
      },
      {
        id: "change-password",
        title: t("profile.changePassword"),
        icon: "vpn-key",
        onPress: () => router.push("/change-password"),
      },
      {
        id: "language",
        title: t("profile.language"),
        icon: "translate",
        onPress: () => router.push("/language"),
      },
    ],
    [router, t],
  );

  const information: RowItem[] = useMemo(
    () => [
      {
        id: "about",
        title: t("profile.aboutApp"),
        icon: "info-outline",
        onPress: () => router.push("/about"),
      },
      {
        id: "terms",
        title: t("profile.terms"),
        icon: "description",
        onPress: () => router.push("/terms"),
      },
      {
        id: "gdpr",
        title: t("profile.gdpr"),
        icon: "verified-user",
        onPress: () => router.push("/gdpr"),
      },
    ],
    [router, t],
  );

  const account: RowItem[] = useMemo(
    () => [
      {
        id: "signout",
        title: t("profile.signOut"),
        icon: "logout",
        onPress: () =>
          Alert.alert(
            t("profile.signOutConfirmTitle"),
            t("profile.signOutConfirmMsg"),
            [
              { text: t("profile.cancel"), style: "cancel" },
              {
                text: t("profile.signOut"),
                style: "destructive",
                onPress: () => signOut(),
              },
            ],
          ),
      },
    ],
    [signOut, t],
  );

  return (
    <SafeAreaView style={profileStyles.safe} edges={["top"]}>
      <View style={profileStyles.header}>
        <Pressable
          onPress={() => router.back()}
          style={profileStyles.headerBack}
          hitSlop={10}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#FFFFFF" />
        </Pressable>

        <Text style={profileStyles.headerTitle} numberOfLines={1}>
          {t("profile.title")}
        </Text>

        <View style={profileStyles.headerRightSpacer} />
      </View>

      <ScrollView contentContainerStyle={profileStyles.container}>
        <View style={profileStyles.profileCard}>
          <View style={profileStyles.avatarWrap}>
            <Image
              source={
                avatarUrl
                  ? { uri: avatarUrl }
                  : require("@/assets/images/Football4aChance_logo.png")
              }
              style={profileStyles.avatar}
              resizeMode="cover"
            />

            <Pressable
              onPress={() =>
                Alert.alert("Coming soon", "Edit avatar / profile details")
              }
              style={profileStyles.avatarEdit}
              hitSlop={10}
            >
              <MaterialIcons name="edit" size={16} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text style={profileStyles.nameText}>{fullName || ""}</Text>
          <Text style={profileStyles.emailText}>{email || ""}</Text>
        </View>

        <Section title={t("profile.generalSettings")}>
          {generalSettings.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </Section>

        <Section title={t("profile.information")}>
          {information.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </Section>

        <Section title={t("profile.account")}>
          {account.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </Section>

        <View style={{ height: 20 }} />
      </ScrollView>
      <FaqBot />
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={profileStyles.section}>
      <View style={profileStyles.sectionHeader}>
        <Text style={profileStyles.sectionHeaderText} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={profileStyles.sectionBody}>{children}</View>
    </View>
  );
}

function Row({ item }: { item: RowItem }) {
  return (
    <Pressable onPress={item.onPress} style={profileStyles.row}>
      <View style={profileStyles.rowLeft}>
        <MaterialIcons name={item.icon} size={22} color="#111827" />
      </View>

      <Text style={profileStyles.rowTitle} numberOfLines={1}>
        {item.title}
      </Text>

      <IconSymbol size={22} name="chevron.right" color="#9CA3AF" />
    </Pressable>
  );
}

/* ------------------------------------------
   STYLES
------------------------------------------ */

const authStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  container: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 20,
    flexGrow: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    maxWidth: 520,
    aspectRatio: 3 / 1,
    height: undefined,
    alignSelf: "center",
    marginTop: 8,
  },
  titleCard: {
    marginTop: 10,
    backgroundColor: "#B7C334",
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
    flexWrap: "wrap",
  },
  subtitlePill: {
    backgroundColor: "#0B5E93",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    maxWidth: "100%",
  },
  subtitleText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    flexWrap: "wrap",
  },

  inputPill: {
    marginTop: 14,
    backgroundColor: "#0B5E93",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    padding: 0,
    minWidth: 0,
  },

  rememberRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    width: "100%",
  },
  rememberText: { color: "#111827", fontSize: 14, flexWrap: "wrap" },

  primaryBtn: {
    marginTop: 12,
    backgroundColor: "#0B5E93",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    width: "100%",
  },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },

  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    flexWrap: "wrap",
    width: "100%",
  },
  bottomText: { color: "#111827", fontSize: 14, flexWrap: "wrap" },
  bottomLink: { color: "#111827", fontSize: 14, fontWeight: "800" },

  registerHintRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  hereLink: {
    color: "#0B5E93",
    fontSize: 14,
    fontWeight: "800",
    textDecorationLine: "underline",
  },

  fieldLabel: {
    marginTop: 12,
    marginBottom: -6,
    fontSize: 12,
    letterSpacing: 1.4,
    color: "#111827",
    opacity: 0.8,
    flexWrap: "wrap",
  },

  twoCols: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },

  errorText: {
    marginTop: 10,
    color: "#B91C1C",
    fontWeight: "600",
    flexWrap: "wrap",
  },
});

const profileStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },

  header: {
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
    fontSize: clamp(18, 14, 20),
    fontWeight: "700",
    textAlign: "center",
  },
  headerRightSpacer: { width: 40, height: 40 },

  container: {
    paddingBottom: 20,
    flexGrow: 1,
    width: "100%",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#E5E7EB",
  },
  avatarEdit: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    flexWrap: "wrap",
  },
  emailText: {
    marginTop: 2,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    flexWrap: "wrap",
  },

  section: { marginTop: 12 },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#E5E7EB",
  },
  sectionHeaderText: { fontSize: 13, color: "#6B7280", flexWrap: "wrap" },
  sectionBody: { backgroundColor: "#FFFFFF" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    minHeight: 56,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
    gap: 12,
  },
  rowLeft: { width: 28, alignItems: "center" },
  rowTitle: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    flexWrap: "wrap",
  },
});
