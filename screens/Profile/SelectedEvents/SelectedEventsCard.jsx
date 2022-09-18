import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AppText from '@Components/AppText';
import crash from '@Assets/crashIMG.png';
import { Like } from '@Components/Like';

export const statusEnum = {
  Admin: 'Admin',
  Manager: 'Manager',
  Owner: 'Owner',
};

const statusColor = (status) => {
  switch (status) {
    case statusEnum.Owner:
      return {
        bg: '#EFFFF6',
        color: '#6FCF97',
      };
    case statusEnum.Manager:
      return {
        bg: '#E6F9FF',
        color: '#56CCF2',
      };
    case statusEnum.Admin:
      return {
        bg: '#FFF5D7',
        color: '#F2C94C',
      };
    default:
      return {
        bg: '#EFFFF6',
        color: '#6FCF97',
      };
  }
};

const SelectedEventsCard = (props) => {
  const {
    name = '',
    date = '',
    location = '',
    timeCity = '',
    img,
    hiding,
    status,
    children,
  } = props;
  const theme = useTheme();
  const dateTime = timeCity || `${location.split(',')[0]} — ${date}`;

  return (
    <View style={styles(theme).container}>
      {status && (
        <View
          style={[
            styles(theme).status,
            { backgroundColor: statusColor(status).bg },
          ]}
        >
          <AppText
            style={{
              textTransform: 'uppercase',
              fontSize: 10,
              fontWeight: '800',
              color: statusColor(status).color,
            }}
          >
            {status}
          </AppText>
        </View>
      )}
      {hiding && <View style={styles(theme).hiding} />}
      <View style={styles(theme).containerImg}>
        <Image
          source={img || crash}
          style={{ height: '100%', width: 'auto', borderRadius: 15 }}
        />
      </View>
      <View style={styles(theme).info}>
        <View style={{ width: '70%' }}>
          <AppText style={styles(theme).textInfo}>{dateTime}</AppText>
          <AppText style={styles(theme).boldText}>{name}</AppText>
          <View style={{ marginTop: 'auto' }}>{children}</View>
        </View>
        <Like
          style={{ paddingTop: 0, zIndex: 3, right: 5 }}
          onPress={() => alert('like')}
        />
      </View>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: '#fff',
      borderRadius: 15,
      paddingHorizontal: 8,
      paddingVertical: 16,
      flexDirection: 'row',
      marginVertical: 5,
      justifyContent: 'space-between',
    },

    hiding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#F6F6F6',
      position: 'absolute',
      zIndex: 2,
      opacity: 0.6,
      borderRadius: 15,
    },

    status: {
      position: 'absolute',
      zIndex: 3,
      borderTopLeftRadius: 15,
      borderBottomRightRadius: 8,
      padding: 5,
    },

    containerImg: {
      width: 80,
      height: 80,
    },

    info: {
      width: '70%',
      paddingRight: '5%',
      flexDirection: 'row',
    },

    boldText: {
      color: theme.colors.text,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 19,
    },

    textInfo: {
      marginTop: 3,
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 17,
      color: theme.colors.text,
    },
  });

export default SelectedEventsCard;
