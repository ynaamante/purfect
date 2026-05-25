import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../constants/theme';

export type TabKey = 'home' | 'appointments' | 'alerts' | 'profile';

interface BottomTabBarProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  alertsBadge?: number;
}

export default function BottomTabBar({
  activeTab,
  onTabPress,
  alertsBadge = 0,
}: BottomTabBarProps) {
  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'appointments', label: 'Appointments', icon: '📅' },
    { key: 'alerts', label: 'Alerts', icon: '🔔' },
    { key: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab,
          ]}
          onPress={() => onTabPress(tab.key)}
        >
          <Text style={styles.icon}>{tab.icon}</Text>
          {tab.key === 'alerts' && alertsBadge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{alertsBadge}</Text>
            </View>
          )}
          <Text
            style={[
              styles.label,
              activeTab === tab.key && styles.activeLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: Colors.primary,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  activeLabel: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: '20%',
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
