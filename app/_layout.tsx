import { Stack, router, usePathname } from "expo-router";
import React, { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const isAuthScreen =
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/forgot-password";

    if (!user && !isAuthScreen) {
      router.replace("/login");
    } else if (user && isAuthScreen) {
      router.replace("/");
    }
  }, [user, isLoading, pathname]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#07111f" },
        headerTintColor: "#f8fafc",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: "#020817" }
      }}
    >
      <Stack.Screen name="index" options={{ title: "ThreatWatch" }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ title: "Create Account" }} />
      <Stack.Screen name="forgot-password" options={{ title: "Reset Password" }} />
      <Stack.Screen name="vulnerabilities" options={{ title: "Vulnerabilities" }} />
      <Stack.Screen name="ip-lookup" options={{ title: "IP Lookup" }} />
      <Stack.Screen name="watchlist" options={{ title: "Watchlist" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="vulnerability/[id]" options={{ title: "Details" }} />
    </Stack>
  );
}
