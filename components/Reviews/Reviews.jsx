import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '@Components/AppText';
import ReviewItem from '@Components/Reviews/ReviewItem';

const Reviews = ({ reviews }) => {
  return (
    <View>
      <View>
        <AppText style={styles.textCommon} size={16} weight={700}>
          Reviews
        </AppText>
      </View>
      <View>
        {reviews.map((review) => (
          <ReviewItem {...review} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textCommon: {
    color: '#5B5B5B',
  },
});

export default Reviews;
