import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useFetch } from '../../../hook/useFetch';

import styles from './nearbyjobs.style';
import { COLORS, SIZES } from '../../../constants';

const Nearbyjobs = () => {
  const router = useRouter();

  const { isLoading, error, data, refetch } = useFetch('search', {
    query: 'React Native developer',
    num_pages: 1,
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          data.map((job) => (
            <NearbyJobCard
              key={`nearby-job-${job.job_id}`}
              item={job}
              handleCardPress={handleCardPress}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
