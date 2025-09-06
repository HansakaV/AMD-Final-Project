import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Alert,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { addPlace, getAllPlace, deletePlace, updatePlace } from '@/services/taskService';
import { Task } from '@/types/task';

const { width: screenWidth } = Dimensions.get('window');

const Places = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Task | null>(null);
  
  // Add form states
  const [addTitle, setAddTitle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addImageUrl, setAddImageUrl] = useState('');
  
  // Update form states
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateImageUrl, setUpdateImageUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<Task[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      setFetchLoading(true);
      const allPlaces = await getAllPlace();
      setPlaces(allPlaces);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleAddPlace = async () => {
    if (!addTitle.trim() || !addDescription.trim()) {
      Alert.alert('Error', 'Please fill in both title and description');
      return;
    }

    try {
      setLoading(true);
      const newPlace = {
        title: addTitle.trim(),
        description: addDescription.trim(),
        imageUrl: addImageUrl.trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      await addPlace(newPlace);
      
      // Reset add form
      setAddTitle('');
      setAddDescription('');
      setAddImageUrl('');
      setAddModalVisible(false);
      
      // Refresh places list
      await fetchPlaces();
      
      Alert.alert('Success', 'Place added successfully!');
    } catch (error) {
      console.error('Error adding place:', error);
      Alert.alert('Error', 'Failed to add place. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlace = async () => {
    if (!updateTitle.trim() || !updateDescription.trim() || !selectedPlace) {
      Alert.alert('Error', 'Please fill in both title and description');
      return;
    }

    try {
      setLoading(true);
      const updatedPlace = {
        ...selectedPlace,
        title: updateTitle.trim(),
        description: updateDescription.trim(),
        imageUrl: updateImageUrl.trim() || undefined,
        updatedAt: new Date().toISOString(),
      };

      await updatePlace(selectedPlace.id, updatedPlace);
      
      // Close modal and reset states
      setUpdateModalVisible(false);
      setSelectedPlace(null);
      setUpdateTitle('');
      setUpdateDescription('');
      setUpdateImageUrl('');
      
      // Refresh places list
      await fetchPlaces();
      
      Alert.alert('Success', 'Place updated successfully!');
    } catch (error) {
      console.error('Error updating place:', error);
      Alert.alert('Error', 'Failed to update place. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlace = (id: string, title: string) => {
    Alert.alert(
      'Delete Place',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePlace(id);
              await fetchPlaces();
              Alert.alert('Success', 'Place deleted successfully!');
            } catch (error) {
              console.error('Error deleting place:', error);
              Alert.alert('Error', 'Failed to delete place. Please try again.');
            }
          }
        },
      ]
    );
  };

  const openUpdateModal = (place: Task) => {
    setSelectedPlace(place);
    setUpdateTitle(place.title);
    setUpdateDescription(place.description);
    setUpdateImageUrl(place.imageUrl || '');
    setUpdateModalVisible(true);
  };

  const closeAddModal = () => {
    setAddTitle('');
    setAddDescription('');
    setAddImageUrl('');
    setAddModalVisible(false);
  };

  const closeUpdateModal = () => {
    setUpdateTitle('');
    setUpdateDescription('');
    setUpdateImageUrl('');
    setSelectedPlace(null);
    setUpdateModalVisible(false);
  };

  if (fetchLoading) {
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
        <Text style={styles.title}>Manage Places</Text>
        <Text style={styles.subtitle}>Add, edit, and organize your places</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Place</Text>
        </TouchableOpacity>
      </View>

      {places.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>📍</Text>
          </View>
          <Text style={styles.emptyTitle}>No places added yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap "Add Place" to create your first place!
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
                  <Text style={styles.placeDescription} numberOfLines={3}>
                    {place.description}
                  </Text>
                  
                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.updateButton}
                      onPress={() => openUpdateModal(place)}
                    >
                      <Text style={styles.updateButtonText}>✏️ Edit</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeletePlace(place.id, place.title)}
                    >
                      <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <View style={styles.cardAccent} />
            </View>
          ))}
          
          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}

      {/* Add Place Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={closeAddModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Place</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter place title"
                value={addTitle}
                onChangeText={setAddTitle}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Enter place description"
                value={addDescription}
                onChangeText={setAddDescription}
                multiline={true}
                textAlignVertical="top"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Image URL (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter image URL"
                value={addImageUrl}
                onChangeText={setAddImageUrl}
                keyboardType="url"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeAddModal}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.confirmButton, loading && styles.disabledButton]}
                onPress={handleAddPlace}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.confirmButtonText}>Add Place</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Update Place Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={closeUpdateModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Place</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter place title"
                value={updateTitle}
                onChangeText={setUpdateTitle}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Enter place description"
                value={updateDescription}
                onChangeText={setUpdateDescription}
                multiline={true}
                textAlignVertical="top"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Image URL (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter image URL"
                value={updateImageUrl}
                onChangeText={setUpdateImageUrl}
                keyboardType="url"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeUpdateModal}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.confirmButton, loading && styles.disabledButton]}
                onPress={handleUpdatePlace}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.confirmButtonText}>Update Place</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
    shadowOffset: { width: 0, height: 2 },
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
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
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
    justifyContent: 'space-between',
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
    marginBottom: 12,
    flex: 1,
  },
  
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  
  updateButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
  },
  
  updateButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
  },
  
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
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
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    width: screenWidth * 0.9,
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 24,
  },
  
  inputGroup: {
    marginBottom: 20,
  },
  
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  
  cancelButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
  },
  
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  confirmButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
  },
  
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  disabledButton: {
    backgroundColor: '#93C5FD',
  },
  
  bottomSpacing: {
    height: 20,
  },
});

export default Places;