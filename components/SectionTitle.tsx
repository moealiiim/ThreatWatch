import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export const SectionTitle = ({ subtitle, title }: SectionTitleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6
  },
  title: {
    color: "#f8fafc",
    fontSize: 26,
    fontWeight: "800"
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 22
  }
});
