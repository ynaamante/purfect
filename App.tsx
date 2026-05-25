import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import AlertsScreen from './screens/AlertsScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomTabBar, { TabKey } from './components/BottomTabBar';
import { Colors } from './constants/theme';
import { mockAlerts, Alert } from './constants/mockData';

type AppState = 'login' | 'welcome' | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const unreadAlerts = mockAlerts.filter((a: Alert) => !a.read).length;

  const handleLogin = () => setAppState('welcome');
  const handleWelcomeComplete = () => setAppState('main');
  const handleSignOut = () => {
    setAppState('login');
    setActiveTab('home');
  };

  const handleNavigate = (tab: string) => {
    if (['home', 'appointments', 'alerts', 'profile'].includes(tab)) {
      setActiveTab(tab as TabKey);
    }
  };

  function renderScreen() {
    switch (activeTab) {
      case 'home': return <HomeScreen onNavigate={handleNavigate} />;
      case 'appointments': return <AppointmentsScreen />;
      case 'alerts': return <AlertsScreen />;
      case 'profile': return <ProfileScreen onSignOut={handleSignOut} />;
      default: return <HomeScreen onNavigate={handleNavigate} />;
    }
  }

  let content = null;
  if (appState === 'login') {
    content = <LoginScreen onLogin={handleLogin} />;
  } else if (appState === 'welcome') {
    content = <WelcomeScreen onComplete={handleWelcomeComplete} userName="John" />;
  } else {
    content = (
      <>
        {renderScreen()}
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={setActiveTab}
          alertsBadge={unreadAlerts}
        />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
});