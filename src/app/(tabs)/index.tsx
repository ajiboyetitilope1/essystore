import React from 'react';
// Home tab route.
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '@/context/CartContext';

const products = [
  {
    id: 1,
    name: 'Luxury French Lace',
    price: '₦45,000',
    image: require('@/assets/images/essy.jpg'),
  },
  {
    id: 2,
    name: 'Premium Aso-Oke',
    price: '₦35,000',
    image: require('@/assets/images/essy.jpg'),
  },
  {
    id: 3,
    name: 'Beautiful Ankara',
    price: '₦25,000',
    image: require('@/assets/images/essy.jpg'),
  },
];

const categories = [
  { id: 1, name: 'Lace', icon: '👗' },
  { id: 2, name: 'Ankara', icon: '🧵' },
  { id: 3, name: 'Aso-Oke', icon: '✨' },
  { id: 4, name: 'Dresses', icon: '👚' },
  { id: 5, name: 'Skirt & Blouse', icon: '💃🏽' },
];

export default function HomeScreen() {
  const { addToCart } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>ESSY STORE</Text>

            <Text style={styles.subtitle}>
              Fashion made beautifully for you
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🛒</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            placeholder="Search fabrics, styles..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* WELCOME BANNER */}
        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerSmall}>
              WELCOME TO ESSY STORE
            </Text>

            <Text style={styles.bannerTitle}>
              Your Style.{'\n'}Your Choice.
            </Text>

            <Text style={styles.bannerDescription}>
              Discover beautiful fabrics and unique fashion styles.
            </Text>

            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => {
                console.log('SHOP BUTTON PRESSED');
                console.log('Navigating to: /pages/shop');

                router.push('/pages/shop');
              }}
            >
              <Text style={styles.shopButtonText}>
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.bannerEmoji}>👗</Text>
        </View>

        {/* CATEGORIES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Categories
          </Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
            >
              <View style={styles.categoryIcon}>
                <Text style={styles.categoryEmoji}>
                  {category.icon}
                </Text>
              </View>

              <Text style={styles.categoryName}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FEATURED FABRICS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Featured Fabrics
          </Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
            >
              <Image
                source={product.image}
                style={styles.productImage}
              />

              <TouchableOpacity
                style={styles.favoriteButton}
              >
                <Text style={styles.favoriteText}>
                  ♡
                </Text>
              </TouchableOpacity>

              <View style={styles.productInfo}>
                <Text
                  style={styles.productName}
                  numberOfLines={1}
                >
                  {product.name}
                </Text>

                <Text style={styles.productPrice}>
                  {product.price}
                </Text>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    addToCart({
                      ...product,
                      category: 'Fashion Fabric',
                      price: Number(product.price.replace(/[^0-9]/g, '')),
                    });
                    router.push('/pages/add-to-cart');
                  }}
                >
                  <Text style={styles.addButtonText}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* POPULAR STYLES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Popular Styles
          </Text>

          <TouchableOpacity>
            <Text style={styles.seeAll}>
              View all
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.styleGrid}>

          <TouchableOpacity style={styles.styleCard}>
            <Image
              source={require('@/assets/images/essy.jpg')}
              style={styles.styleImage}
            />

            <View style={styles.styleOverlay}>
              <Text style={styles.styleName}>
                Elegant Lace
              </Text>

              <Text style={styles.styleAction}>
                View Style →
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.styleCard}>
            <Image
              source={require('@/assets/images/essy.jpg')}
              style={styles.styleImage}
            />

            <View style={styles.styleOverlay}>
              <Text style={styles.styleName}>
                Aso-Ebi Style
              </Text>

              <Text style={styles.styleAction}>
                View Style →
              </Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* CUSTOM ORDER */}
        <View style={styles.customOrder}>

          <Text style={styles.customIcon}>
            ✨
          </Text>

          <View style={styles.customText}>
            <Text style={styles.customTitle}>
              Need a custom outfit?
            </Text>

            <Text style={styles.customDescription}>
              Choose your fabric and style and let us
              create something beautiful for you.
            </Text>

            <Link href="/pages/create-order" asChild>
            <TouchableOpacity style={styles.customButton}>
              <Text style={styles.customButtonText}>
                Create
              </Text>
            </TouchableOpacity>
            </Link>
          </View>

        </View>

        {/* ORDER TRACKING */}
        <Link href="/pages/orders" asChild>
        <TouchableOpacity style={styles.serviceCard}>

          <View style={styles.serviceIcon}>
            <Text>🚚</Text>
          </View>

          <View style={styles.serviceTextContainer}>
            <Text style={styles.serviceTitle}>
              Track Your Order
            </Text>

            <Text style={styles.serviceDescription}>
              Track your order from production to delivery.
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>

        </TouchableOpacity>
        </Link>

        {/* CHAT WITH CEO */}
        <Link href="/pages/chat" asChild>
        <TouchableOpacity style={styles.serviceCard}>

          <View style={styles.serviceIcon}>
            <Text>👩🏽‍💼</Text>
          </View>

          <View style={styles.serviceTextContainer}>
            <Text style={styles.serviceTitle}>
              Chat With CEO
            </Text>

            <Text style={styles.serviceDescription}>
              Talk directly with the CEO of ESSY STORE.
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>

        </TouchableOpacity>
        </Link>

        {/* CUSTOMER SERVICE */}
        <Link href="/pages/customer-service" asChild>
        <TouchableOpacity style={styles.serviceCard}>

          <View style={styles.serviceIcon}>
            <Text>💬</Text>
          </View>

          <View style={styles.serviceTextContainer}>
            <Text style={styles.serviceTitle}>
              Customer Service
            </Text>

            <Text style={styles.serviceDescription}>
              Our customer service team is here to help.
            </Text>
          </View>

          <Text style={styles.arrow}>
            ›
          </Text>

        </TouchableOpacity>
        </Link>

        {/* FEEDBACK */}
        <Link href="/pages/feedback" asChild>
        <TouchableOpacity style={styles.feedbackCard}>

          <Text style={styles.feedbackStars}>
            ★★★★★
          </Text>

          <Text style={styles.feedbackTitle}>
            Love Your Order?
          </Text>

          <Text style={styles.feedbackDescription}>
            Tell us about your experience with ESSY STORE.
          </Text>

          <View style={styles.feedbackButton}>
            <Text style={styles.feedbackButtonText}>
              Give Feedback
            </Text>
          </View>

        </TouchableOpacity>
        </Link>

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
    paddingBottom: 30,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  logo: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#6B2145',
  },

  subtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },

  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  icon: {
    fontSize: 18,
  },

  /* SEARCH */

  searchContainer: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 1,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  /* BANNER */

  banner: {
    backgroundColor: '#6B2145',
    borderRadius: 22,
    padding: 22,
    minHeight: 190,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 28,
  },

  bannerText: {
    flex: 1,
    zIndex: 2,
  },

  bannerSmall: {
    color: '#F5D6E4',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 8,
    lineHeight: 32,
  },

  bannerDescription: {
    color: '#F8E8EF',
    fontSize: 12,
    marginTop: 8,
    maxWidth: 220,
    lineHeight: 18,
  },

  bannerEmoji: {
    fontSize: 100,
    position: 'absolute',
    right: -5,
    bottom: 5,
  },

  shopButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 15,
  },

  shopButtonText: {
    color: '#6B2145',
    fontWeight: '700',
    fontSize: 12,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#292929',
  },

  seeAll: {
    color: '#6B2145',
    fontSize: 12,
    fontWeight: '700',
  },

  /* CATEGORIES */

  categoryScroll: {
    marginBottom: 25,
  },

  categoryCard: {
    alignItems: 'center',
    marginRight: 18,
    width: 72,
  },

  categoryIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#F5E5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },

  categoryEmoji: {
    fontSize: 27,
  },

  categoryName: {
    fontSize: 11,
    color: '#555',
    textAlign: 'center',
  },

  /* PRODUCTS */

  productCard: {
    width: 175,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginRight: 15,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 25,
  },

  productImage: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
  },

  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteText: {
    fontSize: 22,
    color: '#6B2145',
  },

  productInfo: {
    padding: 12,
  },

  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6B2145',
    marginTop: 6,
  },

  addButton: {
    backgroundColor: '#6B2145',
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 10,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  /* POPULAR STYLES */

  styleGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  styleCard: {
    width: '48%',
    height: 210,
    borderRadius: 18,
    overflow: 'hidden',
  },

  styleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  styleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  styleName: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  styleAction: {
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: 4,
  },

  /* CUSTOM ORDER */

  customOrder: {
    backgroundColor: '#F3E4EA',
    borderRadius: 18,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  customIcon: {
    fontSize: 30,
    marginRight: 12,
  },

  customText: {
    flex: 1,
  },

  customTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#333',
  },

  customDescription: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    lineHeight: 15,
  },

  customButton: {
    backgroundColor: '#6B2145',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
  },

  customButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  /* SERVICE CARDS */

  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
  },

  serviceIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#F5E5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  serviceTextContainer: {
    flex: 1,
  },

  serviceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#333',
  },

  serviceDescription: {
    fontSize: 10,
    color: '#777',
    marginTop: 4,
    lineHeight: 15,
  },

  arrow: {
    fontSize: 27,
    color: '#6B2145',
  },

  /* FEEDBACK */

  feedbackCard: {
    backgroundColor: '#6B2145',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  feedbackStars: {
    color: '#FFD166',
    fontSize: 18,
    letterSpacing: 3,
  },

  feedbackTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 8,
  },

  feedbackDescription: {
    color: '#F4DDE7',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 7,
  },

  feedbackButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    marginTop: 14,
  },

  feedbackButtonText: {
    color: '#6B2145',
    fontSize: 11,
    fontWeight: '800',
  },

});
