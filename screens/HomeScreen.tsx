import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../constants/theme';
import { mockPets, mockAlerts, Alert, Pet } from '../constants/mockData';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const highAlerts = mockAlerts.filter((a: Alert) => a.severity === 'high');
  const reminders = mockAlerts.filter((a: Alert) => a.type === 'reminder');
  const unreadCount = mockAlerts.filter((a: Alert) => !a.read).length;

  const quickActions = [
    { id: 'add', icon: '＋', label: 'Add Pet', color: Colors.primary, bg: Colors.infoLight, tab: 'home' },
    { id: 'alerts', icon: '🔔', label: 'Alerts', color: Colors.danger, bg: Colors.dangerLight, tab: 'alerts', badge: unreadCount },
    { id: 'appts', icon: '📅', label: 'Appointments', color: Colors.success, bg: Colors.successLight, tab: 'appointments' },
  ];

  const features = [
    { id: 'tips', icon: '💡', label: 'Health Tips', sub: 'Expert advice', color: '#7B5EA7', bg: '#F3EEF9' },
    { id: 'clinics', icon: '📍', label: 'Find Clinics', sub: 'Nearby vets', color: Colors.info, bg: Colors.infoLight },
  ];

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.headerTitle}>My Pets</Text>
          <Text style={styles.headerSub}>Manage your pets' health & wellness</Text>
        </View>
        <TouchableOpacity style={styles.avatarBtn}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* High Severity Alert Banner */}
      {highAlerts.map(alert => (
        <TouchableOpacity
          key={alert.id}
          style={styles.alertBanner}
          onPress={() => onNavigate('alerts')}
          activeOpacity={0.85}
        >
          <View style={styles.alertBannerIcon}>
            <Text style={{ fontSize: 18 }}>⚠️</Text>
          </View>
          <View style={styles.alertBannerContent}>
            <Text style={styles.alertBannerTitle}>{alert.title}</Text>
            <Text style={styles.alertBannerMsg} numberOfLines={2}>{alert.message}</Text>
          </View>
          <Text style={styles.alertBannerArrow}>›</Text>
        </TouchableOpacity>
      ))}

      {/* Reminders */}
      {reminders.length > 0 && (
        <View style={styles.reminderCard}>
          <View style={styles.reminderHeader}>
            <Text style={{ fontSize: 16 }}>💊</Text>
            <Text style={styles.reminderTitle}>Upcoming Reminders</Text>
          </View>
          {reminders.map(r => (
            <View key={r.id} style={styles.reminderItem}>
              <View style={styles.reminderDot} />
              <Text style={styles.reminderText}>{r.message}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        {quickActions.map(action => (
          <TouchableOpacity
            key={action.id}
            style={[styles.quickAction, { backgroundColor: action.bg }]}
            onPress={() => onNavigate(action.tab)}
            activeOpacity={0.8}
          >
            <View style={styles.quickActionIconWrap}>
              <Text style={[styles.quickActionIcon, { color: action.color }]}>{action.icon}</Text>
              {action.badge != null && action.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{action.badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.quickActionLabel, { color: action.color }]}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feature Cards */}
      <View style={styles.featureRow}>
        {features.map(f => (
          <TouchableOpacity key={f.id} style={[styles.featureCard, { backgroundColor: f.bg }]} activeOpacity={0.8}>
            <View style={[styles.featureIconWrap, { backgroundColor: f.color + '20' }]}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
            </View>
            <View>
              <Text style={[styles.featureLabel, { color: f.color }]}>{f.label}</Text>
              <Text style={styles.featureSub}>{f.sub}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Your Pets */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Pets</Text>
        <TouchableOpacity style={styles.addPetBtn}>
          <Text style={styles.addPetText}>＋ Add Pet</Text>
        </TouchableOpacity>
      </View>

      {mockPets.map((pet: Pet) => (
        <View key={pet.id} style={styles.petCard}>
          <Image source={{ uri: pet.image }} style={styles.petImage} />
          <View style={styles.petInfo}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed} • {pet.age}</Text>
            <View style={[styles.petTag, { backgroundColor: pet.type === 'dog' ? Colors.infoLight : '#F3EEF9' }]}>
              <Text style={[styles.petTagText, { color: pet.type === 'dog' ? Colors.info : '#7B5EA7' }]}>
                {pet.type}
              </Text>
            </View>
          </View>
          <View style={styles.petActions}>
            <TouchableOpacity style={styles.petActionBtn}>
              <Text style={styles.petActionIcon}>ℹ</Text>
              <Text style={styles.petActionLabel}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.petActionBtn, { marginTop: Spacing.sm }]}>
              <Text style={styles.petActionIcon}>📈</Text>
              <Text style={styles.petActionLabel}>History</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: 56,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  avatarBtn: {
    marginTop: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: Typography.bold,
    fontSize: Typography.sm,
  },
  alertBanner: {
    backgroundColor: Colors.dangerLight,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  alertBannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDDDD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBannerContent: {
    flex: 1,
  },
  alertBannerTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.danger,
    marginBottom: 2,
  },
  alertBannerMsg: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  alertBannerArrow: {
    fontSize: 22,
    color: Colors.danger,
    fontWeight: Typography.light,
  },
  reminderCard: {
    backgroundColor: Colors.warningLight,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.warningBorder,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  reminderTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.warning,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 4,
  },
  reminderDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.warning,
    marginLeft: 4,
  },
  reminderText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  quickAction: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadow.sm,
  },
  quickActionIconWrap: {
    position: 'relative',
    marginBottom: 6,
  },
  quickActionIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: Colors.danger,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: Typography.bold,
  },
  quickActionLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    textAlign: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  featureCard: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 20,
  },
  featureLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
  },
  featureSub: {
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  addPetBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    backgroundColor: Colors.infoLight,
    borderRadius: Radius.full,
  },
  addPetText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: Colors.primary,
  },
  petCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  petImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceAlt,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  petBreed: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 6,
  },
  petTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  petTagText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    textTransform: 'capitalize',
  },
  petActions: {
    alignItems: 'flex-end',
  },
  petActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 80,
    justifyContent: 'center',
  },
  petActionIcon: {
    fontSize: 12,
  },
  petActionLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
});
