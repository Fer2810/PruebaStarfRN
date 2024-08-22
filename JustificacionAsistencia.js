import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,  // Importa Alert
} from 'react-native';

export default function JustificacionAsistencia() {
  const [datos, setDatos] = useState([]);
  const [editado, setEditado] = useState({});

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const response = await fetch('http://192.168.5.63:5000/obtener_no_presentes');
      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckChange = (nie) => {
    setEditado(prev => ({
      ...prev,
      [nie]: { ...prev[nie], check: !prev[nie]?.check }
    }));
  };

  const handleJustificacionChange = (nie, text) => {
    setEditado(prev => ({
      ...prev,
      [nie]: { 
        ...prev[nie], 
        justificacion: text
      }
    }));
  };

  const mostrarConfirmacion = () => {
    Alert.alert(
      'Confirmar Guardado',
      '¿Estás seguro que quieres guardar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Guardar', onPress: guardarDatos },
      ],
      { cancelable: false }
    );
  };

  const guardarDatos = async () => {
    try {
      // Asegúrate de que todos los campos estén presentes
      const datosParaGuardar = datos.map(item => ({
        nie: item.nie,
        nombre: item.nombre,
        apellido: item.apellido,
        bachillerato: item.bachillerato,
        genero: item.genero,
        id_año: item.id_año,
        justificacion: editado[item.nie]?.justificacion || '',
        check: editado[item.nie]?.check || false
      }));

      await fetch('http://192.168.5.63:5000/guardar_justificaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosParaGuardar),
      });
      Alert.alert('Éxito', 'Datos guardados exitosamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al guardar los datos');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nie}</Text>
      <Text style={styles.cell}>{item.nombre}</Text>
      <Text style={styles.cell}>{item.apellido}</Text>
      <Text style={styles.cell}>{item.bachillerato}</Text>
      <Text style={styles.cell}>{item.genero}</Text>
      <Text style={styles.cell}>{item.id_año}</Text>
      <TextInput
        style={styles.input}
        placeholder="Justificación"
        onChangeText={(text) => handleJustificacionChange(item.nie, text)}
        value={editado[item.nie]?.justificacion || ''}
      />
      <Switch
        value={editado[item.nie]?.check || false}
        onValueChange={() => handleCheckChange(item.nie)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Justificación de Asistencia</Text>
      <View style={styles.table}>
        <FlatList
          data={datos}
          renderItem={renderItem}
          keyExtractor={item => item.nie.toString()}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerCell}>NIE</Text>
              <Text style={styles.headerCell}>Nombre</Text>
              <Text style={styles.headerCell}>Apellido</Text>
              <Text style={styles.headerCell}>Carrera</Text>
              <Text style={styles.headerCell}>Género</Text>
              <Text style={styles.headerCell}>ID Año</Text>
              <Text style={styles.headerCell}>Justificación</Text>
              <Text style={styles.headerCell}>Check</Text>
            </View>
          }
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={cargarDatos}>
        <Text style={styles.buttonText}>Refrescar Datos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={mostrarConfirmacion}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
    fontSize: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: '#056347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
