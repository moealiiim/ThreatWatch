import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { EmptyState } from "../components/EmptyState";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { VulnerabilityCard } from "../components/VulnerabilityCard";
import { useWatchlist } from "../hooks/useWatchlist";

export default function WatchlistScreen() {
  const { items, removeFromWatchlist } = useWatchlist();

  return (
    <Screen scrollable>
      <SectionTitle
        title="Watchlist"
        subtitle="Vulnerabilities you have saved for later."
      />

      {items.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          description="Open any vulnerability and tap Save to Watchlist to add it here."
        />
      ) : (
        items.map((item) => (
          <View key={item.id} style={styles.item}>
            <VulnerabilityCard
              item={item}
              onPress={() =>
                router.push({ pathname: "/vulnerability/[id]", params: { id: item.id } })
              }
            />
            <Pressable
              style={styles.removeButton}
              onPress={() => {
                void removeFromWatchlist(item.id);
              }}
            >
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    gap: 2
  },
  removeButton: {
    alignSelf: "flex-end",
    marginBottom: 6,
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  removeText: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "600"
  }
});
