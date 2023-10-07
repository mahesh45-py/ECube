// CustomHeader.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CustomHeader = ({ title, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>E-Cube</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onBlur={handleSearch}
          onSubmitEditing={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,

    paddingHorizontal: 0, // Remove horizontal padding
    margin: 0, // Remove margin
    backgroundColor: 'skyblue', // Set the background color to sky blue
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Optional: You can set the text color to white
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
    // padding: 8,
    margin: 9,
    paddingLeft:10,
    backgroundColor: 'white', // Optional: You can set the input field background color
  },
});

export default CustomHeader;
