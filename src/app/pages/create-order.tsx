import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const fabrics = ['Luxury French Lace', 'Premium Aso-Oke', 'Beautiful Ankara', 'Silk Chiffon'];
const styles = ['Elegant Lace', 'Aso-Ebi Style', 'Classic Ankara', 'Modern Two-Piece'];

export default function CreateOrderScreen() {
  const [fabric, setFabric] = useState(fabrics[0]);
  const [style, setStyle] = useState(styles[0]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SafeAreaView style={pageStyles.container}>
        <View style={pageStyles.successCard}>
          <Text style={pageStyles.successIcon}>✓</Text>
          <Text style={pageStyles.title}>Request received</Text>
          <Text style={pageStyles.subtitle}>We will contact you with a quote for your {fabric} {style.toLowerCase()}.</Text>
          <Pressable style={pageStyles.primaryButton} onPress={() => router.replace('/')}><Text style={pageStyles.primaryText}>Back to Home</Text></Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={pageStyles.container}>
      <View style={pageStyles.header}>
        <Pressable style={pageStyles.backButton} onPress={() => router.back()}><Text style={pageStyles.backText}>‹</Text></Pressable>
        <Text style={pageStyles.headerTitle}>Create Your Look</Text>
        <View style={pageStyles.spacer} />
      </View>
      <ScrollView contentContainerStyle={pageStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={pageStyles.title}>Design something beautiful</Text>
        <Text style={pageStyles.subtitle}>Choose a fabric and style. We will help bring your idea to life.</Text>

        <Text style={pageStyles.label}>Choose a fabric</Text>
        <View style={pageStyles.options}>
          {fabrics.map((item) => <Pressable key={item} onPress={() => setFabric(item)} style={[pageStyles.option, fabric === item && pageStyles.optionSelected]}><Text style={[pageStyles.optionText, fabric === item && pageStyles.optionTextSelected]}>{item}</Text></Pressable>)}
        </View>

        <Text style={pageStyles.label}>Choose a style</Text>
        <View style={pageStyles.options}>
          {styles.map((item) => <Pressable key={item} onPress={() => setStyle(item)} style={[pageStyles.option, style === item && pageStyles.optionSelected]}><Text style={[pageStyles.optionText, style === item && pageStyles.optionTextSelected]}>{item}</Text></Pressable>)}
        </View>

        <Text style={pageStyles.label}>Tell us more (optional)</Text>
        <TextInput value={notes} onChangeText={setNotes} multiline maxLength={400} textAlignVertical="top" placeholder="Color, measurements, occasion, or any details..." placeholderTextColor="#9B8B92" style={pageStyles.notes} />
        <Pressable style={pageStyles.primaryButton} onPress={() => setSubmitted(true)}><Text style={pageStyles.primaryText}>Request Custom Quote</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const pageStyles = StyleSheet.create({
  container: { backgroundColor: '#FFF9F6', flex: 1 }, header: { alignItems: 'center', flexDirection: 'row', height: 64, justifyContent: 'space-between', paddingHorizontal: 20 }, backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 21, elevation: 2, height: 42, justifyContent: 'center', width: 42 }, backText: { color: '#6B2145', fontSize: 32, marginTop: -4 }, headerTitle: { color: '#6B2145', fontSize: 20, fontWeight: '800' }, spacer: { width: 42 }, content: { paddingBottom: 40, paddingHorizontal: 20, paddingTop: 24 }, title: { color: '#292929', fontSize: 27, fontWeight: '900' }, subtitle: { color: '#777', fontSize: 13, lineHeight: 20, marginTop: 8 }, label: { color: '#333', fontSize: 15, fontWeight: '800', marginBottom: 11, marginTop: 26 }, options: { gap: 10 }, option: { backgroundColor: '#FFFFFF', borderColor: '#E8DDE2', borderRadius: 13, borderWidth: 1, padding: 15 }, optionSelected: { backgroundColor: '#6B2145', borderColor: '#6B2145' }, optionText: { color: '#555', fontSize: 13, fontWeight: '700' }, optionTextSelected: { color: '#FFFFFF' }, notes: { backgroundColor: '#FFFFFF', borderColor: '#E8DDE2', borderRadius: 14, borderWidth: 1, color: '#333', fontSize: 13, height: 120, padding: 14 }, primaryButton: { alignItems: 'center', backgroundColor: '#6B2145', borderRadius: 14, marginTop: 24, paddingVertical: 15 }, primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' }, successCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 22, elevation: 2, margin: 20, marginTop: 120, padding: 30 }, successIcon: { backgroundColor: '#6B2145', borderRadius: 30, color: '#FFFFFF', fontSize: 32, height: 60, lineHeight: 60, overflow: 'hidden', textAlign: 'center', width: 60 },
});
