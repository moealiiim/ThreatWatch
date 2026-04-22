import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
  title: string;
  description: string;
};

export const EmptyState = ({ description, title }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
    padding: 24
  },
  title: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  description: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  }
});
