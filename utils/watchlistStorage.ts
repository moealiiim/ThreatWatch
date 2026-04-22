import AsyncStorage from "@react-native-async-storage/async-storage";

import { VulnerabilityItem } from "../types/vulnerability";

const WATCHLIST_KEY = "threatwatch_watchlist";

export const getWatchlistItems = async (): Promise<VulnerabilityItem[]> => {
  try {
    const value = await AsyncStorage.getItem(WATCHLIST_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isVulnerabilityItem);
  } catch {
    return [];
  }
};

export const saveWatchlistItems = async (items: VulnerabilityItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
  } catch {
    // silently fail — watchlist is best-effort local storage
  }
};

const isVulnerabilityItem = (value: unknown): value is VulnerabilityItem => {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.summary === "string" &&
    typeof candidate.published === "string"
  );
};
