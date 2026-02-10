import { FAQ_NODES } from "@/data/faq";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Msg = { from: "bot" | "user"; text: string };

export function FaqBot({
  hidden = false,
  initialNodeId = "start",
}: {
  hidden?: boolean;
  initialNodeId?: string;
}) {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState(initialNodeId);

  const nodeTitle = (id: string) => t(FAQ_NODES[id].titleKey);
  const nodeAnswer = (id: string) => t(FAQ_NODES[id].answerKey);

  const [messages, setMessages] = useState<Msg[]>(() => [
    { from: "bot", text: nodeAnswer(initialNodeId) },
  ]);

  const node = FAQ_NODES[nodeId];

  const options = useMemo(() => {
    const ids = node?.next ?? [];
    return ids.map((id) => FAQ_NODES[id]).filter(Boolean);
  }, [node]);

  const reset = () => {
    setNodeId(initialNodeId);
    setMessages([{ from: "bot", text: nodeAnswer(initialNodeId) }]);
  };

  // Update messages when language or initial node changes so translations refresh
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, initialNodeId]);

  const pick = (nextId: string) => {
    if (!FAQ_NODES[nextId]) return;

    setNodeId(nextId);
    setMessages((m) => [
      ...m,
      { from: "user", text: nodeTitle(nextId) },
      { from: "bot", text: nodeAnswer(nextId) },
    ]);
  };

  if (hidden) return null;

  return (
    <>
      {/* Floating button */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => setOpen(true)}
        hitSlop={10}
      >
        <MaterialIcons name="smart-toy" size={24} color="#FFFFFF" />
      </Pressable>

      {/* Modal chat */}
      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <MaterialIcons name="smart-toy" size={20} color="#111827" />
                <Text style={styles.headerTitle}>
                  {t("faq.title", { defaultValue: "Help Bot" })}
                </Text>
              </View>

              <View style={styles.headerRight}>
                <Pressable
                  onPress={reset}
                  hitSlop={10}
                  style={styles.headerBtn}
                >
                  <MaterialIcons name="refresh" size={18} color="#111827" />
                </Pressable>

                <Pressable
                  onPress={() => setOpen(false)}
                  hitSlop={10}
                  style={styles.headerBtn}
                >
                  <MaterialIcons name="close" size={18} color="#111827" />
                </Pressable>
              </View>
            </View>

            {/* Messages */}
            <ScrollView
              style={styles.messages}
              contentContainerStyle={styles.messagesContent}
            >
              {messages.map((m, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.bubble,
                    m.from === "user" ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      m.from === "user" ? styles.userBubbleText : null,
                    ]}
                  >
                    {m.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Quick replies */}
            <View style={styles.quickWrap}>
              <Text style={styles.quickTitle}>
                {t("faq.options", { defaultValue: "Options" })}
              </Text>

              <View style={styles.quickGrid}>
                {options.map((opt) => (
                  <Pressable
                    key={opt.id}
                    onPress={() => pick(opt.id)}
                    style={({ pressed }) => [
                      styles.quickBtn,
                      pressed && { opacity: 0.9 },
                    ]}
                  >
                    <Text style={styles.quickText}>{nodeTitle(opt.id)}</Text>
                  </Pressable>
                ))}
              </View>

              <View style={{ height: 8 }} />
              <Pressable
                onPress={() => setOpen(false)}
                style={({ pressed }) => [
                  styles.closeRowBtn,
                  pressed && { opacity: 0.9 },
                ]}
              >
                <Text style={styles.closeRowText}>
                  {t("faq.close", { defaultValue: "Close" })}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 22,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0B5E93",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    zIndex: 9999,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
    maxHeight: "85%",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },

  messages: { flexGrow: 0 },
  messagesContent: { padding: 14, gap: 10 },
  bubble: {
    maxWidth: "88%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#0B5E93" },
  bubbleText: { color: "#111827" },
  userBubbleText: { color: "#FFFFFF", fontWeight: "600" },

  quickWrap: {
    padding: 14,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
  quickTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 8,
    letterSpacing: 1.1,
  },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  quickBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(11,94,147,0.10)",
    borderWidth: 1,
    borderColor: "rgba(11,94,147,0.18)",
  },
  quickText: { color: "#0B5E93", fontWeight: "700" },

  closeRowBtn: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  closeRowText: { fontWeight: "700", color: "#111827" },
});
