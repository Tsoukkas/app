import { Stack } from "expo-router";

export default function KnowledgeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Learning",
        headerStyle: { backgroundColor: "#F3F4F6" },
        contentStyle: { backgroundColor: "#F9FAFB" },
      }}
    />
  );
}
