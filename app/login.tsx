import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { loginUser } from "../services/authService";
import { isValidEmail, isValidPassword } from "../utils/validators";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setError(null);
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setIsLoading(true);
    try {
      await loginUser({ email, password });
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.appName}>ThreatWatch</Text>
        <Text style={styles.tagline}>Cybersecurity in your pocket</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor="#475569"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Your password"
          placeholderTextColor="#475569"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          disabled={isLoading}
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={() => {
            void handleLogin();
          }}
        >
          <Text style={styles.buttonText}>{isLoading ? "Signing in..." : "Sign In"}</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.link}>Create an account</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/forgot-password")}>
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#020817",
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48
  },
  header: {
    marginBottom: 40
  },
  appName: {
    color: "#f8fafc",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 6
  },
  tagline: {
    color: "#38bdf8",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.5
  },
  form: {
    gap: 14
  },
  label: {
    color: "#cbd5e1",
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
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  error: {
    color: "#f87171",
    fontSize: 14
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0ea5e9",
    borderRadius: 14,
    justifyContent: "center",
    marginTop: 6,
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700"
  },
  footer: {
    gap: 16,
    marginTop: 32
  },
  link: {
    color: "#38bdf8",
    fontSize: 15,
    fontWeight: "600"
  }
});
