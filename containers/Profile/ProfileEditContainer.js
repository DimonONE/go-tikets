import GlobalLoader from '@Components/GlobalLoader';
import useQuery from '@Hooks/useQuery';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '@Screens/Profile/ProfileScreen';
import { user as userRequest } from '@Server';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import ProfileEdit from '@Screens/Profile/ProfileEdit';
import dayjs from 'dayjs';

const ProfileEditContainer = () => {
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      (async () => {
        setLoading(true);
        const { data, ok, message } = await useQuery(
          userRequest.getUserProfile()
        );

        if (ok) {
          const newData = {
            idCode: data.IDcode,
            birthday: dayjs(data.birthdate).format('YYYY-MM-DD'),
            ...data,
          };

          setValues(newData);
          setLoading(false);
        } else {
          Toast.show({
            type: 'error',
            text1: message,
          });
          setLoading(false);
        }
      })();
      setFetching(false);
    }
  }, [fetching]);

  if (loading) return <GlobalLoader />;

  if (!values) {
    return null;
  }

  return <ProfileEdit values={values} fetching={() => setFetching(true)} />;
};

export default ProfileEditContainer;
