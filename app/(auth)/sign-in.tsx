import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const result = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      });

      await setActive({ session: result.createdSessionId });

      router.replace("/(tabs)");
    } catch (err: any) {
      setErrorMsg(err?.errors?.[0]?.message ?? "Sign in failed");
      console.log("SIGN IN ERROR:", JSON.stringify(err, null, 2));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Sign in</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      {errorMsg ? <Text style={{ color: "red" }}>{errorMsg}</Text> : null}

      <Button
        title={isSubmitting ? "Signing in..." : "Continue"}
        onPress={onSignInPress}
        disabled={isSubmitting}
      />

      <View style={{ marginTop: 8, flexDirection: "row", gap: 6 }}>
        <Text>Don't have an account?</Text>
        <Link href="/(auth)/sign-up" asChild>
          <Pressable>
            <Text
              style={{ fontWeight: "600", textDecorationLine: "underline" }}
            >
              Sign up
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
