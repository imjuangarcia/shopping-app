import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => (
  <View style={{ ...styles.card, ...props.style }}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});

export default Card;
