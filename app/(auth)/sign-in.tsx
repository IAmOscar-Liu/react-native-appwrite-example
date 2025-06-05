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
import { OAuthProvider } from "react-native-appwrite";

const SignIn = () => {
  const { login, loginWithOAuth } = useAppwrite();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await loginWithOAuth(OAuthProvider.Google);
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to sign in with Google");
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
        <Text className="mb-8 text-2xl font-bold">Sign In</Text>

        <View className="w-full space-y-4">
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
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text className="font-semibold text-white">
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/sign-up")}
            className="mt-4 items-center"
          >
            <Text className="text-blue-500">
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>

          <Text className="mt-2 text-center text-sm text-gray-500">Or</Text>

          <TouchableOpacity
            onPress={handleGoogleSignIn}
            className="mt-2 h-12 w-full flex-row items-center justify-center rounded-lg border border-gray-300 bg-white"
            disabled={loading}
          >
            <Ionicons name="logo-google" size={24} color="#4285F4" />
            <Text className="ml-2 font-medium text-gray-700">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
