import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppText from '@Components/AppText';
import { Params, ParamsSkeleton } from '@Components/Profile/Params';
import { SwitchButton } from '@Components/SwitchButton';
import { Wrapper } from '@Components/Wrapper';

export const ParamsContainer = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const onBankAccounts = () => {
    navigation.navigate('Wallet');
  };

  const onFollowingOrganizers = () => {
    navigation.navigate('FollowingOrganizersList');
  };

  const onEventHistory = () => {
    navigation.navigate('EventHistory');
  };

  const onSelectedEvents = () => {
    navigation.navigate('SelectedEvents');
  };

  const onPrimaryCity = () => {
    alert('Primary city');
  };

  const onEditPersonalInfo = () => {
    navigation.navigate('ProfileEdit');
  };

  const onLanguage = () => {
    // alert('Language');
  };

  const onManageNotifications = () => {
    // alert('Manage notifications');
  };

  const onSupport = () => {
    // alert('onSupport');
  };

  const onAboutApp = () => {
    // navigation.navigate('OrganizerProfile', { defaultIndex: 1 });
    navigation.navigate('QRScaner');
  };

  return (
    <View>
      <View style={styles(theme).wrapper}>
        <AppText style={styles(theme).paramsTitle}>Profile</AppText>
        <Params text={'Wallet'} isArrow onPress={onBankAccounts} />
        <Params
          text={'Following organizers'}
          onPress={onFollowingOrganizers}
          contentWithRights={'45'}
          isArrow
        />
        <Params
          text={'Event history'}
          onPress={onEventHistory}
          contentWithRights={'0'}
          isArrow
        />
        <Params text={'Event statictics'} onPress={() => false} isArrow />
        <Params
          text={'Selected Events'}
          onPress={onSelectedEvents}
          contentWithRights={'16'}
          isArrow
        />
      </View>
      <View style={styles(theme).wrapper}>
        <Text style={styles(theme).paramsTitle}>Settings</Text>
        <Params
          text={'Primary city'}
          onPress={onPrimaryCity}
          contentWithRights={'Kharkiv'}
          isArrow
        />
        <Params
          text={'Edit personal info'}
          onPress={onEditPersonalInfo}
          isArrow
        />
        <Params
          text={'Language'}
          onPress={onLanguage}
          contentWithRights={'English'}
          isArrow
        />
        <Params
          text={'Manage notifications'}
          onPress={() => false}
          contentWithRights={<SwitchButton />}
        />
      </View>

      <View style={styles(theme).wrapper}>
        <Text style={styles(theme).paramsTitle}>Support</Text>
        <Params text={'Support'} onPress={onSupport} isArrow />
        <Params text={'About app'} onPress={onAboutApp} isArrow />
      </View>
    </View>
  );
};

export const ParamsContainerSkeleton = () => {
  const theme = useTheme();

  return (
    <View>
      <Text
        style={[styles(theme).paramsTitle, styles(theme).paramsTitleSkeleton]}
      />
      <ParamsSkeleton isArrow />
      <ParamsSkeleton contentWithRights />
      <ParamsSkeleton isArrow />
      <ParamsSkeleton contentWithRights />
      <Text
        style={[styles(theme).paramsTitle, styles(theme).paramsTitleSkeleton]}
      />
      <ParamsSkeleton contentWithRights />
      <ParamsSkeleton isArrow />
      <ParamsSkeleton contentWithRights />
      <ParamsSkeleton contentWithRights />
      <Text
        style={[styles(theme).paramsTitle, styles(theme).paramsTitleSkeleton]}
      />
      <ParamsSkeleton isArrow />
      <ParamsSkeleton isArrow />
    </View>
  );
};

const styles = ({ colors }) =>
  StyleSheet.create({
    wrapper: {
      marginTop: 24,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 15,
    },
    paramsTitle: {
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 19,
      color: colors.text,
    },
    paramsTitleSkeleton: { backgroundColor: '#5B5B5B', width: '30%' },
  });
