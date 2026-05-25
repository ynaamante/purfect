import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onComplete: () => void;
  userName?: string;
}

export default function WelcomeScreen({ onComplete, userName = 'John' }: WelcomeScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const toastAnim = useRef(new Animated.Value(80)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Fade in logo
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      // Show check
      Animated.delay(400),
      Animated.spring(checkAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
      // Show toast
      Animated.delay(200),
      Animated.spring(toastAnim, { toValue: 0, friction: 7, useNativeDriver: true }),
      // Wait then navigate
      Animated.delay(1000),
    ]).start(() => {
      onComplete();
    });
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Gradient-like background layers */}
      <View style={styles.gradientBase} />
      <View style={styles.gradientOverlay} />
      <View style={styles.gradientAccent} />

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoRing}>
          <View style={styles.logoInner}>
            <Text style={styles.logoIcon}>🐾</Text>
          </View>
        </View>

        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.nameText}>{userName}</Text>
        <Text style={styles.loadingText}>Loading your pets...</Text>

        {/* Check indicator */}
        <Animated.View
          style={[
            styles.checkCircle,
            {
              opacity: checkAnim,
              transform: [{ scale: checkAnim }],
            },
          ]}
        >
          <Text style={styles.checkIcon}>✓</Text>
        </Animated.View>
      </Animated.View>

      {/* Toast notification */}
      <Animated.View
        style={[
          styles.toast,
          { transform: [{ translateY: toastAnim }] },
        ]}
      >
        <View style={styles.toastDot} />
        <Text style={styles.toastText}>Welcome back! Logged in successfully.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primaryDark,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary,
    opacity: 0.85,
  },
  gradientAccent: {
    position: 'absolute',
    bottom: -100,
    right: -80,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: Colors.accent,
    opacity: 0.25,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  logoRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 36,
  },
  welcomeText: {
    fontSize: Typography.lg,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: Typography.regular,
    letterSpacing: 0.5,
  },
  nameText: {
    fontSize: Typography.xxxl,
    fontWeight: Typography.bold,
    color: Colors.white,
    letterSpacing: -1,
    marginTop: 4,
    marginBottom: Spacing.md,
  },
  loadingText: {
    fontSize: Typography.sm,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 0.5,
    marginBottom: Spacing.xxl,
  },
  checkCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: Typography.bold,
  },
  toast: {
    position: 'absolute',
    bottom: 40,
    left: Spacing.base,
    right: Spacing.base,
    backgroundColor: Colors.textPrimary,
    borderRadius: 12,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  toastDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  toastText: {
    color: Colors.white,
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
  },
});
