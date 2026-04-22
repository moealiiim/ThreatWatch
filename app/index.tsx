import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Screen } from "../components/Screen";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <Screen scrollable>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Cybersecurity Student Project</Text>
        <Text style={styles.title}>ThreatWatch</Text>
        <Text style={styles.subtitle}>
          Browse recent CVEs, look up IP addresses, and track vulnerabilities you care about.
        </Text>
        {user ? (
          <Text style={styles.welcome}>Signed in as {user.email}</Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        <AppButton
          label="Browse Vulnerabilities"
          onPress={() => router.push("/vulnerabilities")}
        />
        <AppButton
          label="IP Lookup"
          variant="secondary"
          onPress={() => router.push("/ip-lookup")}
        />
        <AppButton
          label="My Watchlist"
          variant="secondary"
          onPress={() => router.push("/watchlist")}
        />
        <AppButton
          label="Profile"
          variant="secondary"
          onPress={() => router.push("/profile")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderRadius: 20,
    borderWidth: 1,
    gap: 10,
    padding: 20
  },
  eyebrow: {
    color: "#38bdf8",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase"
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800"
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 22
  },
  welcome: {
    color: "#475569",
    fontSize: 13,
    marginTop: 4
  },
  actions: {
    gap: 12
  }
});
