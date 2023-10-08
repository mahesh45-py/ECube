import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Input, Card, Overlay } from 'react-native-elements'; // Import Overlay component
import QRCODE from './QRCODE';


const TicketBookingScreen = ({ route, navigation }) => {
    const { movie } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [numberOfTickets, setNumberOfTickets] = useState('');
    const [productQRref, setProductQRref] = useState();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false); // Control the visibility of the overlay

    const handleConfirmBooking = () => {
        // You can add validation logic here to ensure all fields are filled
        if (name.trim() === '' || email.trim() === '' || numberOfTickets.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Once validation passes, set isConfirmed to true
        setIsConfirmed(true);

        // Show the overlay
        setOverlayVisible(true);
    };

    // Function to hide the overlay
    const hideOverlay = () => {
        setOverlayVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text h3>Ticket Booking</Text>
            <Text h4>Selected Movie: {movie.name}</Text>
            <Card containerStyle={styles.card}>
                <Text h4>Movie Details:</Text>
                <Text>Genre: {movie.type}</Text>
                <Text>Language: {movie.language}</Text>
                <Text>Ratings: {movie.rate}/5</Text>
            </Card>

            {/* Input fields for user questions */}
            <Input
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                containerStyle={styles.inputContainer}
            />
            <Input
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                containerStyle={styles.inputContainer}
                keyboardType="email-address"
            />
            <Input
                placeholder="Number of Tickets"
                value={numberOfTickets}
                onChangeText={(text) => setNumberOfTickets(text)}
                containerStyle={styles.inputContainer}
                keyboardType="numeric"
            />

            {/* Button to confirm booking */}
            <Button
                title="Confirm Booking"
                onPress={handleConfirmBooking}
            />

            {isConfirmed && (
                <Overlay isVisible={isOverlayVisible} onBackdropPress={hideOverlay}>
                    <View style={styles.overlayContent}>
                        <Text style={styles.overlayText}>Your booking is confirmed! Enjoy the movie.</Text>

                        <QRCODE
                            value={JSON.stringify({
                                name: name,
                                email: email,
                                movie: movie.name,
                                numberOfTickets:numberOfTickets
                            })}
                            getRef={(c) => setProductQRref(c)} />
                        <Text style={styles.overlayText}>Scan this QR code at the entrance.</Text>
                        <Button
                            title="Close"
                            onPress={hideOverlay}
                        />
                    </View>
                </Overlay>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        marginVertical: 10,
        padding: 10,
    },
    inputContainer: {
        marginVertical: 10,
    },
    confirmationText: {
        marginTop: 20,
        fontSize: 18,
    },
    qrCode: {
        width: 150,
        height: 150,
        marginTop: 20,
    },
    overlayContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    overlayText: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default TicketBookingScreen;
