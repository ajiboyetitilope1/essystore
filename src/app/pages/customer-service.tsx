import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const topics = [
  ['Delivery and tracking', 'Track your order from the Orders tab or contact us with your order number.'],
  ['Returns and exchanges', 'Contact us within 48 hours of delivery and we will help review your request.'],
  ['Custom orders', 'Tell us your fabric, measurements, and preferred style for a custom quote.'],
] as const;

export default function CustomerServiceScreen() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>‹</Text></Pressable>
        <Text style={styles.headerTitle}>Customer Service</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>How can we help?</Text>
        <Text style={styles.subtitle}>Choose a topic or send our support team a message.</Text>

        <View style={styles.topicList}>
          {topics.map(([title, answer], index) => (
            <Pressable key={title} onPress={() => setSelectedTopic(selectedTopic === index ? null : index)} style={styles.topicCard}>
              <View style={styles.topicHeading}>
                <Text style={styles.topicTitle}>{title}</Text>
                <Text style={styles.chevron}>{selectedTopic === index ? '−' : '+'}</Text>
              </View>
              {selectedTopic === index && <Text style={styles.answer}>{answer}</Text>}
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Message support</Text>
        <TextInput value={message} onChangeText={setMessage} multiline maxLength={500} placeholder="Describe what you need help with..." placeholderTextColor="#9B8B92" textAlignVertical="top" style={styles.input} />
        <Pressable disabled={!message.trim()} onPress={() => { setSent(true); setMessage(''); }} style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}>
          <Text style={styles.sendText}>{sent ? 'Message Sent' : 'Send Message'}</Text>
        </Pressable>
        {sent && <Text style={styles.confirmation}>Thanks. Our support team will get back to you soon.</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF9F6', flex: 1 }, header: { alignItems: 'center', flexDirection: 'row', height: 64, justifyContent: 'space-between', paddingHorizontal: 20 },
  backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 21, elevation: 2, height: 42, justifyContent: 'center', width: 42 }, backText: { color: '#6B2145', fontSize: 32, marginTop: -4 }, headerTitle: { color: '#6B2145', fontSize: 20, fontWeight: '800' }, spacer: { width: 42 },
  content: { paddingHorizontal: 20, paddingTop: 28 }, title: { color: '#292929', fontSize: 27, fontWeight: '900' }, subtitle: { color: '#777', fontSize: 13, lineHeight: 20, marginTop: 8 }, topicList: { marginTop: 24 }, topicCard: { backgroundColor: '#FFFFFF', borderRadius: 15, elevation: 1, marginBottom: 10, padding: 16 }, topicHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, topicTitle: { color: '#333', fontSize: 14, fontWeight: '800' }, chevron: { color: '#6B2145', fontSize: 22 }, answer: { color: '#777', fontSize: 12, lineHeight: 18, marginTop: 10 },
  label: { color: '#333', fontSize: 15, fontWeight: '800', marginBottom: 10, marginTop: 20 }, input: { backgroundColor: '#FFFFFF', borderColor: '#E8DDE2', borderRadius: 14, borderWidth: 1, color: '#333', fontSize: 14, height: 120, padding: 14 }, sendButton: { alignItems: 'center', backgroundColor: '#6B2145', borderRadius: 14, marginTop: 14, paddingVertical: 14 }, sendButtonDisabled: { backgroundColor: '#C8AAB8' }, sendText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' }, confirmation: { color: '#379C53', fontSize: 12, marginTop: 11, textAlign: 'center' },
});
