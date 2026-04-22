import { useEffect, useState } from "react";

import { getRecentVulnerabilities, searchVulnerabilities } from "../services/vulnerabilityService";
import { VulnerabilityItem } from "../types/vulnerability";

type UseVulnerabilitiesResult = {
  items: VulnerabilityItem[];
  isLoading: boolean;
  error: string | null;
};

export const useVulnerabilities = (query = ""): UseVulnerabilitiesResult => {
  const [items, setItems] = useState<VulnerabilityItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = query.trim()
          ? await searchVulnerabilities(query.trim())
          : await getRecentVulnerabilities();
        setItems(response);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load vulnerabilities.");
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [query]);

  return { items, isLoading, error };
};
