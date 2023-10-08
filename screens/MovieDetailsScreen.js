import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Image, ListItem, Icon, Button } from 'react-native-elements';
import { fetchMovieDetailsById } from '../apihandler'; // Import your apihandler function

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Function to fetch movie details by ID
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetailsById(movie._id);
        setMovieDetails(details[0])
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [movie.id]);

  return (
    <View style={styles.container}>
        {/* <Button title="Solid" type="solid" loading /> */}
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: movie.imageUrl }}
            style={styles.movieImage}
          />
        </View>
        <View style={styles.detailsContainer}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}} >
            <Text style={styles.movieTitle}>{movie.name}</Text>
            <Text style={styles.movieTitle}> 09-10-2023</Text>
            </View>
          
          {movieDetails ? (
            <>
            <ListItem>
                <Icon name="schedule" />
                <ListItem.Content>
                  <ListItem.Title>Duration: 2h 30mins</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <Icon name="star" />
                <ListItem.Content>
                  <ListItem.Title>Ratings: {movieDetails.rate}/5</ListItem.Title>
                </ListItem.Content>
              </ListItem>
              
              <ListItem>
                  <Icon name="local-movies" />
                  <ListItem.Content>
                    <ListItem.Title>Genre: {movieDetails.type}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
                <ListItem>
                  <Icon name="language" />
                  <ListItem.Content>
                    <ListItem.Title>Language: {movieDetails.language}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
             
              <Button
            title="Book Now"
            onPress={() => navigation.navigate('TicketBooking', { movie: movieDetails })}
          />
            </>
          ): <Button title="Solid" type="solid" loading />}
          
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  movieImage: {
    width: 150,
    height: 200,
  },
  detailsContainer: {
    padding: 16,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MovieDetailsScreen;
