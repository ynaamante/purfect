import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../constants/theme';
import { mockUser, mockClinic } from '../constants/mockData';

interface ProfileScreenProps {
  onSignOut: () => void;
}

export default function ProfileScreen({ onSignOut }: ProfileScreenProps) {
  const [darkMode, setDarkMode] = useState(false);

  const quickLinks = [
    { icon: '🏥', label: 'Find Nearby Clinics' },
    { icon: '💡', label: 'Health Tips & Advice' },
    { icon: '📅', label: 'Book Appointment' },
  ];

  const settings = [
    { icon: '🔔', label: 'Notification Preferences' },
    { icon: '🔒', label: 'Privacy Settings' },
    { icon: '❓', label: 'Help & Support' },
  ];

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.headerSub}>Manage your account settings</Text>
      </View>

      {/* User Card */}
      <View style={styles.userCard}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {mockUser.name.split(' ').map((n: string) => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{mockUser.name}</Text>
          <Text style={styles.userEmail}>{mockUser.email}</Text>
          <View style={styles.memberBadge}>
            <Text style={styles.memberText}>Pro Member</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editIcon}>✏</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Info */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoList}>
          {[
            { icon: '✉', label: 'Email', value: mockUser.email },
            { icon: '📞', label: 'Phone', value: mockUser.phone },
            { icon: '📍', label: 'Location', value: mockUser.location },
          ].map((item, i) => (
            <View key={i} style={[styles.infoRow, i > 0 && styles.infoRowBorder]}>
              <View style={styles.infoIconWrap}>
                <Text style={{ fontSize: 16 }}>{item.icon}</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Veterinary Clinic */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Your Veterinary Clinic</Text>
          <TouchableOpacity>
            <Text style={styles.changeLink}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.clinicCard}>
          <View style={styles.clinicIconWrap}>
            <Text style={{ fontSize: 20 }}>🏥</Text>
          </View>
          <View style={styles.clinicInfo}>
            <Text style={styles.clinicName}>{mockClinic.name}</Text>
            <Text style={styles.clinicAddress}>{mockClinic.address}</Text>
            <Text style={styles.clinicPhone}>{mockClinic.phone}</Text>
          </View>
        </View>
      </View>

      {/* Quick Links */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        {quickLinks.map((link, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.linkRow, i > 0 && styles.linkRowBorder]}
            activeOpacity={0.7}
          >
            <Text style={styles.linkIcon}>{link.icon}</Text>
            <Text style={styles.linkLabel}>{link.label}</Text>
            <Text style={styles.linkArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settings.map((setting, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.linkRow, i > 0 && styles.linkRowBorder]}
            activeOpacity={0.7}
          >
            <Text style={styles.linkIcon}>{setting.icon}</Text>
            <Text style={styles.linkLabel}>{setting.label}</Text>
            <Text style={styles.linkArrow}>›</Text>
          </TouchableOpacity>
        ))}
        <View style={[styles.linkRow, styles.linkRowBorder]}>
          <Text style={styles.linkIcon}>☀</Text>
          <Text style={styles.linkLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutBtn} onPress={onSignOut}>
        <Text style={styles.signOutIcon}>→</Text>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={styles.version}>VetIntel v1.0.0</Text>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.base, paddingTop: 56, paddingBottom: 100 },
  header: { marginBottom: Spacing.lg },
  headerTitle: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSub: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 2 },
  userCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontWeight: Typography.bold, fontSize: Typography.lg },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  userInfo: { flex: 1 },
  userName: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  userEmail: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2, marginBottom: 6 },
  memberBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  memberText: { color: Colors.white, fontSize: 10, fontWeight: Typography.semibold },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editIcon: { fontSize: 14 },
  sectionCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  changeLink: { fontSize: Typography.sm, color: Colors.primary, fontWeight: Typography.semibold },
  infoList: { gap: 0 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  infoRowBorder: { borderTopWidth: 1, borderTopColor: Colors.borderLight },
  infoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: Typography.xs, color: Colors.textTertiary, marginBottom: 1 },
  infoValue: { fontSize: Typography.sm, color: Colors.textPrimary, fontWeight: Typography.medium },
  clinicCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  clinicIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicInfo: { flex: 1 },
  clinicName: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.textPrimary },
  clinicAddress: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2, lineHeight: 16 },
  clinicPhone: { fontSize: Typography.xs, color: Colors.primary, marginTop: 4, fontWeight: Typography.medium },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: 12,
  },
  linkRowBorder: { borderTopWidth: 1, borderTopColor: Colors.borderLight },
  linkIcon: { fontSize: 18, width: 28, textAlign: 'center' },
  linkLabel: { flex: 1, fontSize: Typography.sm, color: Colors.textPrimary, fontWeight: Typography.medium },
  linkArrow: { fontSize: 20, color: Colors.textTertiary, fontWeight: Typography.light },
  signOutBtn: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
  },
  signOutIcon: { fontSize: 18, color: Colors.danger },
  signOutText: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.danger },
  version: {
    textAlign: 'center',
    fontSize: Typography.xs,
    color: Colors.textTertiary,
    marginBottom: Spacing.sm,
  },
});
