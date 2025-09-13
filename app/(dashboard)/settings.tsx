import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Alert,
  Modal,
  Linking,
} from 'react-native';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [techModalVisible, setTechModalVisible] = useState(false);

  interface HandleThemeChange {
    (value: boolean): void;
  }

  const handleThemeChange: HandleThemeChange = (value) => {
    setDarkMode(value);
    // Here you would typically update your app's theme context
    Alert.alert(
      'Theme Changed',
      `Switched to ${value ? 'Dark' : 'Light'} mode`,
      [{ text: 'OK' }]
    );
  };

  interface HandleNotificationChange {
    (value: boolean): void;
  }

  const handleNotificationChange: HandleNotificationChange = (value) => {
    setNotifications(value);
    Alert.alert(
      'Notifications',
      `Notifications ${value ? 'enabled' : 'disabled'}`,
      [{ text: 'OK' }]
    );
  };

  interface HandleSwitchChange {
    (value: boolean): void;
  }

  const handleLocationChange: HandleSwitchChange = (value) => {
    setLocationServices(value);
    Alert.alert(
      'Location Services',
      `Location services ${value ? 'enabled' : 'disabled'}`,
      [{ text: 'OK' }]
    );
  };

  interface SocialPressParams {
    platform: string;
    url: string;
  }

  const handleSocialPress = (platform: SocialPressParams['platform'], url: SocialPressParams['url']): void => {
    Alert.alert(
      `Open ${platform}`,
      `Would you like to open ${platform}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => Linking.openURL(url) }
      ]
    );
  };

  interface SettingItemProps {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }

  const SettingItem: React.FC<SettingItemProps> = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 20,
        marginVertical: 6,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </View>
      
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#fff',
          marginBottom: 2,
        }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            {subtitle}
          </Text>
        )}
      </View>
      
      {rightComponent || (
        <Text style={{
          fontSize: 16,
          color: 'rgba(255, 255, 255, 0.6)',
        }}>
          ›
        </Text>
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginHorizontal: 24,
      marginTop: 32,
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: 1,
    }}>
      {title}
    </Text>
  );

  const AboutModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={aboutModalVisible}
      onRequestClose={() => setAboutModalVisible(false)}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 24,
          margin: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          maxHeight: '80%',
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: 20,
            }}>
              About Sri Lanka Explorer 🏝️
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: '#666',
              lineHeight: 24,
              marginBottom: 16,
              textAlign: 'center',
            }}>
              Discover the beauty of Sri Lanka with our comprehensive travel companion app.
            </Text>
            
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                ✨ Features:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • Explore hidden gems and popular destinations{'\n'}
                • Interactive maps with offline support{'\n'}
                • Cultural insights and local recommendations{'\n'}
                • Weather forecasts and travel tips{'\n'}
                • Photo sharing and travel journaling
              </Text>
            </View>
            
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                📱 Version: 1.0.0
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                Released: September 2025
              </Text>
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#888',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              Made with ❤️ for Sri Lanka travelers
            </Text>
          </ScrollView>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#4f46e5',
              borderRadius: 12,
              paddingVertical: 12,
              marginTop: 20,
            }}
            onPress={() => setAboutModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const TechnologiesModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={techModalVisible}
      onRequestClose={() => setTechModalVisible(false)}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 24,
          margin: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          maxHeight: '80%',
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: 20,
            }}>
              Technologies Used 🚀
            </Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                📱 Frontend:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • React Native - Cross-platform mobile development{'\n'}
                • Expo Router - Navigation and routing{'\n'}
                • TypeScript - Type-safe development{'\n'}
                • Tailwind CSS - Utility-first styling
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                🔧 Tools & Libraries:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • React Hooks - State management{'\n'}
                • AsyncStorage - Local data persistence{'\n'}
                • React Native Maps - Interactive mapping{'\n'}
                • Toast Notifications - User feedback{'\n'}
                • Vector Icons - Beautiful iconography
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                🌐 Backend & Services:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • REST API - Data communication{'\n'}
                • Firebase - Authentication & Cloud services{'\n'}
                • Google Maps API - Location services{'\n'}
                • Weather API - Real-time weather data
              </Text>
            </View>
            
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 }}>
                🎨 Design:
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                • Figma - UI/UX design{'\n'}
                • Material Design - Design principles{'\n'}
                • Custom animations - Enhanced user experience{'\n'}
                • Responsive design - Multi-device support
              </Text>
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#888',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              Built with modern technologies for the best user experience
            </Text>
          </ScrollView>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#059669',
              borderRadius: 12,
              paddingVertical: 12,
              marginTop: 20,
            }}
            onPress={() => setTechModalVisible(false)}
            activeOpacity={0.8}
          >
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '600',
            }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#4f46e5' }}>
      {/* Background */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#4f46e5',
      }} />
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(147, 51, 234, 0.3)',
      }} />

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 32,
          paddingHorizontal: 20,
        }}>
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Text style={{ fontSize: 36 }}>⚙️</Text>
          </View>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}>
            Settings
          </Text>
          <Text style={{
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            marginTop: 4,
          }}>
            Customize your experience
          </Text>
        </View>

        {/* Preferences Section */}
        <SectionHeader title="Preferences" />
        
        <SettingItem
          icon="🌙"
          title="Dark Mode"
          subtitle={darkMode ? "Dark theme enabled" : "Light theme enabled"}
          rightComponent={
            <Switch
              value={darkMode}
              onValueChange={handleThemeChange}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#059669' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          }
        />
        
        <SettingItem
          icon="🔔"
          title="Notifications"
          subtitle={notifications ? "Receive updates and alerts" : "Notifications disabled"}
          rightComponent={  
            <Switch
              value={notifications}
              onValueChange={handleNotificationChange}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#059669' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          }
        />
        
        <SettingItem
          icon="📍"
          title="Location Services"
          subtitle={locationServices ? "Access to location enabled" : "Location access disabled"}
          rightComponent={
            <Switch
              value={locationServices}
              onValueChange={handleLocationChange}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#059669' }}
              thumbColor={locationServices ? '#fff' : '#f4f3f4'}
            />
          }
        />

        {/* Account Section */}
        <SectionHeader title="Account" />
        
        <SettingItem
          icon="👤"
          title="Profile"
          subtitle="Manage your account details"
          onPress={() => Alert.alert('Profile', 'Profile settings coming soon!')}
        />
        
        <SettingItem
          icon="🔒"
          title="Privacy & Security"
          subtitle="Control your privacy settings"
          onPress={() => Alert.alert('Privacy', 'Privacy settings coming soon!')}
        />
        
        <SettingItem
          icon="💾"
          title="Data & Storage"
          subtitle="Manage app data and storage"
          onPress={() => Alert.alert('Storage', 'Storage settings coming soon!')}
        />

        {/* About Section */}
        <SectionHeader title="Information" />
        
        <SettingItem
          icon="ℹ️"
          title="About"
          subtitle="Learn more about Sri Lanka Explorer"
          onPress={() => setAboutModalVisible(true)}
        />
        
        <SettingItem
          icon="🔧"
          title="Technologies"
          subtitle="View technologies used in this app"
          onPress={() => setTechModalVisible(true)}
        />
        
        <SettingItem
          icon="📱"
          title="Version"
          subtitle="1.0.0 - Latest version"
          onPress={() => Alert.alert('Version', 'You are using the latest version!')}
        />

        {/* Social Section */}
        <SectionHeader title="Connect" />
        
        <SettingItem
          icon="🐦"
          title="Twitter"
          subtitle="Follow us for updates"
          onPress={() => handleSocialPress('Twitter', 'https://twitter.com')}
        />
        
        <SettingItem
          icon="💼"
          title="LinkedIn"
          subtitle="Connect with our team"
          onPress={() => handleSocialPress('LinkedIn', 'https://linkedin.com')}
        />
        
        <SettingItem
          icon="💻"
          title="GitHub"
          subtitle="View source code"
          onPress={() => handleSocialPress('GitHub', 'https://github.com/hansakaV')}
        />

        {/* Support Section */}
        <SectionHeader title="Support" />
        
        <SettingItem
          icon="💬"
          title="Contact Support"
          subtitle="Get help with the app"
          onPress={() => Alert.alert('Support', 'Contact support: support@srilankaexplorer.com')}
        />
        
        <SettingItem
          icon="⭐"
          title="Rate App"
          subtitle="Rate us on the App Store"
          onPress={() => Alert.alert('Rate App', 'Thank you for considering rating our app!')}
        />
        
        <SettingItem
          icon="🚪"
          title="Sign Out"
          subtitle="Sign out of your account"
          onPress={() => Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Sign Out', style: 'destructive', onPress: () => Alert.alert('Signed Out', 'You have been signed out.') }
            ]
          )}
        />

        {/* Footer */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 32,
          paddingHorizontal: 40,
        }}>
          <Text style={{
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            lineHeight: 20,
          }}>
            Made with ❤️ in Sri Lanka{'\n'}
            © 2025 Sri Lanka Explorer
          </Text>
        </View>
      </ScrollView>

      {/* Modals */}
      <AboutModal />
      <TechnologiesModal />
    </SafeAreaView>
  );
};

export default SettingsScreen;