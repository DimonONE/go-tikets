import { NotAuthorized } from '@/components/NotAuthorized';
import useQuery from '@Hooks/useQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen, {
  ProfileScreenSkeleton,
} from '@Screens/Profile/ProfileScreen';
import { user as userRequest } from '@/server';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { actions } from '@/actions';
import { useSnapshot } from 'valtio';
import { store } from '@/globalState';

const ProfileContainer = () => {
  const snap = useSnapshot(store);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, ok, message, status } = await useQuery(
        userRequest.getUserProfile()
      );

      if (ok) {
        setUser(data);
        setLoading(false);
        return;
      }
      if (status === 401) {
        setLoading(false);
        return;
      }
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: message,
      });
      navigation.navigate('TabNavigation');
    })();
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem('accessToken');
    actions.setAuthorized(false);
    actions.setAccessToken(null);
    setUser(null);
    navigation.navigate('SignIn');
  };

  if (loading) return <ProfileScreenSkeleton />;

  if (!snap.authorized) {
    return (
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NotAuthorized />
      </View>
    );
  }

  return <ProfileScreen user={user} logOut={logOut} />;
};

export default ProfileContainer;
