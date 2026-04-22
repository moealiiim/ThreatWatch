import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
};

export const AppButton = ({ disabled = false, label, onPress, variant = "primary" }: AppButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" && styles.secondary,
        variant === "danger" && styles.danger,
        variant === "primary" && styles.primary,
        disabled && styles.disabled,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.label, variant === "danger" && styles.dangerLabel]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  primary: {
    backgroundColor: "#0ea5e9"
  },
  secondary: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderWidth: 1
  },
  danger: {
    backgroundColor: "#0f172a",
    borderColor: "#ef4444",
    borderWidth: 1
  },
  disabled: {
    opacity: 0.5
  },
  pressed: {
    opacity: 0.8
  },
  label: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700"
  },
  dangerLabel: {
    color: "#f87171"
  }
});
