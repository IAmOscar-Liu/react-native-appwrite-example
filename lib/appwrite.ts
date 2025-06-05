import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  ID,
  OAuthProvider,
} from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("com.appwrite.example");

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function loginWithOAuth(provider: OAuthProvider) {
  try {
    const redirectUri = Linking.createURL("/");
    console.log("redirectUri", redirectUri);

    const response = account.createOAuth2Token(provider, redirectUri);

    if (!response)
      return {
        success: false,
        error: `Failed to create ${provider.toString()} token`,
      };

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri,
    );

    if (browserResult.type !== "success") {
      console.log("browserResult: " + browserResult.type);
      return {
        success: false,
        error: `Failed to login with ${provider.toString()}`,
      };
    }
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) {
      return { success: false, error: `Invalid ${provider.toString()} token` };
    }

    const session = await account.createSession(userId, secret);
    if (!session) {
      return { success: false, error: "Failed to create session" };
    }

    return { success: true, data: session };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : `Failed to login with ${provider.toString()}`,
    };
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to login",
    };
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to logout",
    };
  }
}

export async function register(email: string, password: string, name: string) {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    if (error instanceof AppwriteException && error.code === 409) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to register",
    };
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
