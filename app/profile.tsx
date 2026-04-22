import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/authService";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setError("");
    setIsLoading(true);
    try {
      await logoutUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign out.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <SectionTitle title="Profile" />

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Email</Text>
        <Text style={styles.cardValue}>{user?.email ?? "—"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>User ID</Text>
        <Text style={styles.cardValue} numberOfLines={1}>
          {user?.uid ?? "—"}
        </Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <AppButton
        disabled={isLoading}
        label={isLoading ? "Signing out..." : "Sign Out"}
        variant="danger"
        onPress={handleLogout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    padding: 16
  },
  cardLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  cardValue: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "600"
  },
  error: {
    color: "#f87171",
    fontSize: 14
  }
});
