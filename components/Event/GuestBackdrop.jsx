import React, { useEffect, useState } from 'react';
import { Backdrop } from 'react-native-backdrop';
import { StyleSheet, View } from 'react-native';
import { Avatar } from '@Components/Profile/Avatar';
import userIMG from '@Assets/User.png';
import AppText from '@Components/AppText';
import useQuery from '@Hooks/useQuery';
import { guest } from '@/server';
import Toast from 'react-native-toast-message';

const GuestBackdrop = (props) => {
  const { isOpen = false, setIsOpen, guestId } = props;

  const [guestInfo, setGuestInfo] = useState(null);

  useEffect(() => {
    (async () => {
      if (!guestId) {
        return;
      }
      const { data, message, ok } = await useQuery(guest.getById(guestId));

      if (!ok) {
        Toast.show({
          type: 'error',
          text1: message,
        });
      }

      const item = data[0];

      setGuestInfo({
        avatar: item.user.avatar,
        name: item.user.name,
        surname: item.user.surname,
        eventsNum: 11,
        followingNum: 8,
      });
    })();
  }, [guestId]);

  return (
    <Backdrop
      visible={isOpen}
      handleClose={() => setIsOpen(false)}
      swipeConfig={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      }}
      animationConfig={{
        speed: 14,
        bounciness: 4,
      }}
      overlayColor='rgba(0,0,0,0.32)'
      containerStyle={{
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
      }}
    >
      <View style={style.guest}>
        <View style={style.avatarContainer}>
          <Avatar img={userIMG} styleWrap={style.avatarWrapper} />
        </View>
        <View style={style.container}>
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 5,
            }}
          >
            <AppText style={style.textCommon} size={18} weight={700}>
              {guestInfo?.name} {guestInfo?.surname}
            </AppText>
          </View>
          <View style={style.info}>
            <View style={style.infoItem}>
              <AppText
                style={[style.textCommon, { marginRight: 5 }]}
                weight={700}
              >
                {guestInfo?.eventsNum}
              </AppText>
              <AppText style={style.textCommon} size={12}>
                Events
              </AppText>
            </View>
            <View
              style={[
                style.infoItem,
                {
                  borderLeftWidth: 1,
                  borderColor: '#C4C4C4',
                },
              ]}
            >
              <AppText
                style={[style.textCommon, { marginRight: 5 }]}
                weight={700}
              >
                {guestInfo?.followingNum}
              </AppText>
              <AppText style={style.textCommon} size={12}>
                Following
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Backdrop>
  );
};

const style = StyleSheet.create({
  guest: {
    flexDirection: 'row',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  container: {},
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  textCommon: {
    color: '#5B5B5B',
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: '30%',
    alignItems: 'center',
  },
});

export default GuestBackdrop;
