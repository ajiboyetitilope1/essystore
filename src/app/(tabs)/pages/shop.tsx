import React, { useState } from 'react';
// Shop tab route.
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router as expoRouter } from 'expo-router';
import { useCart } from '@/context/CartContext';

const router = expoRouter as unknown as { back: () => void; push: (href: string) => void };

const products = [
  {
    id: 1,
    name: 'Luxury French Lace',
    price: 45000,
    category: 'Lace',
    image: require('@/assets/images/essy.jpg'),
  },
  {
    id: 2,
    name: 'Premium Aso-Oke',
    price: 35000,
    category: 'Aso-Oke',
    image: require('@/assets/images/essy.jpg'),
  },
  {
    id: 3,
    name: 'Beautiful Ankara',
    price: 25000,
    category: 'Ankara',
    image: require('@/assets/images/essy.jpg'),
  },
  {
    id: 4,
    name: 'Elegant Lace Fabric',
    price: 50000,
    category: 'Lace',
    image: require('@/assets/images/essy.jpg'),
  },
  {
    id: 5,
    name: 'Royal Aso-Oke',
    price: 40000,
    category: 'Aso-Oke',
    image: require('@/assets/images/essy.jpg'),
  },
  {
    id: 6,
    name: 'Classic Ankara',
    price: 28000,
    category: 'Ankara',
    image: require('@/assets/images/essy.jpg'),
  },
];

const categories = [
  'All',
  'Lace',
  'Ankara',
  'Aso-Oke',
  'Dresses',
  'Skirt & Blouse',
];

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Shop</Text>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push('/pages/add-to-cart')}
          >
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            placeholder="Search fabrics, styles..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* TITLE */}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>
            Discover Your Style
          </Text>

          <Text style={styles.pageSubtitle}>
            Find beautiful fabrics and fashion pieces
            made for you.
          </Text>
        </View>

        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>Categories</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category &&
                  styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category &&
                    styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* PRODUCT COUNT */}
        <View style={styles.productHeader}>
          <Text style={styles.sectionTitle}>
            All Products
          </Text>

          <Text style={styles.productCount}>
            {filteredProducts.length} items
          </Text>
        </View>

        {/* PRODUCTS */}
        <View style={styles.productGrid}>
          {filteredProducts.map((product) => (
            <View
              key={product.id}
              style={styles.productCard}
            >
              {/* IMAGE */}
              <View>
                <Image
                  source={product.image}
                  style={styles.productImage}
                />

                <TouchableOpacity
                  style={styles.favoriteButton}
                >
                  <Text style={styles.favorite}>
                    ♡
                  </Text>
                </TouchableOpacity>
              </View>

              {/* PRODUCT INFORMATION */}
              <View style={styles.productInfo}>
                <Text style={styles.productCategory}>
                  {product.category}
                </Text>

                <Text
                  style={styles.productName}
                  numberOfLines={1}
                >
                  {product.name}
                </Text>

                <Text style={styles.productPrice}>
                  ₦{product.price.toLocaleString()}
                </Text>

                {/* ADD TO CART */}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    addToCart(product);
                    router.push('/pages/add-to-cart');
                  }}
                >
                  <Text style={styles.addButtonText}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* NO RESULTS */}
        {filteredProducts.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>

            <Text style={styles.emptyTitle}>
              No products found
            </Text>

            <Text style={styles.emptyText}>
              Try searching for another fabric or style.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      {false && (
      <View style={styles.bottomNav}>
        {/* HOME */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/')}
        >
          <Text style={styles.navIcon}>🏠</Text>

          <Text style={styles.navText}>
            Home
          </Text>
        </TouchableOpacity>

        {/* SHOP */}
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🛍️</Text>

          <Text style={styles.activeNavText}>
            Shop
          </Text>
        </TouchableOpacity>

        {/* CART */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            router.push('/pages/add-to-cart')
          }
        >
          <Text style={styles.navIcon}>🛒</Text>

          <Text style={styles.navText}>
            Cart
          </Text>
        </TouchableOpacity>

        {/* CHAT */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/pages/shop')}
        >
          <Text style={styles.navIcon}>💬</Text>

          <Text style={styles.navText}>
            Chat
          </Text>
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/')}
        >
          <Text style={styles.navIcon}>👤</Text>

          <Text style={styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
      )}
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
    paddingBottom: 100,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  backIcon: {
    fontSize: 32,
    color: '#6B2145',
    marginTop: -3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#6B2145',
  },

  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  cartIcon: {
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
    marginBottom: 25,
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

  /* PAGE TITLE */
  titleContainer: {
    marginBottom: 25,
  },

  pageTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#292929',
  },

  pageSubtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
    lineHeight: 18,
  },

  /* SECTION */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#292929',
  },

  /* CATEGORIES */
  categoryScroll: {
    marginTop: 15,
    marginBottom: 25,
  },

  categoryButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  categoryButtonActive: {
    backgroundColor: '#6B2145',
    borderColor: '#6B2145',
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },

  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  /* PRODUCT HEADER */
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  productCount: {
    fontSize: 11,
    color: '#888',
  },

  /* PRODUCT GRID */
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    elevation: 2,
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

  favorite: {
    fontSize: 22,
    color: '#6B2145',
  },

  productInfo: {
    padding: 12,
  },

  productCategory: {
    fontSize: 9,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginTop: 4,
  },

  productPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#6B2145',
    marginTop: 7,
  },

  addButton: {
    backgroundColor: '#6B2145',
    borderRadius: 11,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 10,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  /* EMPTY */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#333',
    marginTop: 12,
  },

  emptyText: {
    fontSize: 11,
    color: '#888',
    marginTop: 5,
  },

  /* BOTTOM NAV */
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },

  navText: {
    fontSize: 10,
    color: '#777',
  },

  activeNavText: {
    fontSize: 10,
    color: '#6B2145',
    fontWeight: '800',
  },
});
