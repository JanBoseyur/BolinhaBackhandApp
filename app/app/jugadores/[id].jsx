
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); 

export default function Jugador() {
  const [id, setId] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // Para almacenar los datos filtrados
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState('0');

  const toggleText = () => {
    setIsVisible(!isVisible);  // Cambia el estado (si el texto está visible o no)
  };

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

    <ScrollView style = {styles.body} contentContainerStyle = {styles.scrollViewContent}>

      <FlatList
        data = {filteredData}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({ item }) => (

          <View>

            <View style = {styles.fondoContainer}>
              <Image style = {styles.imagenFondo} source = {{ uri: item.imagen2 }}/>
            </View>

            <View style = {{ flexDirection: 'row', alignContent: 'center', alignSelf: 'center', }}>
              <Text style = {{ fontSize: 24, color: 'white', marginTop: 15 }}>{item.nombre}</Text>
            </View>

            <View style = {styles.containerBotonesSecciones}>

              <View style = {styles.containerBotonesSecciones}>
                <Button style = {{ showCancel: false, }} title = "Información" color = '#1c1e1e' onPress={() => setIsVisible('0')}/>
              </View>

              <View style = {styles.containerBotonesSecciones}>
                <Button style = {{ showCancel: false, }} title = "Palmarés" color = '#1c1e1e' onPress = {() => setIsVisible('1')}/>
              </View>

              <View style = {styles.containerBotonesSecciones}>
                <Button style = {{ showCancel: true, }} title = "Historial" color = '#1c1e1e' onPress = {() => setIsVisible('2')}/>
              </View>

            </View>

            {/* Botón de Información */}
            
            {isVisible === '0' && (

            <View>

              <View style = {styles.infoContainer}>

                <View style = {styles.infoContainer1}>
                  <MaterialCommunityIcons style = {styles.iconoDescripcion} name = "account" size = {31}/>
                  <Text style = {styles.tituloTexto}>Edad:</Text>
                  <Text style = {styles.descripcionTexto}>{item.edad}</Text>
                  <MaterialCommunityIcons style = {styles.iconoDescripcion} name = "flag" size = {31}/>
                  <Text style = {styles.tituloTexto}>Nacionalidad:</Text>
                  <Text style = {styles.descripcionTexto}>{item.nacionalidad}</Text>
                </View>

                <View style = {styles.infoContainer1}>
                  <MaterialCommunityIcons style = {styles.iconoDescripcion} name = "podium" size = {31}/>
                  <Text style = {styles.tituloTexto}>Ranking</Text>
                  <Text style = {styles.descripcionTexto}>{item.ranking}</Text>
                  <MaterialCommunityIcons style = {styles.iconoDescripcion} name = "trophy" size = {31}/>
                  <Text style = {styles.tituloTexto}>Trofeos</Text>
                  <Text style = {styles.descripcionTexto}>{item.trofeos}</Text>
                </View>
                
              </View>
        
              <View style = {styles.infoContainer2}>
                <MaterialCommunityIcons style = {{ color: 'white', marginRight: 15 }} name = "information" size = {30}/>
                <Text style = {{ textAlign: 'center', color: 'white', fontSize: 15, marginTop: 15 }}>{item.descripcion}</Text>
              </View>

            </View>

            )}

            {isVisible === '1' && (
              
              <MaterialCommunityIcons style = {{ color: 'white', marginRight: 15 }} name = "information" size = {30}/>

            )}

          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  body: {
    flex: 1,
    backgroundColor: '#353636',
  },


  fondoContainer: {
  },

  imagenFondo: {
    width: width,
    height: width * 0.6, 
  },

  containerBotonesSecciones: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    
    marginTop: 20, 
    marginHorizontal: 5,
    marginBottom: 0,
  },

  botonSecciones: {
    backgroundColor: '#1c1e1e', 

    width: (width / 3.3) - 5, 
    height: 50, 
    borderRadius: 10, 
    marginHorizontal: 4
  },

  botonTexto: {
    color: 'white'
  },

  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#1c1e1e',
    color: 'white',

    margin: 16,
    padding: 25,
    borderRadius: 10
  }, 

  infoContainer1: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    flexDirection: 'column',
    color: 'white',

    width: (width / 2) - 45,
    borderRadius: 10
  },

  infoContainer2: {
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1e1e',
    color: 'white',
    
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 100, // Sumar el margin que se le quiere dar + la altura de la navbar ya que considera la navbar
    padding: 20,
    borderRadius: 10
  },

  tituloTexto: {
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white',

    fontSize: 17,
  },

  descripcionTexto: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',

    marginBottom: 10
  },

  iconoDescripcion: {
    color: 'white',

    margin: 10,
  },

});
