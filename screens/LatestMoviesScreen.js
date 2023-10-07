import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { fetchLatestMovies } from '../apihandler';
import { Card, ListItem, Button, Icon } from 'react-native-elements'; // Import React Native Elements components
import { useNavigation } from '@react-navigation/native';
const LatestMoviesScreen = ({ navigations, searchText }) => {
    const [latestMovies, setLatestMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        // Fetch the latest movies when the component mounts
        const fetchMovies = async () => {
            try {
                const movies = await fetchLatestMovies();
                setLatestMovies(movies);
                // Initialize filtered movies with all movies and apply search filter
                const filtered = movies.filter((movie) =>
                    movie.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredMovies(filtered);
            } catch (error) {
                console.error('Error fetching latest movies:', error);
            }
        };

        fetchMovies();
    }, [searchText]); // Update filtered movies when searchText changes

    return (
        <View>
            <FlatList
                data={filteredMovies}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Card containerStyle={styles.cardContainer}>
                    <View style={styles.cardContent}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: 100, height: 150 }}
                      />
                      <View style={styles.movieInfo}>
                        <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                        <ListItem>
                          <Icon name="language" />
                          <ListItem.Content>
                            <ListItem.Title>Language: {item.language}</ListItem.Title>
                          </ListItem.Content>
                        </ListItem>
                        <ListItem>
                          <Icon name="movie" />
                          <ListItem.Content>
                            <ListItem.Title>Type: {item.type}</ListItem.Title>
                          </ListItem.Content>
                        </ListItem>
                        <ListItem>
                          <Icon name="star" />
                          <ListItem.Content>
                            <ListItem.Title>Rate: {item.rate}</ListItem.Title>
                          </ListItem.Content>
                        </ListItem>
                    
                      </View>
                    </View>
                    <Button
                          title="View Details"
                          onPress={() => navigation.navigate('MovieDetails', { movie: item })}
                        />
                  </Card>
                )}
            />
        </View>
    );
};

const styles = {
    cardContainer: {
      marginBottom: 20,
    },
    cardContent: {
      flexDirection: 'row', // Align items in a row
      alignItems: 'center', // Vertically center items
      justifyContent: 'space-between', // Space between image and movie info
    },
    movieInfo: {
      flex: 1, // Take the remaining space
      marginLeft: 10, // Add some spacing between image and info
    },
  };
export default LatestMoviesScreen;
