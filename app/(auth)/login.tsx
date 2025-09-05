import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (isLoading) return;

    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      console.log("Login Success:", res);
      router.push("/home"); // navigate to home
    } catch (err) {
      console.error(err);
      Alert.alert("Login failed", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center p-4"
      >
        <View className="mb-8">
          <Text className="text-3xl font-bold text-blue-600 text-center mb-6">
            Login to SriLanka Secrets
          </Text>

          <TextInput
            placeholder="Email"
            className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 text-gray-900"
            placeholderTextColor="#9CA3AF"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            className="bg-white border border-gray-300 rounded px-4 py-3 mb-4 text-gray-900"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="bg-blue-500 p-4 rounded mt-2"
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text className="text-center text-2xl text-white">Login</Text>
            )}
          </TouchableOpacity>

          <Pressable
            onPress={() => router.push("/register")}
            className="mt-4"
          >
            <Text className="text-center text-blue-500 text-lg">
              Don't have an account? Register
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
