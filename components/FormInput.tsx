import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type FormInputProps = TextInputProps & {
  label: string;
  errorMessage?: string;
};

export const FormInput = ({ errorMessage, label, ...props }: FormInputProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#64748b"
        style={[styles.input, errorMessage ? styles.inputError : null]}
        {...props}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 6
  },
  label: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "600"
  },
  input: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderRadius: 14,
    borderWidth: 1,
    color: "#f8fafc",
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  inputError: {
    borderColor: "#ef4444"
  },
  errorText: {
    color: "#f87171",
    fontSize: 13
  }
});
