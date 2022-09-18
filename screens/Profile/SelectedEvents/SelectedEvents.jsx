import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Wrapper } from '@Components/Wrapper';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import AppText from '@Components/AppText';
import { Like } from '@Components/Like';
import SelectedEventsCard from '@Screens/Profile/SelectedEvents/SelectedEventsCard';
import { profile } from '@/server';

const SelectedEvents = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'Rhythm Büro: Natura 2022',
      date: 'Jul 3th 2022, 19:99',
      location: 'Kyiv, Soborna, 6',
      reviews: '100',
    },
  ]);

  useEffect(() => {
    (async function () {
      // const res = await profile.getSelectedEvents();
      // console.log('res', res);
      // setCards();
    })();
  }, []);

  return (
    <Wrapper>
      <View style={{ marginBottom: 32 }}>
        <HeaderNavigate
          style={{
            backgroundColor: 'inherit',
            height: 20,
          }}
          arrowBack
          onBack={() => navigation.navigate('Profile')}
          title='Selected events'
        />
      </View>

      <View style={{ height: 600 }}>
        <FlatList
          data={cards}
          renderItem={({ item }) => (
            <SelectedEventsCard
              key={item.id}
              name={item.name}
              date={item.date}
              location={item.location}
              img={''}
            >
              <View style={{ marginTop: 5 }}>
                <Pressable onPress={() => alert('view reviews')}>
                  <AppText style={styles.viewReviews}>view reviews</AppText>
                </Pressable>
              </View>
            </SelectedEventsCard>
          )}
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  viewReviews: {
    fontWeight: '600',
    fontSize: 12.843,
    lineHeight: 17,
    letterSpacing: 0.183471,
    textTransform: 'uppercase',
    color: '#4F4F4F',
  },
});

export default SelectedEvents;
