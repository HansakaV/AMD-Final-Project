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
import { register } from "@/services/authService";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (isLoading) return;

    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await register(email, password);
      console.log("Registration Success:", res);
      Alert.alert("Success", "Registration completed successfully!");
      router.back(); // Navigate back to login
    } catch (err) {
      console.error(err);
      Alert.alert("Registration Failed", "Something went wrong. Please try again.");
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
            Register
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
            className="bg-green-600 p-4 rounded mt-2"
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text className="text-center text-2xl text-white">Register</Text>
            )}
          </TouchableOpacity>

          <Pressable onPress={() => router.back()} className="mt-4">
            <Text className="text-center text-blue-500 text-lg">
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
