import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { TabsCustom } from '@Components/Tabs';
import { useNavigation } from '@react-navigation/native';
import CardItem from '@Components/Profile/CardItem';
import AppText from '@Components/AppText';
import { Wrapper } from '@Components/Wrapper';
import { Like } from '@Components/Like';
import useQuery from '@Hooks/useQuery';
import Toast from 'react-native-toast-message';
import { NextButton } from '@Components/NextButton';
import { SearchBackdrop } from '@Components/Home/SearchBackdrop';
import { event } from '@/server';
import dayjs from 'dayjs';
import edit from '@Assets/edit.svg';
import { SvgXml } from 'react-native-svg';

const EnumEvents = {
  DiscoverEvents: 'discoverEvents',
  CreateEvents: 'createEvents',
};

const AllEventsTab = () => {
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
          reviews: '0',
          isActiveLike: false,
          //доделать как будет готов бек
          demoLinks: item.demoLinks.map((item, index) => ({
            id: index,
            img: item,
            link: 'item',
          })),
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
    <FlatList
      data={cards}
      renderItem={({ item }) => (
        <Pressable
          key={item.id}
          onPress={() => navigation.navigate('EventInfo', { eventId: 1 })}
        >
          <CardItem
            key={item.id}
            name={item.name}
            date={item.date}
            location={item.location}
            images={item.demoLinks}
          >
            <View style={{ marginTop: 5 }}>
              <Pressable onPress={() => alert('view reviews')}>
                <AppText style={styles.viewReviews}>view reviews</AppText>
              </Pressable>
              <Like
                style={{ paddingTop: 0, marginTop: -5, right: 0 }}
                onPress={() => alert('like')}
              />
            </View>
          </CardItem>
        </Pressable>
      )}
    />
  );
};

const MyEventsTab = () => {
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
          reviews: '0',
          isActiveLike: false,
          bonus: '+200$',
          //доделать как будет готов бек
          demoLinks: item.demoLinks.map((item, index) => ({
            id: index,
            img: item,
            link: 'item',
          })),
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
    <View>
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <CardItem
            key={item.id}
            name={item.name}
            date={item.date}
            location={item.location}
            values={{ name: 'Reviews', value: item.reviews }}
            images={item.demoLinks}
            editComponents={
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <Pressable
                  style={{ width: 22, height: 20 }}
                  onPress={() => false}
                >
                  <SvgXml xml={edit} />
                </Pressable>
                <AppText>{item.bonus}</AppText>
              </View>
            }
          />
        )}
      />
    </View>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '7%',
};

const Events = () => {
  const navigation = useNavigation();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [selectedSort, setSelectedSort] = useState({
    label: 'All',
    value: 'all',
  });

  const [radioButtons] = useState([
    {
      id: '1',
      label: 'All',
      value: 'all',
      containerStyle,
      selected: true,
    },
    {
      id: '2',
      label: 'Favourites',
      value: 'favourites',
      containerStyle,
    },
    {
      id: '3',
      label: 'Past',
      value: 'past',
      containerStyle,
    },
    {
      id: '4',
      label: 'Future',
      value: 'future',
      containerStyle,
    },
  ]);

  const [activeTab, setActiveTab] = useState({
    key: EnumEvents.DiscoverEvents,
    value: 'Go discover events',
  });
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

  const onClick = (key) => {
    switch (key) {
      case EnumEvents.DiscoverEvents: {
        return;
      }
      case EnumEvents.CreateEvents: {
        navigation.navigate('CreateEvent');
      }
      default:
        return;
    }
  };

  try {
    return (
      <Wrapper style={{ height: '90%' }}>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AppText
            style={{
              color: '#000000',
              fontSize: 24,
              lineHeight: 28,
              fontWeight: '700',
            }}
          >
            Events
          </AppText>

          {activeTab.key === EnumEvents.DiscoverEvents && (
            <Pressable onPress={() => setShowBackdrop(false)}>
              <AppText
                style={{
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}
              >
                Sort by: {selectedSort.label}
              </AppText>
            </Pressable>
          )}
        </View>

        <View style={{ marginBottom: 'auto', paddingBottom: 110 }}>
          <TabsCustom
            renderScene={renderScene}
            routes={routes}
            onSelect={(index) =>
              setActiveTab((prev) =>
                index === 0
                  ? {
                      key: EnumEvents.DiscoverEvents,
                      value: 'Go discover events',
                    }
                  : {
                      key: EnumEvents.CreateEvents,
                      value: 'Create event',
                    }
              )
            }
          />
        </View>
        <NextButton onPress={() => onClick(activeTab.key)}>
          {activeTab.value}
        </NextButton>
        <SearchBackdrop
          setShowBackdrop={setShowBackdrop}
          showBackdrop={showBackdrop}
          setSelectedSort={setSelectedSort}
          values={radioButtons}
        />
      </Wrapper>
    );
  } catch (error) {
    console.log('ERROR', error);
    return null;
  }
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

export default Events;
