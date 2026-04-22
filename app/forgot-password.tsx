import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { FormInput } from "../components/FormInput";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { sendPasswordResetEmail } from "../services/authService";
import { isValidEmail } from "../utils/validators";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReset = async () => {
    setEmailError("");
    setFormError("");
    setSuccessMessage("");

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setSuccessMessage("Check your inbox — a reset link has been sent.");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <SectionTitle
        title="Reset Password"
        subtitle="Enter your email and we will send you a link to reset your password."
      />

      <View style={styles.form}>
        <FormInput
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={emailError}
          keyboardType="email-address"
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
        />

        {formError ? <Text style={styles.error}>{formError}</Text> : null}
        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

        <AppButton
          disabled={isLoading}
          label={isLoading ? "Sending..." : "Send Reset Link"}
          onPress={handleReset}
        />
      </View>

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>Back to sign in</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16
  },
  error: {
    color: "#f87171",
    fontSize: 14
  },
  success: {
    color: "#4ade80",
    fontSize: 14,
    lineHeight: 20
  },
  link: {
    color: "#38bdf8",
    fontSize: 14,
    fontWeight: "600"
  }
});
