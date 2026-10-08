import React from 'react';
// Cart tab route.
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';

export default function AddToCartScreen() {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = items.length > 0 ? 3000 : 0;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Shopping Cart</Text>

          <Text style={styles.subtitle}>
            {items.length}{' '}
            {items.length === 1 ? 'item' : 'items'} in your cart
          </Text>
        </View>

        {/* CART ITEMS */}
        {items.length > 0 ? (
          <>
            {items.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                <Image
                  source={item.image}
                  style={styles.productImage}
                />

                <View style={styles.productDetails}>
                  <Text style={styles.productName}>
                    {item.name}
                  </Text>

                  <Text style={styles.productCategory}>{item.category}</Text>

                  <Text style={styles.productPrice}>
                    ₦{item.price.toLocaleString()}
                  </Text>

                  <View style={styles.bottomRow}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        <Text style={styles.quantityText}>
                          −
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.quantity}>
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        <Text style={styles.quantityText}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                    >
                      <Text style={styles.removeText}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* ORDER SUMMARY */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>
                Order Summary
              </Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Subtotal
                </Text>

                <Text style={styles.summaryValue}>
                  ₦{subtotal.toLocaleString()}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Delivery
                </Text>

                <Text style={styles.summaryValue}>
                  ₦{deliveryFee.toLocaleString()}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>
                  Total
                </Text>

                <Text style={styles.totalValue}>
                  ₦{total.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* CHECKOUT */}
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                console.log('CHECKOUT BUTTON PRESSED');
              }}
            >
              <Text style={styles.checkoutText}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>

            {/* CONTINUE SHOPPING */}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => router.push('/pages/shop')}
            >
              <Text style={styles.continueText}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          /* EMPTY CART */
          <View style={styles.emptyCart}>
            <Text style={styles.emptyIcon}>🛍️</Text>

            <Text style={styles.emptyTitle}>
              Your cart is empty
            </Text>

            <Text style={styles.emptyDescription}>
              You haven't added any products to your cart yet.
            </Text>

            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => router.push('/pages/shop')}
            >
              <Text style={styles.shopButtonText}>
                Start Shopping
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFF9F6',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  backText: {
    fontSize: 32,
    color: '#6B2145',
    marginTop: -4,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#6B2145',
  },

  headerSpace: {
    width: 42,
  },

  titleSection: {
    marginTop: 15,
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: '900',
    color: '#292929',
  },

  subtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
  },

  cartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 15,
    elevation: 2,
  },

  productImage: {
    width: 105,
    height: 125,
    borderRadius: 13,
    resizeMode: 'cover',
  },

  productDetails: {
    flex: 1,
    marginLeft: 13,
    paddingVertical: 2,
  },

  productName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#333',
  },

  productCategory: {
    fontSize: 10,
    color: '#9A6680',
    marginTop: 4,
  },

  productPrice: {
    fontSize: 15,
    fontWeight: '900',
    color: '#6B2145',
    marginTop: 8,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5E5EC',
    borderRadius: 10,
    overflow: 'hidden',
  },

  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B2145',
  },

  quantity: {
    fontSize: 13,
    fontWeight: '800',
    color: '#333',
    minWidth: 25,
    textAlign: 'center',
  },

  removeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A33B5D',
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 18,
    marginTop: 8,
  },

  summaryTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#333',
    marginBottom: 15,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  summaryLabel: {
    fontSize: 12,
    color: '#777',
  },

  summaryValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: '900',
    color: '#333',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#6B2145',
  },

  checkoutButton: {
    backgroundColor: '#6B2145',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  continueButton: {
    borderWidth: 1,
    borderColor: '#6B2145',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  continueText: {
    color: '#6B2145',
    fontSize: 12,
    fontWeight: '800',
  },

  emptyCart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    marginTop: 20,
  },

  emptyIcon: {
    fontSize: 50,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
    marginTop: 15,
  },

  emptyDescription: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 7,
  },

  shopButton: {
    backgroundColor: '#6B2145',
    borderRadius: 13,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginTop: 20,
  },

  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
