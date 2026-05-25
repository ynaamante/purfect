import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../constants/theme';
import { mockAppointments, Appointment } from '../constants/mockData';

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcoming = mockAppointments.filter((a: Appointment) => a.status === 'upcoming');
  const past = mockAppointments.filter((a: Appointment) => a.status === 'completed');
  const shown = activeTab === 'upcoming' ? upcoming : past;

  const petTypeColor = (name: string) => name === 'Max' ? Colors.info : '#7B5EA7';
  const petTypeBg = (name: string) => name === 'Max' ? Colors.infoLight : '#F3EEF9';

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Appointments</Text>
          <Text style={styles.headerSub}>Manage your pet's vet appointments</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>＋ Book</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: Colors.primary }]}>{upcoming.length}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: Colors.success }]}>{past.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(['upcoming', 'past'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Appointment Cards */}
      {shown.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyTitle}>No {activeTab} appointments</Text>
          <Text style={styles.emptySub}>Book one for your pet</Text>
        </View>
      ) : (
        shown.map((appt: Appointment) => (
          <View key={appt.id} style={styles.apptCard}>
            {/* Card Header */}
            <View style={styles.apptHeader}>
              <View style={styles.apptHeaderLeft}>
                <View style={[styles.petBadge, { backgroundColor: petTypeBg(appt.petName) }]}>
                  <Text style={[styles.petBadgeText, { color: petTypeColor(appt.petName) }]}>
                    {appt.petName}
                  </Text>
                </View>
                <View style={styles.typePill}>
                  <Text style={styles.typePillText}>{appt.type}</Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: appt.status === 'upcoming' ? Colors.infoLight : Colors.successLight }
              ]}>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: appt.status === 'upcoming' ? Colors.info : Colors.success }
                ]} />
                <Text style={[
                  styles.statusText,
                  { color: appt.status === 'upcoming' ? Colors.info : Colors.success }
                ]}>
                  {appt.status}
                </Text>
              </View>
            </View>

            {/* Details */}
            <View style={styles.apptDetails}>
              <View style={styles.apptDetailRow}>
                <Text style={styles.apptDetailIcon}>📅</Text>
                <Text style={styles.apptDetailText}>{appt.date}</Text>
              </View>
              <View style={styles.apptDetailRow}>
                <Text style={styles.apptDetailIcon}>🕐</Text>
                <Text style={styles.apptDetailText}>{appt.time}</Text>
              </View>
              <View style={styles.apptDetailRow}>
                <Text style={styles.apptDetailIcon}>👤</Text>
                <Text style={styles.apptDetailText}>{appt.doctor}</Text>
              </View>
            </View>

            {/* Actions */}
            {appt.status === 'upcoming' && (
              <View style={styles.apptActions}>
                <TouchableOpacity style={styles.apptActionBtn}>
                  <Text style={styles.apptActionText}>Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.apptActionBtn, styles.cancelBtn]}>
                  <Text style={[styles.apptActionText, { color: Colors.danger }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      )}

      {/* Book CTA */}
      <TouchableOpacity style={styles.bookCta} activeOpacity={0.85}>
        <View style={styles.bookCtaIcon}>
          <Text style={{ fontSize: 22 }}>📋</Text>
        </View>
        <View style={styles.bookCtaContent}>
          <Text style={styles.bookCtaTitle}>Need to see a vet?</Text>
          <Text style={styles.bookCtaSub}>Book an appointment for your pet</Text>
        </View>
        <View style={styles.bookCtaBtn}>
          <Text style={styles.bookCtaBtnText}>Book Now</Text>
        </View>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.base, paddingTop: 56, paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSub: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 2 },
  bookBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.md,
    ...Shadow.sm,
  },
  bookBtnText: { color: Colors.white, fontSize: Typography.sm, fontWeight: Typography.semibold },
  statsRow: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    marginBottom: Spacing.base,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statCard: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: Typography.xxxl, fontWeight: Typography.bold, letterSpacing: -1 },
  statLabel: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: Colors.border, marginHorizontal: Spacing.base },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    padding: 3,
    marginBottom: Spacing.base,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Radius.sm,
  },
  tabActive: {
    backgroundColor: Colors.surface,
    ...Shadow.sm,
  },
  tabText: { fontSize: Typography.sm, color: Colors.textTertiary, fontWeight: Typography.medium },
  tabTextActive: { color: Colors.textPrimary, fontWeight: Typography.semibold },
  empty: { alignItems: 'center', paddingVertical: Spacing.xxxl },
  emptyIcon: { fontSize: 48, marginBottom: Spacing.base },
  emptyTitle: { fontSize: Typography.md, fontWeight: Typography.semibold, color: Colors.textPrimary },
  emptySub: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 4 },
  apptCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  apptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  apptHeaderLeft: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center' },
  petBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  petBadgeText: { fontSize: Typography.sm, fontWeight: Typography.bold },
  typePill: {
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typePillText: { fontSize: Typography.xs, color: Colors.textSecondary, fontWeight: Typography.medium },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: Typography.xs, fontWeight: Typography.semibold },
  apptDetails: { gap: 6, marginBottom: Spacing.md },
  apptDetailRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  apptDetailIcon: { fontSize: 14, width: 20 },
  apptDetailText: { fontSize: Typography.sm, color: Colors.textSecondary },
  apptActions: { flexDirection: 'row', gap: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.borderLight, paddingTop: Spacing.md },
  apptActionBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: Radius.md,
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelBtn: { backgroundColor: Colors.dangerLight, borderColor: Colors.dangerBorder },
  apptActionText: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textSecondary },
  bookCta: {
    marginTop: Spacing.base,
    backgroundColor: Colors.infoLight,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: '#C5DDEF',
  },
  bookCtaIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center' },
  bookCtaContent: { flex: 1 },
  bookCtaTitle: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.textPrimary },
  bookCtaSub: { fontSize: Typography.xs, color: Colors.textSecondary, marginTop: 2 },
  bookCtaBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.md,
  },
  bookCtaBtnText: { color: Colors.white, fontSize: Typography.xs, fontWeight: Typography.semibold },
});
