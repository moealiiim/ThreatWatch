import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { EmptyState } from "../components/EmptyState";
import { FormInput } from "../components/FormInput";
import { Screen } from "../components/Screen";
import { SectionTitle } from "../components/SectionTitle";
import { useIpLookup } from "../hooks/useIpLookup";

export default function IpLookupScreen() {
  const { error, ipAddress, isLoading, lookupResult, performLookup, setIpAddress } = useIpLookup();

  return (
    <Screen>
      <SectionTitle
        title="IP Lookup"
        subtitle="Enter any IP address to see its location and network info."
      />

      <View style={styles.form}>
        <FormInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          label="IP Address"
          placeholder="e.g. 8.8.8.8"
          value={ipAddress}
          onChangeText={setIpAddress}
        />
        <AppButton
          disabled={isLoading}
          label={isLoading ? "Looking up..." : "Search"}
          onPress={() => {
            void performLookup();
          }}
        />
      </View>

      {error ? <EmptyState title="Lookup Failed" description={error} /> : null}

      {!error && lookupResult ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultHeading}>Result</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>IP</Text>
            <Text style={styles.rowValue}>{lookupResult.ip}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>City</Text>
            <Text style={styles.rowValue}>{lookupResult.city}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Country</Text>
            <Text style={styles.rowValue}>{lookupResult.country}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Organization</Text>
            <Text style={styles.rowValue}>{lookupResult.organization}</Text>
          </View>
        </View>
      ) : null}

      {!error && !lookupResult && !isLoading ? (
        <EmptyState title="No Result" description="Enter an IP address above and tap Search." />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16
  },
  resultCard: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderRadius: 18,
    borderWidth: 1,
    padding: 18
  },
  resultHeading: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  rowLabel: {
    color: "#64748b",
    fontSize: 14
  },
  rowValue: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "600",
    maxWidth: "65%",
    textAlign: "right"
  }
});
