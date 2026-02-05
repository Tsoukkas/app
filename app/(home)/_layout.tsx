import { Stack } from "expo-router/stack";
console.log("CLERK KEY:", process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function Layout() {
  return <Stack />;
}
