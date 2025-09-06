import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllPlace } from "@/services/taskService";
import { Task } from "@/types/task";

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {
  const [places, setPlaces] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const allPlaces = await getAllPlace();
      setPlaces(allPlaces);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading places...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Places</Text>
        <Text style={styles.subtitle}>Discover amazing destinations</Text>
      </View>
      
      {places.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>📍</Text>
          </View>
          <Text style={styles.emptyTitle}>No places added yet</Text>
          <Text style={styles.emptySubtitle}>
            Go to Places tab to add your first place!
          </Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {places.map((place, index) => (
            <View key={place.id} style={[styles.card, { marginTop: index === 0 ? 0 : 16 }]}>
              <View style={styles.cardContent}>
                {place.imageUrl && (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: place.imageUrl }}
                      style={styles.placeImage}
                      resizeMode="cover"
                    />
                    <View style={styles.imageOverlay} />
                  </View>
                )}
                
                <View style={styles.textContent}>
                  <Text style={styles.placeTitle} numberOfLines={2}>
                    {place.title}
                  </Text>
                  <Text style={styles.placeDescription} numberOfLines={4}>
                    {place.description}
                  </Text>
                </View>
              </View>
              
              {/* Decorative elements */}
              <View style={styles.cardAccent} />
            </View>
          ))}
          
          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  
  imageContainer: {
    position: 'relative',
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  placeImage: {
    width: screenWidth * 0.25, // 25% of screen width
    height: screenWidth * 0.25, // Square aspect ratio
    minWidth: 80,
    minHeight: 80,
    maxWidth: 120,
    maxHeight: 120,
  },
  
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
  },
  
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  
  placeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 24,
  },
  
  placeDescription: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    fontWeight: '400',
  },
  
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 16,
    width: 4,
    backgroundColor: '#3B82F6',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#64748B',
    fontWeight: '500',
  },
  
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  
  emptyIconText: {
    fontSize: 32,
  },
  
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  emptySubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  bottomSpacing: {
    height: 20,
  },
});

export default Home;