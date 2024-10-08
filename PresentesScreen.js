import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import Dialog from "react-native-dialog";

const PresentesScreen = () => {
    const [presentes, setPresentes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);

    const obtenerPresentes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.5.63:5000/obtener_presentes');
            setPresentes(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const confirmarGuardarAsistencia = () => {
        setShowSaveConfirm(true);
    };

    const guardarAsistencia = async () => {
        setShowSaveConfirm(false);
        try {
            await axios.post('http://192.168.5.63:5000/guardar_asistencia', presentes);
            Alert.alert('Éxito', 'Datos guardados con éxito');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo guardar la asistencia');
        }
    };

    useEffect(() => {
        obtenerPresentes();
    }, []);

    const handleActualizar = () => {
        setShowConfirm(true);
    };

    const confirmActualizar = () => {
        setShowConfirm(false);
        obtenerPresentes();
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>NIE: {item.nie}</Text>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Apellido: {item.apellido}</Text>
            <Text>Bachillerato: {item.bachillerato}</Text>
            <Text>Género: {item.genero}</Text>
            <Text>Año: {item.id_año}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={presentes}
                renderItem={renderItem}
                keyExtractor={(item) => item.nie.toString()}
                refreshing={loading}
                onRefresh={obtenerPresentes}
            />
            <Button title="Actualizar Datos" onPress={handleActualizar} />
            <Button title="Guardar Asistencia" onPress={confirmarGuardarAsistencia} />

            <Dialog.Container visible={showConfirm}>
                <Dialog.Title>Confirmar Actualización</Dialog.Title>
                <Dialog.Description>
                    ¿Estás seguro de que deseas actualizar los datos?
                </Dialog.Description>
                <Dialog.Button label="Cancelar" onPress={() => setShowConfirm(false)} />
                <Dialog.Button label="Actualizar" onPress={confirmActualizar} />
            </Dialog.Container>

            <Dialog.Container visible={showSaveConfirm}>
                <Dialog.Title>Confirmar Guardado</Dialog.Title>
                <Dialog.Description>
                    ¿Estás seguro de que deseas guardar estos datos en la tabla de asistencia?
                </Dialog.Description>
                <Dialog.Button label="Cancelar" onPress={() => setShowSaveConfirm(false)} />
                <Dialog.Button label="Guardar" onPress={guardarAsistencia} />
            </Dialog.Container>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
});

export default PresentesScreen;
