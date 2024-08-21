import React from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import LogoutButton from './LogoutHandler';

export default function SidebarMenu({ isDarkMode, toggleTheme }) {
  return (
    <View style={[styles.drawerContent, isDarkMode && styles.darkDrawerContent]}>
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png' }}
          style={styles.profileImage}
        />
        <Text style={[styles.username, isDarkMode && styles.darkUsername]}>Nombre de Usuario</Text>
      </View>
      <View style={styles.drawerItem}>
        <LogoutButton />
      </View>
      <View style={styles.drawerItem}>
        <Button title="Cambiar tema" onPress={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({


  drawerContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  darkDrawerContent: {
    backgroundColor: '#333',
  },
  drawerHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
  darkUsername: {
    color: '#fff',
  },
  drawerItem: {
    marginVertical: 10,
  },
});
