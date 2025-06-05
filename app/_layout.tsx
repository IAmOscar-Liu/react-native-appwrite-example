import AppwriteProvider, { useAppwrite } from "@/context/AppwriteProvider";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, LogBox, View } from "react-native";
import "../app/global.css";

LogBox.ignoreLogs(["User (role: guests) missing scope (account)"]);

export default function RootLayout() {
  return (
    <AppwriteProvider>
      <InitialLayout />
    </AppwriteProvider>
  );
}

function InitialLayout() {
  const { isLoading, isAuthenticated } = useAppwrite();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inPrivateGroup = segments[0] === "(private)";

    if (isAuthenticated && !inPrivateGroup) {
      console.log("logged in and redirecting to home");
      router.replace("/home");
    } else if (!isAuthenticated) {
      console.log("logged out and redirecting to sign-in");
      router.replace("/sign-in");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return <Slot />;
}
