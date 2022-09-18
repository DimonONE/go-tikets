import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { TabsCustom } from '@Components/Tabs';
import { useNavigation } from '@react-navigation/native';
import AppText from '@Components/AppText';
import { Wrapper } from '@Components/Wrapper';
import useQuery from '@Hooks/useQuery';
import Toast from 'react-native-toast-message';
import { event } from '@/server';
import dayjs from 'dayjs';

import SelectedEventsCard, {
  statusEnum,
} from '@Screens/Profile/SelectedEvents/SelectedEventsCard';

const renderSkeletonItem = ({ item }) => (
  <Wrapper key={item.id} style={{ marginTop: 0 }}>
    <View style={styles.container}>
      <View style={styles.containerImg} />
      <View style={{ width: '100%', marginLeft: '4%' }}>
        <View style={[styles.content, { width: '45%' }]} />
        <View style={styles.content} />
        <View style={styles.content} />
        <View style={[styles.content, { width: '25%' }]} />
      </View>
    </View>
  </Wrapper>
);

const AllEventsTab = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, ok, message } = await useQuery(event.geEvents());

      if (ok) {
        const newData = data.map((item) => ({
          id: item.id,
          name: item.name,
          date: dayjs(item.createDate).format('MMM Do YYYY HH:mm'),
          location: item.address,
          isActiveLike: false,
          img: item.demoLinks[0],
        }));
        setCards(newData);
        setLoading(false);
      } else {
        Toast.show({
          type: 'error',
          text1: message,
        });
        setLoading(false);
        navigation.navigate('TabNavigation');
      }
    })();
  }, []);

  return (
    <View style={{ paddingBottom: 210 }}>
      {loading ? (
        <FlatList
          data={[{ id: 1 }, { id: 2 }]}
          renderItem={renderSkeletonItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={cards}
          renderItem={({ item }) => (
            <Pressable
              key={item.id}
              onPress={() => navigation.navigate('SelectedEvents')}
            >
              <SelectedEventsCard
                key={item.id}
                name={item.name}
                date={item.date}
                img={''}
                location={item.location}
                hiding
              >
                <View style={{ marginTop: 5, zIndex: 3 }}>
                  <Pressable onPress={() => alert('view reviews')}>
                    <AppText style={styles.viewReviews}>view reviews</AppText>
                  </Pressable>
                </View>
              </SelectedEventsCard>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

const MyEventsTab = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      name: '',
      date: '',
      location: '',
      reviews: '',
    },
  ]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, ok, message } = await useQuery(event.getMe());

      if (ok) {
        const newData = data.map((item) => ({
          id: item.id,
          name: item.name,
          date: dayjs(item.createDate).format('MMM Do YYYY HH:mm'),
          location: item.address,
          requests: '0',
          img: item.demoLinks[0],
        }));
        setCards(newData);
        setLoading(false);
      } else {
        Toast.show({
          type: 'error',
          text1: message,
        });
        setLoading(false);
        navigation.navigate('TabNavigation');
      }
    })();
  }, []);
  return (
    <View style={{ paddingBottom: 210 }}>
      {loading ? (
        <FlatList
          data={[{ id: 1 }, { id: 2 }]}
          renderItem={renderSkeletonItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={cards}
          renderItem={({ item }) => (
            <SelectedEventsCard
              key={item.id}
              name={item.name}
              date={item.date}
              location={item.location}
              hiding
              status={statusEnum.Manager}
            >
              <View style={{ marginTop: 5, zIndex: 3 }}>
                <Pressable onPress={() => alert('view reviews')}>
                  <AppText>
                    Requests: 100
                    <AppText style={{ color: '#FF9100' }}>{'   '}+200</AppText>
                  </AppText>
                </Pressable>
              </View>
            </SelectedEventsCard>
          )}
        />
      )}
    </View>
  );
};

const EventHistory = () => {
  const navigation = useNavigation();

  const [routes] = React.useState([
    { key: 'allEvents', title: 'All events' },
    { key: 'myEvents', title: 'My events' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'allEvents':
        return <AllEventsTab />;
      case 'myEvents':
        return <MyEventsTab />;
      default:
        return null;
    }
  };

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
          title='Event history'
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <TabsCustom renderScene={renderScene} routes={routes} />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: '#BDBDBD',
  },
  containerImg: {
    width: '45%',
    backgroundColor: '#5B5B5B',
    height: 102,
  },
  content: {
    width: '40%',
    height: 20,
    marginVertical: '1%',
    backgroundColor: '#5B5B5B',
  },

  viewReviews: {
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#4F4F4F',
  },
});

export default EventHistory;
