import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const settings = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        className="flex-row items-center gap-2 rounded-lg border border-gray-300 p-4"
        onPress={() => router.push("/profile")}
      >
        <Ionicons name="person" size={24} color="black" />
        <Text className="text-lg font-bold">Account info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default settings;
