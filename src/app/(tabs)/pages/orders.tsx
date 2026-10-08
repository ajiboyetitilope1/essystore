import { useState } from 'react';
// Orders tab route.
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const stages = [
  ['Order confirmed', 'We received your order.', true],
  ['In production', 'Your fabrics are being prepared.', true],
  ['Ready for delivery', 'Your order will be handed to our rider next.', false],
  ['Delivered', 'Enjoy your ESSY STORE order.', false],
] as const;

export default function OrdersScreen() {
  const [orderNumber, setOrderNumber] = useState('ES-2026-014');
  const [hasSearched, setHasSearched] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Where is your order?</Text>
        <Text style={styles.subtitle}>Enter your order number to see its latest progress.</Text>

        <View style={styles.searchRow}>
          <TextInput
            value={orderNumber}
            onChangeText={setOrderNumber}
            autoCapitalize="characters"
            placeholder="e.g. ES-2026-014"
            placeholderTextColor="#9B8B92"
            style={styles.orderInput}
          />
          <Pressable style={styles.trackButton} onPress={() => setHasSearched(true)}>
            <Text style={styles.trackButtonText}>Track</Text>
          </Pressable>
        </View>

        {hasSearched && (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderNumber}>Order {orderNumber || 'ES-2026-014'}</Text>
                <Text style={styles.orderDate}>Placed 16 September 2026</Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>In production</Text>
              </View>
            </View>

            <View style={styles.divider} />
            {stages.map(([title, description, complete], index) => (
              <View key={title} style={styles.stage}>
                <View style={styles.stageRail}>
                  <View style={[styles.dot, complete && styles.dotComplete]}>
                    <Text style={styles.dotText}>{complete ? '✓' : String(index + 1)}</Text>
                  </View>
                  {index < stages.length - 1 && <View style={[styles.line, complete && styles.lineComplete]} />}
                </View>
                <View style={styles.stageCopy}>
                  <Text style={[styles.stageTitle, complete && styles.stageTitleComplete]}>{title}</Text>
                  <Text style={styles.stageDescription}>{description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9F6' },
  header: { alignItems: 'center', flexDirection: 'row', height: 64, justifyContent: 'space-between', paddingHorizontal: 20 },
  backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 21, elevation: 2, height: 42, justifyContent: 'center', width: 42 },
  backText: { color: '#6B2145', fontSize: 32, marginTop: -4 },
  headerTitle: { color: '#6B2145', fontSize: 20, fontWeight: '800' },
  spacer: { width: 42 },
  content: { paddingHorizontal: 20, paddingTop: 28 },
  title: { color: '#292929', fontSize: 27, fontWeight: '900' },
  subtitle: { color: '#777', fontSize: 13, lineHeight: 20, marginTop: 8 },
  searchRow: { flexDirection: 'row', gap: 10, marginTop: 25 },
  orderInput: { backgroundColor: '#FFFFFF', borderColor: '#E8DDE2', borderRadius: 13, borderWidth: 1, color: '#333', flex: 1, fontSize: 14, paddingHorizontal: 14 },
  trackButton: { alignItems: 'center', backgroundColor: '#6B2145', borderRadius: 13, justifyContent: 'center', paddingHorizontal: 19 },
  trackButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  orderCard: { backgroundColor: '#FFFFFF', borderRadius: 18, elevation: 2, marginTop: 25, padding: 18 },
  orderHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  orderNumber: { color: '#333', fontSize: 15, fontWeight: '900' },
  orderDate: { color: '#888', fontSize: 11, marginTop: 5 },
  statusPill: { backgroundColor: '#F5E5EC', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 6 },
  statusText: { color: '#6B2145', fontSize: 10, fontWeight: '800' },
  divider: { backgroundColor: '#EEE', height: 1, marginVertical: 19 },
  stage: { flexDirection: 'row', minHeight: 72 },
  stageRail: { alignItems: 'center', width: 30 },
  dot: { alignItems: 'center', backgroundColor: '#E7DDE1', borderRadius: 12, height: 24, justifyContent: 'center', width: 24 },
  dotComplete: { backgroundColor: '#6B2145' },
  dotText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  line: { backgroundColor: '#E7DDE1', flex: 1, width: 2 },
  lineComplete: { backgroundColor: '#6B2145' },
  stageCopy: { flex: 1, paddingBottom: 20, paddingLeft: 11 },
  stageTitle: { color: '#888', fontSize: 14, fontWeight: '800' },
  stageTitleComplete: { color: '#333' },
  stageDescription: { color: '#888', fontSize: 11, lineHeight: 16, marginTop: 4 },
});
