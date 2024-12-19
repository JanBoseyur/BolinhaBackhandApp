
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window'); 

export default function Jugador() {
  const [id, setId] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Para almacenar los datos filtrados
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdAndData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('selectedPlayerId');
        if (storedId) {
          setId(storedId);

          // Realizar la consulta con el ID leído
          const response = await fetch(`http://192.168.2.156:5000/jugadores/${storedId}`);
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }

          const result = await response.json();
          
          // Ver los datos en consola
          console.log('Datos recibidos desde la API:', result);

          setFilteredData([result]); // Guardar los datos en filteredData (puede ser un arreglo con un solo elemento)
        }
      } catch (error) {
        console.error('Error al obtener el ID o los datos:', error);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchIdAndData();
  }, []);

  return (
    <View style = {styles.body}>

      <FlatList
        data = {filteredData}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({ item }) => (

          <View style = {styles.itemContainer}>
            <Image style = {styles.imagenFondo} source = {{ uri: item.imagen2 }}/>
          </View>

        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  body: { 
    backgroundColor: '#353636' 
  },

  imagenFondo: {
    width: width,
    height: 500
  },

});
