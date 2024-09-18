import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';
import FormularioAsistencia from './FormularioAsistencia'; // Importa el componente de formulario

const ListaEstudiantes = ({ route }) => {
  const { id_año } = route.params;
  const { isDarkMode } = useContext(ThemeContext);
  const [estudiantes, setEstudiantes] = useState([]);
  const [editado, setEditado] = useState({});
  const [asistencia, setAsistencia] = useState([]); // Estudiantes presentes
  const [noAsistencia, setNoAsistencia] = useState([]); // Estudiantes no presentes
  const [showModal, setShowModal] = useState(false);
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const obtenerEstudiantes = async () => {
      try {
        const response = await axios.get(`http://192.168.1.49:5000/obtener_estudiantes?id_año=${id_año}`);
        const datosEstudiantes = response.data.map(item => ({
          ...item,
          check: true,
          justificacion: 'Presente',
        }));
        setEstudiantes(datosEstudiantes);
        setAsistencia(datosEstudiantes); // Inicialmente, todos están presentes
      } catch (error) {
        console.error(error);
      }
    };

    obtenerEstudiantes();
  }, [id_año]);

  const handleCheckChange = (nie) => {
    const isChecked = editado[nie]?.check !== undefined ? editado[nie].check : true;
    const estudiante = estudiantes.find(est => est.nie === nie);

    if (isChecked) {
      // Si se desmarca, abrir el modal para editar justificación
      setSelectedStudent(estudiante);
      setShowJustificationModal(true);

      setEditado(prev => ({
        ...prev,
        [nie]: { check: false, justificacion: '' }
      }));
      setAsistencia(prev => prev.filter(est => est.nie !== nie));
      setNoAsistencia(prev => [...prev, { ...estudiante, check: false, justificacion: '' }]);
    } else {
      // Si se marca, agregarlo de nuevo a la lista de asistencia y quitarlo de no asistencia
      setEditado(prev => ({
        ...prev,
        [nie]: { check: true, justificacion: 'Presente' }
      }));
      setAsistencia(prev => [...prev, { ...estudiante, check: true, justificacion: 'Presente' }]);
      setNoAsistencia(prev => prev.filter(est => est.nie !== nie));
    }
  };

  const handleJustificacionChange = (text) => {
    const nie = selectedStudent?.nie;
    if (nie) {
      // Actualizar la justificación del estudiante en no asistencia
      setNoAsistencia(prev => prev.map(est => est.nie === nie ? { ...est, justificacion: text } : est));

      // Actualizar el estado de edición
      setEditado(prev => ({
        ...prev,
        [nie]: { ...prev[nie], justificacion: text }
      }));
    }
  };

  const closeJustificationModal = () => {
    setShowJustificationModal(false);
    setSelectedStudent(null);
  };

  const renderItem = ({ item }) => {
    const isChecked = editado[item.nie]?.check !== undefined ? editado[item.nie].check : true;
    const justificationValue = editado[item.nie]?.justificacion !== undefined
      ? editado[item.nie].justificacion
      : 'Presente';
  
    return (
      <View style={[styles.row, isDarkMode && styles.darkRow]}>
        <Text style={[styles.cell, isDarkMode && styles.darkText]}>{item.nie}</Text>
        <Text style={[styles.cell, isDarkMode && styles.darkText]}>{item.nombre}</Text>
        <Text style={[styles.cell, isDarkMode && styles.darkText]}>{item.apellido}</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput, !isChecked && styles.disabledInput]}
          placeholder="Justificación"
          onFocus={() => {
            if (!isChecked) {
              setSelectedStudent(item);
              setShowJustificationModal(true);
            }
          }}
          value={justificationValue}
          editable={!isChecked} // Solo es editable si el checkbox está desmarcado
        />
        <Checkbox
          value={isChecked}
          onValueChange={() => handleCheckChange(item.nie)}
        />
      </View>
    );
  };
  

  const handleGuardarCambios = () => {
    // Mostrar el formulario para completar los datos de asistencia y enviar
    setShowModal(true);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.headerRow, isDarkMode && styles.darkRow]}>
        <Text style={[styles.headerCell, isDarkMode && styles.darkText]}>NIE</Text>
        <Text style={[styles.headerCell, isDarkMode && styles.darkText]}>Nombre</Text>
        <Text style={[styles.headerCell, isDarkMode && styles.darkText]}>Apellido</Text>
        <Text style={[styles.headerCell, isDarkMode && styles.darkText]}>Justificación</Text>
        <Text style={[styles.headerCell, isDarkMode && styles.darkText]}>Asistencia</Text>
      </View>
      <FlatList
        data={estudiantes}
        renderItem={renderItem}
        keyExtractor={item => item.nie.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* Modal para el formulario */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FormularioAsistencia 
              estudiantesAsistencia={asistencia} 
              estudiantesNoAsistencia={noAsistencia} 
              id_año={id_año} 
              onClose={() => setShowModal(false)} 
            />
          </View>
        </View>
      </Modal>

      {/* Modal para la justificación */}
      <Modal
        visible={showJustificationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeJustificationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Justificación para {selectedStudent?.nombre} {selectedStudent?.apellido}</Text>
            <TextInput
              style={styles.justificationInput}
              placeholder="Escribe la justificación"
              value={editado[selectedStudent?.nie]?.justificacion || ''}
              onChangeText={handleJustificacionChange}
            />
            <TouchableOpacity style={styles.button} onPress={closeJustificationModal}>
              <Text style={styles.buttonText}>Guardar Justificación</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#888',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkRow: {
    borderBottomColor: '#555',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  darkText: {
    color: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  darkInput: {
    borderBottomColor: '#bbb',
    color: '#fff',
  },
  disabledInput: {
    backgroundColor: '#ddd',
    color: '#aaa',
  },
  button: {
    backgroundColor: '#056347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  justificationInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default ListaEstudiantes;
