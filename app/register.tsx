import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { FormInput } from "../components/FormInput";
import { Screen } from "../components/Screen";
import { registerUser } from "../services/authService";
import { doPasswordsMatch, isRequired, isValidEmail, isValidPassword } from "../utils/validators";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setFormError("");
    let hasError = false;

    if (!isRequired(email)) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (!isRequired(password)) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (!isValidPassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      hasError = true;
    }

    if (!isRequired(confirmPassword)) {
      setConfirmError("Please confirm your password.");
      hasError = true;
    } else if (!doPasswordsMatch(password, confirmPassword)) {
      setConfirmError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);
    try {
      await registerUser({ email, password, confirmPassword });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
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
        <FormInput
          errorMessage={passwordError}
          label="Password"
          placeholder="At least 6 characters"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <FormInput
          errorMessage={confirmError}
          label="Confirm Password"
          placeholder="Repeat your password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <AppButton
          disabled={isLoading}
          label={isLoading ? "Creating Account..." : "Create Account"}
          onPress={handleRegister}
        />
      </View>

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16
  },
  formError: {
    color: "#f87171",
    fontSize: 14
  },
  link: {
    color: "#38bdf8",
    fontSize: 14,
    fontWeight: "600"
  }
});
