import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { useFetch } from '../../../hook/useFetch';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';

const Popularjobs = () => {
  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState();

  const { isLoading, error, data, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.job_id || `${index}`}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;