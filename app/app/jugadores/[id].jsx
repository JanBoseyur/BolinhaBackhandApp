
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryFlag from "react-native-country-flag";

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

          <View>

            <View style = {styles.fondoContainer}>
              <Image style = {styles.imagenFondo} source = {{ uri: item.imagen2 }}/>
            </View>

            <View style = {styles.infoContainer}>

              <View style = {styles.infoContainer1}>
                <Text style = {styles.edadTituloTexto}>Edad:</Text>
                <Text style = {styles.edadTexto}>{item.edad}</Text>
              </View>

              <View style = {styles.infoContainer1}>
                <Text style = {styles.edadTituloTexto}>Nacionalidad:</Text>
                <Text style = {styles.edadTexto}>{item.nacionalidad}</Text>
              </View>

              <View style = {styles.infoContainer1}>
                <Text style = {styles.edadTituloTexto}>Edad:</Text>
                <Text style = {styles.edadTexto}>{item.edad}</Text>
              </View>
              
            </View>
            
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  body: { 
    flex: 1,
    backgroundColor: '#353636'
  },

  fondoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  imagenFondo: {
    width: width,
    height: 300,
    filter: 'grayscale(100%) brightness(79%)',
  },

  infoContainer: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#1c1e1e',
    color: 'white',

    margin: 25,
    padding: 20,
    borderRadius: 10
  }, 

  infoContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#565656',
    color: 'white',

    padding: 10,
    borderRadius: 10
  },

  edadTituloTexto: {
    fontWeight: 'bold',
    marginRight: 50
  }

});
