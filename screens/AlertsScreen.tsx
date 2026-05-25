import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../constants/theme';
import { mockAlerts, Alert } from '../constants/mockData';

type FilterTab = 'all' | 'unread' | 'read';

const severityConfig = {
  high: { color: Colors.danger, bg: Colors.dangerLight, border: Colors.dangerBorder, label: 'high' },
  moderate: { color: Colors.warning, bg: Colors.warningLight, border: Colors.warningBorder, label: 'moderate' },
  low: { color: Colors.info, bg: Colors.infoLight, border: '#C5DDEF', label: 'low' },
};

const alertTypeIcon = (type: string) => {
  switch (type) {
    case 'disease': return '⚠️';
    case 'vaccine': return '💉';
    case 'appointment': return '📅';
    case 'reminder': return '🔔';
    default: return 'ℹ️';
  }
};

export default function AlertsScreen() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [alerts, setAlerts] = useState(mockAlerts);

  const unreadAlerts = alerts.filter(a => !a.read);
  const readAlerts = alerts.filter(a => a.read);
  const highAlerts = alerts.filter(a => a.severity === 'high');

  const shown = filter === 'all' ? alerts : filter === 'unread' ? unreadAlerts : readAlerts;

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread', count: unreadAlerts.length },
    { key: 'read', label: 'Read' },
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
          <Text style={styles.headerTitle}>Alerts</Text>
          <Text style={styles.headerSub}>Stay updated on your pet's health</Text>
        </View>
        {unreadAlerts.length > 0 && (
          <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: Colors.textPrimary }]}>{alerts.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: Colors.warning }]}>{unreadAlerts.length}</Text>
          <Text style={styles.statLabel}>Unread</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNum, { color: Colors.danger }]}>{highAlerts.length}</Text>
          <Text style={styles.statLabel}>High</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabRow}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, filter === tab.key && styles.tabActive]}
            onPress={() => setFilter(tab.key)}
          >
            <Text style={[styles.tabText, filter === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
            {tab.count != null && tab.count > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{tab.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Alert Cards */}
      {shown.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyTitle}>No alerts</Text>
          <Text style={styles.emptySub}>You're all caught up!</Text>
        </View>
      ) : (
        shown.map((alert: Alert) => {
          const sev = severityConfig[alert.severity as keyof typeof severityConfig];
          return (
            <View
              key={alert.id}
              style={[
                styles.alertCard,
                { borderLeftColor: sev.color, borderLeftWidth: 3 },
                !alert.read && { backgroundColor: sev.bg },
              ]}
            >
              {/* Top row */}
              <View style={styles.alertTop}>
                <View style={styles.alertIconWrap}>
                  <Text style={{ fontSize: 18 }}>{alertTypeIcon(alert.type)}</Text>
                </View>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <View style={[styles.severityBadge, { backgroundColor: sev.color }]}>
                  <Text style={styles.severityText}>{sev.label}</Text>
                </View>
              </View>

              {/* Body */}
              <Text style={styles.alertMessage}>{alert.message}</Text>

              {/* Footer */}
              <View style={styles.alertFooter}>
                <Text style={styles.alertDate}>{alert.date}</Text>
                {!alert.read && (
                  <TouchableOpacity
                    style={styles.markReadBtn}
                    onPress={() => markAsRead(alert.id)}
                  >
                    <Text style={styles.markReadIcon}>✓</Text>
                    <Text style={styles.markReadText}>Mark as read</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })
      )}

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
  markAllBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
  },
  markAllText: { fontSize: Typography.xs, fontWeight: Typography.semibold, color: Colors.textSecondary },
  statsRow: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.base,
    flexDirection: 'row',
    marginBottom: Spacing.base,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: Typography.xxl, fontWeight: Typography.bold, letterSpacing: -0.5 },
  statLabel: { fontSize: Typography.xs, color: Colors.textTertiary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: Colors.border },
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: Radius.sm,
  },
  tabActive: { backgroundColor: Colors.surface, ...Shadow.sm },
  tabText: { fontSize: Typography.sm, color: Colors.textTertiary, fontWeight: Typography.medium },
  tabTextActive: { color: Colors.textPrimary, fontWeight: Typography.semibold },
  tabBadge: {
    backgroundColor: Colors.danger,
    borderRadius: Radius.full,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeText: { color: Colors.white, fontSize: 10, fontWeight: Typography.bold },
  empty: { alignItems: 'center', paddingVertical: Spacing.xxxl },
  emptyIcon: { fontSize: 48, marginBottom: Spacing.base },
  emptyTitle: { fontSize: Typography.md, fontWeight: Typography.semibold, color: Colors.textPrimary },
  emptySub: { fontSize: Typography.sm, color: Colors.textSecondary, marginTop: 4 },
  alertCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  alertTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  alertIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    flex: 1,
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  severityText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: Typography.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  alertMessage: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
    paddingLeft: 40,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 40,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.sm,
  },
  alertDate: { fontSize: Typography.xs, color: Colors.textTertiary },
  markReadBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  markReadIcon: { fontSize: 12, color: Colors.textTertiary },
  markReadText: { fontSize: Typography.xs, color: Colors.textTertiary, fontWeight: Typography.medium },
});
