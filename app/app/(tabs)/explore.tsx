
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import CountryFlag from "react-native-country-flag";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); 

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <ScrollView style = {styles.body}>
      {loading ? (
        <Text>Cargando Jugadores...</Text>
      ) : (
        
        <FlatList
          data = {data}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = {({ item }) => (
            
            <View style = {styles.infoContainer}>

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

            </View>

          )}
          numColumns = {2} 
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  body: {
    alignSelf: 'center',
    backgroundColor: '#353636',

    marginTop: 80,
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

    marginHorizontal: 28
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
    fontSize: 18,
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
  }

});
