import { useCallback, useEffect, useState } from "react";

import { getWatchlistItems, saveWatchlistItems } from "../utils/watchlistStorage";
import { VulnerabilityItem } from "../types/vulnerability";

type UseWatchlistResult = {
  items: VulnerabilityItem[];
  isInWatchlist: (id: string) => boolean;
  addToWatchlist: (item: VulnerabilityItem) => Promise<void>;
  removeFromWatchlist: (id: string) => Promise<void>;
};

export const useWatchlist = (): UseWatchlistResult => {
  const [items, setItems] = useState<VulnerabilityItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = await getWatchlistItems();
      setItems(stored);
    };
    void load();
  }, []);

  const isInWatchlist = useCallback(
    (id: string): boolean => items.some((item) => item.id === id),
    [items]
  );

  const addToWatchlist = useCallback(
    async (item: VulnerabilityItem): Promise<void> => {
      if (items.some((i) => i.id === item.id)) return;
      const updated = [...items, item];
      setItems(updated);
      await saveWatchlistItems(updated);
    },
    [items]
  );

  const removeFromWatchlist = useCallback(
    async (id: string): Promise<void> => {
      const updated = items.filter((item) => item.id !== id);
      setItems(updated);
      await saveWatchlistItems(updated);
    },
    [items]
  );

  return { items, isInWatchlist, addToWatchlist, removeFromWatchlist };
};
