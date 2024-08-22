import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from './ThemeContext';

const BottomNav = ({ selectedIndex, onItemTapped }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity onPress={() => onItemTapped(0)} style={styles.navItem}>
        <Icon name="arrow-back" size={30} color={selectedIndex === 0 ? (isDarkMode ? 'white' : 'black') : 'gray'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onItemTapped(1)} style={styles.navItem}>
        <Icon name="home" size={30} color={selectedIndex === 1 ? (isDarkMode ? 'white' : 'black') : 'gray'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onItemTapped(2)} style={styles.navItem}>
        <Icon name="person" size={30} color={selectedIndex === 2 ? (isDarkMode ? 'white' : 'black') : 'gray'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff', // Fondo predeterminado claro
  },
  darkContainer: {
    backgroundColor: '#333', // Fondo para el modo oscuro
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNav;
