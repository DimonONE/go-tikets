import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import AppText from '@Components/AppText';
import userIMG from '@Assets/User.png';
import GrayRounded from '@Components/AppButtons/GrayRounded';
import { Avatar } from '@Components/Profile/Avatar';
import useQuery from '@Hooks/useQuery';
import { guest } from '@/server';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const GuestItem = (props) => {
  const {
    id = null,
    name = '',
    ticketsNum = 0,
    ticketName = '',
    createDate = '',
    status = null,
    onSelectGuest,
    onChangeGuest,
  } = props;

  const isRequestStatus = status === 'request';
  const isDenied = status === 'denied';

  dayjs.extend(relativeTime);
  const time = createDate ? dayjs(createDate).fromNow(true) : '';

  const handleOnAccept = async () => {
    const { data, message, ok } = await useQuery(
      guest.setStatus({ id, status: 'accepted' })
    );

    if (!ok) {
      Toast.show({
        type: 'error',
        text1: message,
      });
      return;
    }

    onChangeGuest();
  };

  const handleOnDeny = async () => {
    const { data, message, ok } = await useQuery(
      guest.setStatus({ id, status: 'denied' })
    );

    if (!ok) {
      Toast.show({
        type: 'error',
        text1: message,
      });
      return;
    }

    onChangeGuest();
  };

  return (
    <View style={[style.guest, isDenied && style.guestDisable]}>
      <View style={style.avatarContainer}>
        <Pressable onPress={() => onSelectGuest(id)}>
          <Avatar
            img={userIMG}
            styleImageWrap={style.avatar}
            styleWrap={style.avatar}
          />
        </Pressable>
      </View>
      <View style={style.container}>
        <Pressable onPress={() => onSelectGuest(id)}>
          <View style={style.info}>
            <AppText style={style.textCommon} weight={700}>
              {name}
            </AppText>
            {!isRequestStatus ? (
              <AppText style={style.textCommon}>{ticketsNum} tickets</AppText>
            ) : (
              <>
                <AppText style={style.textCommon}>{ticketName}</AppText>
                <AppText style={style.textCommon} size={12} weight={300}>
                  {time}
                </AppText>
              </>
            )}
          </View>
        </Pressable>
        <View>
          {!isRequestStatus ? (
            <AppText style={style.textCommon}>{status}</AppText>
          ) : (
            <View style={style.buttons}>
              <GrayRounded onClick={handleOnAccept} style={{ marginRight: 5 }}>
                Accept
              </GrayRounded>
              <GrayRounded onClick={handleOnDeny} variant='outlined'>
                Deny
              </GrayRounded>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  guest: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    width: '100%',
  },
  guestDisable: {
    opacity: 0.5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '83%',
  },
  info: {
    flexDirection: 'column',
  },
  buttons: {
    flexDirection: 'row',
  },
  textCommon: {
    color: '#5B5B5B',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  avatarContainer: {
    width: '17%',
  },
});

export default GuestItem;
