import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HeaderNavigate } from '@Components/Profile/HeaderNavigate';
import AppText from '@Components/AppText';
import { Wrapper } from '@Components/Wrapper';
import userIMG from '@Assets/User.png';

const Item = (props) => {
  const { name, img, message, time } = props;

  const onClick = () => {
    alert('onPress');
  };
  return (
    <Pressable style={styles.cardOrganizers} onPress={onClick}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={img ? img : userIMG} />
        </View>
        <View>
          <AppText style={styles.name}>{name}</AppText>
          <View style={styles.messageContainer}>
            <AppText style={[styles.name, styles.message]}>{message}</AppText>
          </View>
          <AppText style={styles.time}>{time}</AppText>
        </View>
      </View>
    </Pressable>
  );
};

const NotificationsScene = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Emilia Clarke',
      message:
        'accepted your request on event “Rhythm Büro: Natura 2021”. Your tickets you can find in Tickets',
      time: '25 min',
      img: userIMG,
    },
    {
      id: 2,
      name: 'Emilia Clarke',
      message:
        'accepted your request on event “Rhythm Büro: Natura 2021”. Your tickets you can find in Tickets accepted your' +
        ' request on event “Rhythm Büro: Natura 2021”. Your tickets you can find in Tickets accepted your request' +
        ' on event “Rhythm Büro: Natura 2021”. Your tickets you can find in Tickets',
      time: '25 min',
      img: userIMG,
    },
    {
      id: 3,
      name: 'Emilia Clarke',
      message:
        'accepted your request on event “Rhythm Büro: Natura 2021”. Your tickets you can find in Tickets',
      time: '25 min',
      img: userIMG,
    },
  ]);
  return (
    <SafeAreaView>
      <ScrollView>
        <Wrapper>
          <View>
            <HeaderNavigate
              style={{
                backgroundColor: 'inherit',
                height: 20,
                marginBottom: 21,
              }}
              arrowBack
              onBack={() => navigation.navigate('Profile')}
            />
            <AppText
              style={{
                color: '#000000',
                fontSize: 24,
                lineHeight: 28,
                fontWeight: '700',
              }}
            >
              Notifications
            </AppText>
          </View>
          <View>
            {items.map((item) => (
              <Item
                key={item.id}
                img={item.img}
                name={item.name}
                message={item.message}
                time={item.time}
              />
            ))}
          </View>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardOrganizers: {
    marginTop: 10,
  },

  wrapper: {
    flexDirection: 'row',
  },

  imageWrap: {
    width: 48,
    height: 48,
    marginRight: 18,
  },

  image: {
    width: 'auto',
    height: '100%',
  },

  name: {
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 19,
    color: '#5B5B5B',
  },

  messageContainer: {
    width: '90%',
  },

  message: {
    fontWeight: '300',
  },

  time: {
    color: '#5B5B5B',
    fontWeight: '300',
    fontSize: 10,
    lineHeight: 19,
  },
});

export default NotificationsScene;
