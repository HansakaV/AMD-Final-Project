import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);

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
      router.push("/home");
    } catch (err) {
      console.error(err);
      Alert.alert("Login failed", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    Alert.alert("Forgot Password", "Password reset functionality coming soon!");
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic
    Alert.alert("Google Sign In", "Google authentication coming soon!");
  };

  const handleSignUpPress = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#4f46e5' }}>
      {/* Simplified gradient background */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#4f46e5', // indigo-600
      }} />
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(147, 51, 234, 0.3)', // purple overlay
      }} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ 
            flexGrow: 1, 
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingVertical: 20,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={{ alignItems: 'center', marginBottom: 48 }}>
            <View style={{
              width: 96,
              height: 96,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 48,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}>
              <Text style={{ fontSize: 48, color: '#fff' }}>🏝️</Text>
            </View>
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Welcome Back
            </Text>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '500',
            }}>
              Discover Sri Lanka's hidden gems
            </Text>
          </View>

          {/* Form Container */}
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 24,
            padding: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 12,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}>
            {/* Email Input */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 14,
                fontWeight: '500',
                marginBottom: 8,
                marginLeft: 4,
              }}>
                Email
              </Text>
              <TextInput
                placeholder="Enter your email"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderWidth: 2,
                  borderColor: focusedField === 'email' 
                    ? 'rgba(255, 255, 255, 0.6)' 
                    : 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '500',
                }}
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 14,
                fontWeight: '500',
                marginBottom: 8,
                marginLeft: 4,
              }}>
                Password
              </Text>
              <TextInput
                placeholder="Enter your password"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderWidth: 2,
                  borderColor: focusedField === 'password' 
                    ? 'rgba(255, 255, 255, 0.6)' 
                    : 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '500',
                }}
                placeholderTextColor="rgba(255,255,255,0.7)"
                secureTextEntry
                value={password}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
              onPress={handleForgotPassword}
              style={{ alignSelf: 'flex-end', marginBottom: 24 }}
              activeOpacity={0.7}
            >
              <Text style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 16,
                fontWeight: '500',
              }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                paddingVertical: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
                opacity: isLoading ? 0.7 : 1,
              }}
              onPress={handleLogin}
              activeOpacity={0.9}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <ActivityIndicator color="#6366f1" size="small" />
                  <Text style={{
                    marginLeft: 8,
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#374151',
                    fontWeight: 'bold',
                  }}>
                    Signing in...
                  </Text>
                </View>
              ) : (
                <Text style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#374151',
                  fontWeight: 'bold',
                }}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 24,
            }}>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }} />
              <Text style={{
                marginHorizontal: 16,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 16,
                fontWeight: '500',
              }}>
                or
              </Text>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }} />
            </View>

            {/* Social Login */}
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 12,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
              activeOpacity={0.8}
            >
              <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
                🔐 Continue with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <TouchableOpacity
            onPress={handleSignUpPress}
            style={{ marginTop: 32, alignItems: 'center' }}
            activeOpacity={0.7}
          >
            <Text style={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 18,
              fontWeight: '500',
            }}>
              Don't have an account?{' '}
              <Text style={{
                fontWeight: 'bold',
                color: '#fff',
                textDecorationLine: 'underline',
              }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Decorative Elements */}
          <View style={{
            position: 'absolute',
            top: 80,
            left: 16,
            width: 8,
            height: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 4,
          }} />
          <View style={{
            position: 'absolute',
            top: 128,
            right: 32,
            width: 4,
            height: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: 2,
          }} />
          <View style={{
            position: 'absolute',
            bottom: 160,
            left: 32,
            width: 6,
            height: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
          }} />
          <View style={{
            position: 'absolute',
            bottom: 240,
            right: 16,
            width: 8,
            height: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 4,
          }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;