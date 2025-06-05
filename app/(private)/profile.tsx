import { useAppwrite } from "@/context/AppwriteProvider";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const { logout, user } = useAppwrite();

  const handleLogout = async () => {
    logout().catch((error: any) => {
      Alert.alert("Error", error?.message || "Failed to logout");
    });
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="mb-8 items-center">
        <Text className="text-2xl font-bold">Profile</Text>
        <Text className="mt-4 text-gray-600">Name: {user?.name || "N/A"}</Text>
        <Text className="mt-2 text-gray-600">
          Email: {user?.email || "N/A"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="rounded-md bg-blue-500 px-4 py-2"
      >
        <Text className="text-white">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
