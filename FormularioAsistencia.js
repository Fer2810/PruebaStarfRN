import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const FormularioAsistencia = ({ estudiantesAsistencia, estudiantesNoAsistencia, id_año, onClose }) => {
  const [materia, setMateria] = useState('');
  const [profesor, setProfesor] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [año, setAño] = useState('');

  const handleSubmit = async () => {
    const fechaRegistro = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

    try {
      // Enviar los estudiantes que están presentes
      if (estudiantesAsistencia.length > 0) {
        await axios.post('http://192.168.1.49:5000/asistencia_materia', {
          id_año,
          materia,
          profesor,
          fecha_registro: fechaRegistro,
          estudiantes: estudiantesAsistencia,
        });
      }

      // Enviar los estudiantes que están con justificación de inasistencia
      if (estudiantesNoAsistencia.length > 0) {
        await axios.post('http://192.168.1.49:5000/no_asistencia_materia', {
          id_año,
          materia,
          profesor,
          fecha_registro: fechaRegistro,
          estudiantes: estudiantesNoAsistencia,
        });
      }

      alert('Datos guardados con éxito');
      onClose(); // Cerrar el formulario tras guardar
    } catch (error) {
      console.error(error);
      alert('Error al guardar los datos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sección: {id_año}</Text>
      <TextInput
        style={styles.input}
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
      />
      <TextInput
        style={styles.input}
        placeholder="Profesor"
        value={profesor}
        onChangeText={setProfesor}
      />
      <View style={styles.dateContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="DD"
          value={dia}
          onChangeText={setDia}
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.dateInput}
          placeholder="MM"
          value={mes}
          onChangeText={setMes}
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.dateInput}
          placeholder="AAAA"
          value={año}
          onChangeText={setAño}
          maxLength={4}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSubmit} />
        <Button title="Cancelar" onPress={onClose} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FormularioAsistencia;
