import { IpLookupResult } from "../types/ip";

const IPINFO_TOKEN = process.env.EXPO_PUBLIC_IPINFO_TOKEN ?? "";

type IpInfoResponse = {
  ip: string;
  city?: string;
  country?: string;
  org?: string;
};

export const lookupIpAddress = async (ip: string): Promise<IpLookupResult> => {
  const token = IPINFO_TOKEN ? `?token=${IPINFO_TOKEN}` : "";
  const response = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json${token}`);
  if (!response.ok) {
    throw new Error(`IP lookup failed (${response.status}). Check the address and try again.`);
  }
  const data = (await response.json()) as IpInfoResponse;
  return {
    ip: data.ip,
    city: data.city ?? "Unknown",
    country: data.country ?? "Unknown",
    organization: data.org ?? "Unknown"
  };
};
