import { Stack } from "expo-router";

const PrivateLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default PrivateLayout;
