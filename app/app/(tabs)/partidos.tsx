
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import CountryFlag from "react-native-country-flag";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window'); 

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(''); 
  const router = useRouter();

  // Función para obtener datos desde la API
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.2.156:5000/jugadores');
      const result = await response.json();
      setData(result); // Asignar los datos a la lista
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  // Guardar ID en AsyncStorage
  const handlePress = async (id) => {
    try {
      await AsyncStorage.setItem('selectedPlayerId', id.toString());
      router.push(`/jugadores/${id}`);
    } catch (error) {
      console.error('Error al guardar el ID:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <View style = {styles.body}>

      <View style = {styles.inputText}>

        <MaterialCommunityIcons style = {{ color: 'white', alignSelf: 'center' }} name = "tennis" size = {31}/>
        
        <TextInput
          style = {styles.textoInput}
          placeholder = "Buscar jugadores..."
          placeholderTextColor = "white"
          value = {searchText}
          onChangeText = {setSearchText} 
        />

      </View>

      <ScrollView>
        
      {loading ? (
        <Text>Cargando Jugadores...</Text>
      ) : (
               
        <FlatList
          data = {filteredData} 
          keyExtractor = {(item, index) => index.toString()}
          renderItem = {({ item }) => (
            
            <TouchableOpacity style = {styles.infoContainer} onPress = {() => handlePress(item.id)}>

              <View style = {styles.infoContainer1}>
                
                <View style = {styles.trofeosContainer}>
                  <MaterialCommunityIcons style = {styles.iconoTrofeo} name = "trophy" size = {28}/>
                  <Text style = {styles.trofeosTexto}>{item.trofeos}</Text>
                </View>

                <View style = {styles.flagContainer}>
                  <CountryFlag style = {styles.bandera} isoCode = {item.flag} size = {18}/>
                </View>

                <View style = {styles.puntosContainer}>
                  <MaterialCommunityIcons style = {styles.iconoTrofeo} name = "account" size = {31}/>
                  <Text style = {styles.trofeosTexto}>{item.puntos}</Text>
                </View>

              </View>

              <View style = {styles.jugadorContainer}>

                <Image style = {styles.image} source = {{ uri: item.imagen1 }}/>
                <Text style = {styles.RankingTexto}>{item.ranking}</Text>
                <Text style = {styles.nombreTexto}>{item.nombre}</Text>

              </View>

            </TouchableOpacity>

          )}
          numColumns = {2} 
        />
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  body: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#353636',
  },

  // Container Bandera, Ranking y Nombre

  infoContainer: {
    margin: 10,
    backgroundColor: '#1c1e1e',

    borderRadius: 15
  },

  // Container Icono, Trofeos y Puntos 

  infoContainer1: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',

    marginBottom: -20
  },

  // Container Icono Trofeo y Cantidad

  trofeosContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  flagContainer: {
    flexDirection: 'column',
    justifyContent: 'center',

    marginHorizontal: 25
  },

  // Container Puntos

  puntosContainer: {
    flexDirection: 'column',
    
    justifyContent: 'center',
  },

  jugadorContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: (width / 2) - 20,
    
  },

  image: {
    width: (width / 2) - 20,
    height: 300,
  },

  RankingTexto: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',

    marginTop: 18,
    fontSize: 23,
  },

  nombreTexto: {
    textAlign: 'center',
    color: 'white',

    marginTop:8,
    marginBottom: 15
  },

  bandera: {
    alignSelf: 'center',
  },

  trofeosTexto: {
    alignSelf: 'center',
    color: 'white',

    marginBottom: 10
  },

  iconoTrofeo: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 20,
  },

  inputText: {
    borderColor: 'white',
    color: 'white',

    padding: 5,
    width: '70%',
    marginTop: 70,
    marginBottom: 20,
    borderBottomWidth: 2,
  },

  textoInput: {
    textAlign: 'center',
    color: 'white',
  },

});
