import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";
import Toast from "react-native-toast-message";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<"fullName" | "email" | "password" | "confirmPassword" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    if (!fullName.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter your full name.",
      });
      return false;
    }

    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter your email address.",
      });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter a valid email address.",
      });
      return false;
    }

    if (!password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter a password.",
      });
      return false;
    }

    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Password must be at least 6 characters long.",
      });
      return false;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Passwords do not match.",
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (isLoading) return;

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await register(email, password);
      console.log("Registration Success:", res);

      Toast.show({
        type: "success",
        text1: "Registration Successful 🎉",
        text2: "Welcome to Sri Lanka Explorer!",
      });

      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");

      router.replace("/login");
    } catch (err) {
      console.error("Registration error:", err);
      Toast.show({
        type: "error",
        text1: "Registration Failed ❌",
        text2: (err instanceof Error && err.message) ? err.message : "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginPress = () => {
    router.replace("/login");
  };

  const handleGoogleSignUp = () => {
    Toast.show({
      type: "info",
      text1: "Google Sign Up",
      text2: "Google authentication coming soon!",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#059669' }}> {/* emerald-600 */}
      {/* Simplified gradient background */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#059669', // emerald-600
      }} />
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(16, 185, 129, 0.3)', // emerald overlay
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
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View style={{
              width: 88,
              height: 88,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 44,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}>
              <Text style={{ fontSize: 40, color: '#fff' }}>🌟</Text>
            </View>
            <Text style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Join Sri Lanka Explorer
            </Text>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '500',
            }}>
              Start your adventure today
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
            {/* Full Name Input */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 14,
                fontWeight: '500',
                marginBottom: 8,
                marginLeft: 4,
              }}>
                Full Name
              </Text>
              <TextInput
                placeholder="Enter your full name"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderWidth: 2,
                  borderColor: focusedField === 'fullName' 
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
                value={fullName}
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={setFullName}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Email Input */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 14,
                fontWeight: '500',
                marginBottom: 8,
                marginLeft: 4,
              }}>
                Email Address
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
              <View style={{ position: 'relative' }}>
                <TextInput
                  placeholder="Create a password"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 2,
                    borderColor: focusedField === 'password' 
                      ? 'rgba(255, 255, 255, 0.6)' 
                      : 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    paddingRight: 50,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '500',
                  }}
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  secureTextEntry={!showPassword}
                  value={password}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: 18,
                  }}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: 14,
                fontWeight: '500',
                marginBottom: 8,
                marginLeft: 4,
              }}>
                Confirm Password
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  placeholder="Confirm your password"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 2,
                    borderColor: focusedField === 'confirmPassword' 
                      ? 'rgba(255, 255, 255, 0.6)' 
                      : 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    paddingRight: 50,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '500',
                  }}
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: 18,
                  }}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                >
                  <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
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
                marginBottom: 20,
              }}
              onPress={handleRegister}
              activeOpacity={0.9}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <ActivityIndicator color="#059669" size="small" />
                  <Text style={{
                    marginLeft: 8,
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#374151',
                    fontWeight: 'bold',
                  }}>
                    Creating Account...
                  </Text>
                </View>
              ) : (
                <Text style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#374151',
                  fontWeight: 'bold',
                }}>
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
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

            {/* Social Sign Up */}
            <TouchableOpacity
              onPress={handleGoogleSignUp}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 12,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.8}
            >
              <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
                🔐 Sign up with Google
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <TouchableOpacity
            onPress={handleLoginPress}
            style={{ marginTop: 32, alignItems: 'center' }}
            activeOpacity={0.7}
          >
            <Text style={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 18,
              fontWeight: '500',
            }}>
              Already have an account?{' '}
              <Text style={{
                fontWeight: 'bold',
                color: '#fff',
                textDecorationLine: 'underline',
              }}>
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Terms Text */}
          <Text style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 14,
            fontWeight: '400',
            marginTop: 20,
            paddingHorizontal: 20,
            lineHeight: 20,
          }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Text>

          {/* Decorative Elements */}
          <View style={{
            position: 'absolute',
            top: 60,
            left: 20,
            width: 6,
            height: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 3,
          }} />
          <View style={{
            position: 'absolute',
            top: 100,
            right: 28,
            width: 4,
            height: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: 2,
          }} />
          <View style={{
            position: 'absolute',
            bottom: 140,
            left: 28,
            width: 8,
            height: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 4,
          }} />
          <View style={{
            position: 'absolute',
            bottom: 200,
            right: 20,
            width: 6,
            height: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: 3,
          }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast />
    </SafeAreaView>
  );
};

export default Register;