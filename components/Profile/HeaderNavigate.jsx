import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { HeaderBack } from '../HeaderBack';
import notificationsIMG from '@Assets/notifications.png';
import shareIMG from '@Assets/share.png';
import AppText from '@Components/AppText';

export const HeaderNavigate = ({
  children,
  arrowBack = false,
  onBack,
  notifications = false,
  onNotifications,
  share = false,
  onShare,
  title,
  style,
}) => {
  return (
    <View style={[styles.topNavigate, style]}>
      {arrowBack && <HeaderBack onBack={onBack} />}
      {notifications && (
        <Pressable
          style={{ marginLeft: 'auto', height: 19 }}
          onPress={onNotifications}
        >
          <Image
            style={{ width: 14, height: '100%' }}
            source={notificationsIMG}
          />
        </Pressable>
      )}

      {title && (
        <View
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          <AppText
            style={{
              color: '#000000',
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            {title}
          </AppText>
        </View>
      )}

      {share && (
        <Pressable
          style={{ marginLeft: 'auto', height: 21.23 }}
          onPress={onShare}
        >
          <Image style={{ height: '100%' }} source={shareIMG} />
        </Pressable>
      )}
      {children}
    </View>
  );
};

export const HeaderNavigateSkeleton = ({
  notifications = false,
  share = false,
}) => {
  return (
    <View style={[styles.topNavigate]}>
      {notifications && (
        <View
          style={{
            marginLeft: 'auto',
            marginRight: 10,
            height: 19,
            width: 14,
            backgroundColor: '#BDBDBD',
          }}
        />
      )}

      {share && (
        <View
          style={{
            marginLeft: 'auto',
            marginRight: 10,
            height: 21.23,
            width: '40%',
            backgroundColor: '#BDBDBD',
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topNavigate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(49, 52, 63, 0.05)',
    height: 150,
  },
});
