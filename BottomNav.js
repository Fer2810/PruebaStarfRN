import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BottomNav({ selectedIndex, handleItemTapped, isDarkMode }) {
  return (
    <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleItemTapped(0)}
      >
        <Icon name="arrow-back" size={24} color={selectedIndex === 0 ? 'blue' : isDarkMode ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleItemTapped(1)}
      >
        <Icon name="home" size={24} color={selectedIndex === 1 ? 'blue' : isDarkMode ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleItemTapped(2)}
      >
        <Icon name="person" size={24} color={selectedIndex === 2 ? 'blue' : isDarkMode ? 'white' : 'black'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  darkBottomNav: {
    backgroundColor: '#333',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
