import { useState } from 'react';
// Feedback tab route.
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const ratings = [1, 2, 3, 4, 5];

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = rating > 0 && message.trim().length > 0;

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successCard}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.title}>Thank you!</Text>
          <Text style={styles.successText}>Your feedback helps ESSY STORE serve you better.</Text>
          <Pressable style={styles.primaryButton} onPress={() => router.replace('/')}>
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>How was your experience?</Text>
        <Text style={styles.subtitle}>We would love to hear what you think about ESSY STORE.</Text>

        <View style={styles.ratingCard}>
          <Text style={styles.ratingLabel}>Your rating</Text>
          <View style={styles.stars}>
            {ratings.map((value) => (
              <Pressable key={value} onPress={() => setRating(value)} hitSlop={8}>
                <Text style={[styles.star, value <= rating && styles.starSelected]}>★</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.ratingHint}>{rating ? `${rating} out of 5 stars` : 'Tap a star to rate us'}</Text>
        </View>

        <Text style={styles.inputLabel}>Tell us more</Text>
        <TextInput
          multiline
          maxLength={500}
          value={message}
          onChangeText={setMessage}
          placeholder="What did you enjoy? How can we improve?"
          placeholderTextColor="#9B8B92"
          style={styles.messageInput}
          textAlignVertical="top"
        />
        <Text style={styles.counter}>{message.length}/500</Text>

        <Pressable
          disabled={!canSubmit}
          onPress={() => setSubmitted(true)}
          style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}>
          <Text style={styles.primaryButtonText}>Submit Feedback</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F6' },
  header: { height: 64, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', elevation: 2 },
  backText: { fontSize: 32, marginTop: -4, color: '#6B2145' },
  headerTitle: { color: '#6B2145', fontSize: 20, fontWeight: '800' },
  headerSpacer: { width: 42 },
  content: { paddingHorizontal: 20, paddingTop: 28 },
  title: { color: '#292929', fontSize: 27, fontWeight: '900' },
  subtitle: { color: '#777', fontSize: 13, lineHeight: 20, marginTop: 8 },
  ratingCard: { backgroundColor: '#FFFFFF', borderRadius: 18, marginTop: 28, padding: 20, alignItems: 'center', elevation: 2 },
  ratingLabel: { color: '#333', fontSize: 15, fontWeight: '800' },
  stars: { flexDirection: 'row', gap: 8, marginTop: 12 },
  star: { color: '#E7DDE1', fontSize: 38 },
  starSelected: { color: '#F5AE25' },
  ratingHint: { color: '#777', fontSize: 12, marginTop: 8 },
  inputLabel: { color: '#333', fontSize: 15, fontWeight: '800', marginTop: 28, marginBottom: 10 },
  messageInput: { backgroundColor: '#FFFFFF', borderColor: '#E8DDE2', borderRadius: 14, borderWidth: 1, color: '#333', fontSize: 14, height: 150, padding: 15 },
  counter: { alignSelf: 'flex-end', color: '#999', fontSize: 11, marginTop: 6 },
  primaryButton: { alignItems: 'center', backgroundColor: '#6B2145', borderRadius: 14, marginTop: 24, paddingVertical: 15 },
  primaryButtonDisabled: { backgroundColor: '#C8AAB8' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  successCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 22, elevation: 2, margin: 20, marginTop: 120, padding: 32 },
  successIcon: { alignItems: 'center', backgroundColor: '#6B2145', borderRadius: 30, color: '#FFFFFF', fontSize: 32, height: 60, lineHeight: 60, overflow: 'hidden', textAlign: 'center', width: 60 },
  successText: { color: '#777', fontSize: 14, lineHeight: 21, marginTop: 10, textAlign: 'center' },
});
