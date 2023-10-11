import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './screenheader.style';

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  const onPress = () => {
    if (handlePress) {
      handlePress();
    }
  };
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
