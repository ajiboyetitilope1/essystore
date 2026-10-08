import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Message = { id: number; text: string; from: 'ceo' | 'customer' };

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'ceo', text: 'Hello! Welcome to ESSY STORE. How can I help you today?' },
  ]);

  const sendMessage = () => {
    const text = message.trim();
    if (!text) return;
    setMessages((current) => [...current, { id: Date.now(), from: 'customer', text }]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}><Text style={styles.backText}>‹</Text></Pressable>
        <View style={styles.person}>
          <View style={styles.avatar}><Text style={styles.avatarText}>E</Text></View>
          <View><Text style={styles.headerTitle}>Chat with CEO</Text><Text style={styles.online}>Online</Text></View>
        </View>
        <View style={styles.spacer} />
      </View>

      <View style={styles.messages}>
        <Text style={styles.dayLabel}>Today</Text>
        {messages.map((item) => (
          <View key={item.id} style={[styles.bubble, item.from === 'customer' ? styles.customerBubble : styles.ceoBubble]}>
            <Text style={[styles.bubbleText, item.from === 'customer' && styles.customerBubbleText]}>{item.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.composer}>
        <TextInput value={message} onChangeText={setMessage} placeholder="Write a message..." placeholderTextColor="#9B8B92" style={styles.input} onSubmitEditing={sendMessage} returnKeyType="send" />
        <Pressable onPress={sendMessage} style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}><Text style={styles.sendText}>Send</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF9F6', flex: 1 }, header: { alignItems: 'center', backgroundColor: '#FFFFFF', flexDirection: 'row', height: 72, paddingHorizontal: 16 },
  backButton: { alignItems: 'center', backgroundColor: '#F5E5EC', borderRadius: 20, height: 40, justifyContent: 'center', width: 40 }, backText: { color: '#6B2145', fontSize: 30, marginTop: -3 },
  person: { alignItems: 'center', flex: 1, flexDirection: 'row', marginLeft: 12 }, avatar: { alignItems: 'center', backgroundColor: '#6B2145', borderRadius: 19, height: 38, justifyContent: 'center', width: 38 }, avatarText: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' }, headerTitle: { color: '#333', fontSize: 15, fontWeight: '800' }, online: { color: '#379C53', fontSize: 11, marginTop: 2 }, spacer: { width: 40 },
  messages: { flex: 1, padding: 20 }, dayLabel: { alignSelf: 'center', color: '#888', fontSize: 11, marginBottom: 18 }, bubble: { borderRadius: 16, marginBottom: 10, maxWidth: '82%', paddingHorizontal: 14, paddingVertical: 11 }, ceoBubble: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF' }, customerBubble: { alignSelf: 'flex-end', backgroundColor: '#6B2145' }, bubbleText: { color: '#333', fontSize: 13, lineHeight: 19 }, customerBubbleText: { color: '#FFFFFF' },
  composer: { alignItems: 'center', backgroundColor: '#FFFFFF', flexDirection: 'row', gap: 10, padding: 14 }, input: { backgroundColor: '#F8F1F4', borderRadius: 22, color: '#333', flex: 1, fontSize: 13, paddingHorizontal: 16, paddingVertical: 11 }, sendButton: { backgroundColor: '#6B2145', borderRadius: 21, paddingHorizontal: 17, paddingVertical: 12 }, sendButtonDisabled: { backgroundColor: '#C8AAB8' }, sendText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
});
