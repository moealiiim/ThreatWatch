import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { EmptyState } from "../components/EmptyState";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { VulnerabilityCard } from "../components/VulnerabilityCard";
import { useVulnerabilities } from "../hooks/useVulnerabilities";

export default function VulnerabilitiesScreen() {
  const [searchText, setSearchText] = useState<string>("");
  const [activeQuery, setActiveQuery] = useState<string>("");
  const { error, isLoading, items } = useVulnerabilities(activeQuery);

  const handleSearch = () => {
    setActiveQuery(searchText.trim());
  };

  return (
    <Screen scrollable>
      <SectionTitle
        title="Vulnerabilities"
        subtitle="Recent CVEs from the National Vulnerability Database."
      />

      <View style={styles.searchRow}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search CVEs..."
          placeholderTextColor="#475569"
          returnKeyType="search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <AppButton disabled={isLoading} label="Search" onPress={handleSearch} />
      </View>

      {isLoading ? (
        <EmptyState title="Loading" description="Fetching vulnerabilities from NVD..." />
      ) : null}

      {!isLoading && error ? (
        <EmptyState title="Could Not Load" description={error} />
      ) : null}

      {!isLoading && !error && items.length === 0 ? (
        <EmptyState title="No Results" description="Try a different search term." />
      ) : null}

      {!isLoading && !error
        ? items.map((item) => (
            <VulnerabilityCard
              key={item.id}
              item={item}
              onPress={() =>
                router.push({ pathname: "/vulnerability/[id]", params: { id: item.id } })
              }
            />
          ))
        : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  searchInput: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderRadius: 14,
    borderWidth: 1,
    color: "#f8fafc",
    flex: 1,
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12
  }
});
