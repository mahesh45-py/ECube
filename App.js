import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LatestMoviesScreen from './screens/LatestMoviesScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import TicketBookingScreen from './screens/TicketBookingScreen';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [searchText, setSearchText] = useState('');


  // Update the filteredMovies whenever the searchText changes

  const handleSearch = (e) => {
    console.log(e)
    setSearchText(e)
  };


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: 'skyblue',
        },
      }} initialRouteName="LatestMovies">
        <Stack.Screen name="LatestMovies" options={{
          headerTitle: () => <Text style={styles.title}>E-Cube</Text>,
          headerRight: () => <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onBlur={handleSearch}
              onSubmitEditing={handleSearch}
            />
          </View>
        }}>
          {() => <LatestMoviesScreen  searchText={searchText}  />}
        </Stack.Screen>
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="TicketBooking" component={TicketBookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 0.7,
    marginLeft: 8,
    borderWidth: 1,
    borderRadius: 8,
    margin: 9,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
});

export default App;
