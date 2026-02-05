import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const result = await signUp.create({
        emailAddress: emailAddress.trim(),
        password,
      });

      // Αν έχεις ενεργό email verification στο Clerk dashboard,
      // εδώ θα χρειαστεί verification flow.
      await setActive({ session: result.createdSessionId });

      router.replace("/(tabs)");
    } catch (err: any) {
      setErrorMsg(err?.errors?.[0]?.message ?? "Sign up failed");
      console.log("SIGN UP ERROR:", JSON.stringify(err, null, 2));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Create account</Text>

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
        title={isSubmitting ? "Creating..." : "Sign up"}
        onPress={onSignUpPress}
        disabled={isSubmitting}
      />
    </View>
  );
}
