import { useState } from "react";

import { lookupIpAddress } from "../services/ipService";
import { IpLookupResult } from "../types/ip";

type UseIpLookupResult = {
  ipAddress: string;
  setIpAddress: (value: string) => void;
  lookupResult: IpLookupResult | null;
  isLoading: boolean;
  error: string | null;
  performLookup: () => Promise<void>;
};

export const useIpLookup = (): UseIpLookupResult => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [lookupResult, setLookupResult] = useState<IpLookupResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performLookup = async (): Promise<void> => {
    const trimmed = ipAddress.trim();
    if (!trimmed) {
      setError("Please enter an IP address.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setLookupResult(null);
    try {
      const result = await lookupIpAddress(trimmed);
      setLookupResult(result);
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "Failed to look up IP address.");
    } finally {
      setIsLoading(false);
    }
  };

  return { ipAddress, setIpAddress, lookupResult, isLoading, error, performLookup };
};
