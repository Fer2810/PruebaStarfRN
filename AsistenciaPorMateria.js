import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native';
import { ThemeContext } from './ThemeContext';
import axios from 'axios';

const AsistenciaPorMateria = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.5.62:5000/buscar_anio?search=${search}`);  
      setResultados(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAnio = (id_año) => {
    navigation.navigate('ListaEstudiantes', { id_año });
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, isDarkMode && styles.darkHeaderText]}>
          Asistencia por Materia
        </Text>
      </View>
      <View style={styles.content}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Buscar Año"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          value={search}
        />
        <FlatList
          data={resultados}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleSelectAnio(item.id_año)}>
              <Text style={[styles.itemText, isDarkMode && styles.darkItemText]}>
                Sección: {item.id_año}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id_año.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200EE',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  darkHeaderText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#6200EE',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  darkInput: {
    borderColor: '#BB86FC',
    color: '#ffffff',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  darkItemText: {
    color: '#ffffff',
  },
});

export default AsistenciaPorMateria;
