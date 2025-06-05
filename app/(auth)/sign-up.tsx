import { useAppwrite } from "@/context/AppwriteProvider";
import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SignUp = () => {
  const { register } = useAppwrite();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await register(email, password, name);
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center justify-center p-4">
        <View className="mb-8 items-center">
          <Ionicons name="logo-react" size={64} color="#61DAFB" />
        </View>
        <Text className="mb-8 text-2xl font-bold">Sign Up</Text>

        <View className="w-full space-y-4">
          <Text className="my-1 text-sm font-medium text-gray-700">
            Username
          </Text>
          <TextInput
            className="h-12 w-full rounded-lg border border-gray-300 px-4"
            placeholder="Username"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />

          <Text className="my-1 text-sm font-medium text-gray-700">Email</Text>
          <TextInput
            className="h-12 w-full rounded-lg border border-gray-300 px-4"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text className="my-1 text-sm font-medium text-gray-700">
            Password
          </Text>
          <TextInput
            className="h-12 w-full rounded-lg border border-gray-300 px-4"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            className={cn(
              "mt-3 h-12 w-full items-center justify-center rounded-lg bg-blue-500",
              loading && "opacity-50",
            )}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text className="font-semibold text-white">
              {loading ? "Signing up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            className="mt-4 items-center"
          >
            <Text className="text-blue-500">
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
