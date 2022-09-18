import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import { Avatar } from '@Components/Profile/Avatar';
import { ButtonFollowing } from '@Components/Profile/ButtonFollowing';
import { TabsCustom } from '@Components/Tabs';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SceneMap } from 'react-native-tab-view';
import AppText from '@Components/AppText';
import { HeaderBack } from '@Components/HeaderBack';
import arrowLeftWhite from '@Assets/svg/navigation/arrowLeftWhite.svg';
import sharingWhite from '@Assets/svg/sharingWhite.svg';
import SelectedEventsCard from '@Screens/Profile/SelectedEvents/SelectedEventsCard';
import { user } from '@/server';
import * as events from 'events';
import dayjs from 'dayjs';
import { Pressable } from 'react-native';

const EventsRoute = (props) => {
  const cards = useMemo(() => props.events, [props.events]);

  return (
    <View style={{ height: 400 }}>
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <SelectedEventsCard
            key={item.id}
            name={item.name}
            timeCity={item.timeCity}
            img={item.img}
          >
            <Pressable onPress={() => false}>
              <AppText
                style={{
                  fontSize: 14,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  color: '#FF9100',
                }}
              >
                buy tickets
              </AppText>
            </Pressable>
          </SelectedEventsCard>
        )}
      />
    </View>
  );
};

const AboutRoute = () => (
  <AppText
    style={{
      marginTop: 40,
      color: '#000000',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 19,
    }}
  >
    Vestibulum lorem sed risus ultricies tristique nulla aliquet. Tortor
    condimentum laciniaquis vel eros donec tortor condimentum. Vestibulum lorem
    sed risus ultricies tristique nulla aliquet. Tortor condimentum laciniaquis
    vel eros donec tortor condimentum. Vestibulum lorem sed risus ultricies
    tristique nulla aliquet. Tortor condimentum lacinia quis vel eros donec
    tortor condimentum.
  </AppText>
);

const OrganizerProfile = (props) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [routes] = React.useState([
    { key: 'events', title: 'Events' },
    { key: 'about', title: 'About' },
  ]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    following: false,
    countFollowers: 0,
    avatar: '',
    events: [],
  });

  const renderScene = SceneMap({
    events: () => <EventsRoute events={userInfo.events} />,
    about: AboutRoute,
  });

  useEffect(() => {
    (async function () {
      const { data } = await user.getUser(1);
      console.log('res', data);
      setUserInfo({
        name: data.name,
        following: false,
        countFollowers: 0,
        avatar: data.avatar,
        events: data['events'].map((item) => ({
          id: item.id,
          name: item.name,
          timeCity: `${item.address.split(',')[0]} — ${dayjs(
            item.createDate
          ).format('MMM D, HH:mm')}`,
          isLike: false,
          img: item?.demoLinks[0],
        })),
      });
    })();
  }, []);

  return (
    <View>
      <HeaderNavigate
        style={{
          backgroundColor: '#000000',
          paddingHorizontal: 25,
        }}
      >
        <HeaderBack
          arrowIconXml={arrowLeftWhite}
          onBack={() => navigation.navigate('Profile')}
        />
        <HeaderBack
          arrowIconXml={sharingWhite}
          onBack={() => navigation.navigate('Profile')}
        />
      </HeaderNavigate>

      <View style={styles(theme).containerHeading}>
        <View style={styles(theme).container}>
          <Avatar name={userInfo.name} img={userInfo.avatar} />
          <View style={styles(theme).infoContent}>
            <Text style={styles(theme).infoCount}>
              {userInfo.countFollowers} followers
            </Text>
            <ButtonFollowing onPress={() => false} />
          </View>
        </View>
      </View>

      <SafeAreaView>
        <View style={{ marginTop: 20, paddingHorizontal: '5%' }}>
          <TabsCustom
            renderScene={renderScene}
            routes={routes}
            defaultIndex={0}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: -40,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },

    containerHeading: {
      display: 'flex',
      marginTop: -40,

      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingLeft: 25,
      paddingRight: 25,
      backgroundColor: theme.background,
    },

    infoContent: {
      marginTop: 5,
      alignItems: 'center',
      width: '100%',
    },

    infoCount: {
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 18,
      color: '#000000',
    },
  });

export default OrganizerProfile;
