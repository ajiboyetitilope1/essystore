import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="shop" href="/pages/shop" asChild>
            <TabButton icon="shop">Shop</TabButton>
          </TabTrigger>
          <TabTrigger name="cart" href="/pages/add-to-cart" asChild>
            <TabButton icon="cart">Cart</TabButton>
          </TabTrigger>
          <TabTrigger name="feedback" href="/pages/feedback" asChild>
            <TabButton icon="feedback">Feedback</TabButton>
          </TabTrigger>
          <TabTrigger name="orders" href="/pages/orders" asChild>
            <TabButton icon="orders">Orders</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, icon, ...props }: TabTriggerSlotProps & { icon: 'home' | 'shop' | 'cart' | 'feedback' | 'orders' }) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
  const color = isFocused ? colors.text : colors.textSecondary;

  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <TabIcon icon={icon} color={color} />
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>{children}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function TabIcon({ icon, color }: { icon: 'home' | 'shop' | 'cart' | 'feedback' | 'orders'; color: string }) {
  if (icon === 'home') {
    return <SymbolView tintColor={color} name={{ ios: 'house.fill', web: 'home' }} size={15} />;
  }

  if (icon === 'shop') {
    return <SymbolView tintColor={color} name={{ ios: 'bag.fill', web: 'store' }} size={15} />;
  }

  if (icon === 'feedback') {
    return <SymbolView tintColor={color} name={{ ios: 'star.fill', web: 'star' }} size={15} />;
  }

  if (icon === 'orders') {
    return <SymbolView tintColor={color} name={{ ios: 'shippingbox.fill', web: 'local_shipping' }} size={15} />;
  }

  return <SymbolView tintColor={color} name={{ ios: 'cart.fill', web: 'shopping_cart' }} size={15} />;
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          Expo Starter
        </ThemedText>

        {props.children}

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">Docs</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  externalPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: Spacing.three,
  },
});
