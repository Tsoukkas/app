/*
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add it to your .env",
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <Stack>
          {/* ✅ ΑΡΧΙΚΗ ΡΟΗ → Tabs (Map) */ /* }
          /*
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Υπάρχουν αλλά δεν είναι αρχική σελίδα */ /*}
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          {/* ✅ GDPR PAGE */ /*}
          <Stack.Screen name="gdpr" options={{ headerShown: false }} />

          <Stack.Screen name="terms" options={{ headerShown: false }} />

          <Stack.Screen name="about" options={{ headerShown: false }} />

          {/* Optional modal */ /*}
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>

        <StatusBar style="auto" />
      </ClerkProvider>
    </ThemeProvider>
  );
}
*/
import "../src/lib/i18n";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import {
  LanguageProvider,
  useAppLanguage,
} from "../src/providers/language-provider";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AppStack() {
  const { isReady } = useAppLanguage();
  if (!isReady) return null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(knowledge)" options={{ headerShown: false }} />
      <Stack.Screen name="change-password" options={{ headerShown: false }} />
      <Stack.Screen name="gdpr" options={{ headerShown: false }} />
      <Stack.Screen name="terms" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="language" options={{ headerShown: false }} />

      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add it to your .env",
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <LanguageProvider>
          <AppStack />
        </LanguageProvider>
        <StatusBar style="auto" />
      </ClerkProvider>
    </ThemeProvider>
  );
}
