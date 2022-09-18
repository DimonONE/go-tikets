import { AppInput } from '@/components/NewAppInput';
import AppText from '@/components/AppText';
import { Wrapper } from '@/components/Wrapper';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import plusIcon from '@/assets/plusIcon.svg';
import orangeLocationIcon from '@/assets/orangeLocationIcon.svg';
import { SwitchButton } from '@Components/NewSwitchButton';
import redCircleCloseIcon from '@/assets/svg/redCircleCloseIcon.svg';
import * as DocumentPicker from 'expo-document-picker';
import toast from 'react-native-toast-message';

import CheckBox from 'react-native-check-box';
import { HeaderNavigate } from '@/components/Profile/HeaderNavigate';
import { AppIconInput } from '@/components/NewAppIconInput';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NextButton } from '@/components/NextButton';
import useQuery from '@/hooks/useQuery';
import { event } from '@/server';
import AccessToEvent from './AccessToEvent';

const AddButton = ({ text, onPress, style }) => (
  <Pressable
    onPress={onPress}
    style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
  >
    <SvgXml xml={plusIcon} style={{ marginRight: 10 }} />
    <AppText
      size={14}
      weight={500}
      style={{ color: '#FF9100', textTransform: 'uppercase' }}
    >
      {text}
    </AppText>
  </Pressable>
);

const EventInput = ({
  multiline,
  numberOfLines,
  styleInput,
  label,
  onChangeText,
  value,
  textAlignVertical,
}) => (
  <AppInput
    multiline={multiline}
    numberOfLines={numberOfLines}
    styleInput={[{ marginBottom: 8 }, styleInput]}
    label={label}
    textAlignVertical={textAlignVertical}
    onChangeText={onChangeText}
    value={value}
  />
);

const TicketsSubtitle = ({ children }) => (
  <View style={{ marginBottom: 10, marginLeft: 14 }}>
    <AppText size={14}>{children}</AppText>
  </View>
);

const ContentWithSwitchButton = ({ title, text, active, setActive }) => (
  <View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <AppText weight={500} size={16}>
        {title}
      </AppText>
      <SwitchButton
        style={{ padding: 0, margin: 0 }}
        active={active}
        setActive={setActive}
      />
    </View>
    <View style={{ maxWidth: '70%' }}>
      <AppText weight={400} size={14}>
        {text}
      </AppText>
    </View>
  </View>
);

const Line = ({ style }) => (
  <View
    style={[{ backgroundColor: '#DCDCDC', height: 1, width: '100%' }, style]}
  />
);

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [minAge, setMinAge] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([
    {
      id: 1,
      type: '',
      name: '',
      earlyPrice: '',
      earlyQuantity: '',
      regularPrice: '',
      regularQuantity: '',
      lastPrice: '',
      lastQuantity: '',
    },
  ]);
  const [showAccessToEvent, setShowAccessToEvent] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState([]);

  useEffect(() => {
    if (minAge) {
      setRequiredOptionsCheckBoxes((prev) =>
        prev.map((element) =>
          element.value === 'Age' ? { ...element, active: true } : element
        )
      );
    } else {
      setRequiredOptionsCheckBoxes((prev) =>
        prev.map((element) =>
          element.value === 'Age' ? { ...element, active: false } : element
        )
      );
    }
  }, [minAge]);

  const addTicketType = () => {
    setTicketTypes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: '',
        name: '',
        earlyPrice: '',
        earlyQuantity: '',
        regularPrice: '',
        regularQuantity: '',
        lastPrice: '',
        lastQuantity: '',
      },
    ]);
  };

  const chooseDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'video/*'],
      copyToCacheDirectory: true,
    });

    if (result.size > 100000) {
      return toast.show({ type: 'error', text1: 'Very big size of file' });
    }

    if (result.type === 'success') {
      const { name, size, uri, mimeType } = result;
      const fileToUpload = {
        id: filesToUpload.length + 1 + Date.now(),
        name,
        size,
        uri,
        type: mimeType,
      };
      setFilesToUpload((prev) => [...prev, fileToUpload]);
    }
  };

  const removeDocument = (id) => {
    setFilesToUpload((prev) => prev.filter((file) => file.id !== id));
  };

  const changeTicketType = (id, inputName, value) => {
    setTicketTypes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [inputName]: value } : item
      )
    );
  };

  const addBankAccountInput = () => {
    setBankAccounts((prev) => [...prev, { id: prev.length + 1, value: '' }]);
  };

  const onBankAccountInputChange = (id, value) =>
    setBankAccounts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );

  const create = () => {
    const eventType = getActiveTypes();
    const requiredOptions = getActiveRequiredOptions();

    requiredOptions.minRequiredAge = minAge;

    // todo change hardcode

    const location = {
      lat: 48.187019,
      lon: 23.88558,
    };
    const tickets = ticketTypes.map((ticket) => ({
      type: ticket.type,
      name: ticket.name,
      price: ticket.regularPrice,
      preOrderPrice: ticket.earlyPrice,
      lastChancePrice: ticket.lastPrice,
      // preOrderCount: ticket.earlyQuantity,
      // regularCount: ticket.regularQuantity,
      totalCount: ticket.regularQuantity,
      // lastChanceQuantity: ticket.lastQuantity,
    }));

    const coupons = [];
    const editors = [];

    const parsedStartDate = new Date(startDate).toISOString();
    const parsedEndDate = new Date(endDate).toISOString();

    const res = useQuery(
      event.create({
        name,
        description,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        filesToUpload,
        type: eventType,
        bank: bankAccounts, // todo change that code to bankAccounts
        address,
        isPrivate,
        undefined,
        requiredOptions,
        location, // todo change hardcode
        tickets,
        coupons,
        editors
  })
    );
  };

  const [typeCheckBoxes, setTypeCheckBoxes] = useState([
    {
      id: 1,
      value: 'Music',
      active: false,
    },
    {
      id: 2,
      value: 'Concert',
      active: false,
    },
    {
      id: 3,
      value: 'Dance',
      active: false,
    },
    {
      id: 4,
      value: 'Education',
      active: false,
    },
    {
      id: 5,
      value: 'Conference',
      active: false,
    },
    {
      id: 6,
      value: 'Workshop',
      active: false,
    },
    {
      id: 7,
      value: 'Festival',
      active: false,
    },
    {
      id: 8,
      value: 'DJ-set',
      active: false,
    },
    {
      id: 9,
      value: 'Art',
      active: false,
    },
    {
      id: 10,
      value: 'Theater',
      active: false,
    },
    {
      id: 11,
      value: 'Cinema',
      active: false,
    },
    {
      id: 12,
      value: 'Exhibition',
      active: false,
    },
  ]);

  const setActiveType = (id) => {
    setTypeCheckBoxes((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, active: !element.active } : element
      )
    );
  };

  const getActiveTypes = () =>
    typeCheckBoxes.filter((item) => item.active).map((item) => item.value);

  const [requiredOptionsCheckBoxes, setRequiredOptionsCheckBoxes] = useState([
    {
      id: 1,
      value: 'Age',
      nameForBack: 'isAgeRequired',
      active: false,
    },
    {
      id: 2,
      nameForBack: 'isCityRequired',
      value: 'City',
      active: false,
    },
    {
      id: 3,
      value: 'Sex',
      nameForBack: 'isSexRequired',
      active: false,
    },
    {
      id: 4,
      value: 'ID-code',
      nameForBack: 'isIDCodeRequired',
      active: false,
    },
    {
      id: 5,
      value: 'Instagram',
      nameForBack: 'isInstagramRequired',
      active: false,
    },
  ]);

  const setActiveRequiredOption = (id) => {
    setRequiredOptionsCheckBoxes((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, active: !element.active } : element
      )
    );
  };

  const getActiveRequiredOptions = () =>
    requiredOptionsCheckBoxes.reduce((acc, item) => {
      acc[item.nameForBack] = item.active;
      return acc;
    }, {});

  const navigation = useNavigation();

  if (showAccessToEvent)
    return <AccessToEvent closeAccess={() => setShowAccessToEvent(false)} />;

  return (
    <View>
      <HeaderNavigate
        arrowBack
        onBack={() => navigation.navigate('TabNavigation')}
        style={styles.headerNavigate}
      >
        <AppText
          style={{ marginRight: 'auto', marginLeft: 'auto' }}
          weight={700}
          size={16}
        >
          Create event
        </AppText>
      </HeaderNavigate>
      <ScrollView>
        <Wrapper style={{ marginTop: 0, paddingBottom: 100 }}>
          <View style={{ marginBottom: 32 }}>
            <AppText weight={500} size={20} style={{ marginBottom: 18 }}>
              General info
            </AppText>
            <EventInput label='Name*' onChangeText={setName} value={name} />
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <EventInput
                styleInput={{ width: '49%' }}
                label='Start*'
                onChangeText={setStartDate}
                value={startDate}
              />
              <EventInput
                styleInput={{ width: '49%' }}
                label='End*'
                onChangeText={setEndDate}
                value={endDate}
              />
            </View>
            <AppIconInput
              placeholder='Address'
              onChangeText={setAddress}
              value={address}
              style={{ marginBottom: 8 }}
              iconPosition='right'
              icon={orangeLocationIcon}
            />
            <EventInput
              styleInput={{
                paddingVertical: 24,
                height: 150,
              }}
              textAlignVertical='top'
              label='Description'
              onChangeText={setDescription}
              value={description}
              multiline
              numberOfLines={10}
            />
            <EventInput
              styleInput={{ marginVertical: 0 }}
              label='Min age'
              onChangeText={setMinAge}
              value={minAge}
            />
          </View>
          <Line style={{ marginBottom: 32 }} />
          <View style={{ marginBottom: 26 }}>
            <AppText size={20} weight={600} style={{ marginBottom: 18 }}>
              Bank account
            </AppText>
            {bankAccounts.map((account) => (
              <EventInput
                key={account.id}
                label='Bank account'
                onChangeText={(text) =>
                  onBankAccountInputChange(account.id, text)
                }
                value={account.value}
              />
            ))}
            <AddButton
              onPress={addBankAccountInput}
              text='add bank account'
              style={{ marginTop: 10 }}
            />
          </View>
          <Line style={{ marginBottom: 24 }} />
          <View style={{ marginBottom: 26 }}>
            <AppText weight={600} size={20} style={{ marginBottom: 18 }}>
              Type of event
            </AppText>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {typeCheckBoxes.map((item) => (
                <View key={item.id} style={styles.checkBoxContainer}>
                  <CheckBox
                    uncheckedCheckBoxColor='#FFDBAA'
                    checkedCheckBoxColor='#FF9100'
                    onClick={() => setActiveType(item.id)}
                    isChecked={item.active}
                  />
                  <AppText
                    style={{ fontSize: 12, color: '#828282', marginLeft: 14 }}
                  >
                    {item.value}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
          <Line style={{ marginBottom: 24 }} />
          <View style={{ marginBottom: 26 }}>
            <AppText size={20} weight={600} style={{ marginBottom: 4 }}>
              Photos and videos
            </AppText>
            <AppText
              size={12}
              weight={400}
              style={{ color: '#999999', marginBottom: 18 }}
            >
              You can add only 3 photos or videos
            </AppText>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 18,
              }}
            >
              {filesToUpload.map((file) => (
                <View
                  key={file.id}
                  style={{
                    position: 'relative',
                    marginRight: 20,
                  }}
                >
                  <SvgXml
                    xml={redCircleCloseIcon}
                    style={{
                      position: 'absolute',
                      zIndex: 2,
                      right: -3,
                      top: -3,
                    }}
                    onPress={() => removeDocument(file.id)}
                  />
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 15 }}
                    source={{ uri: file.uri }}
                  />
                </View>
              ))}
            </View>
            {filesToUpload.length < 3 && (
              <AddButton text='add photos' onPress={chooseDocument} />
            )}
          </View>
          <Line style={{ marginBottom: 24 }} />
          <View>
            <AppText weight={600} size={20} style={{ marginBottom: 16 }}>
              Tickets
            </AppText>
          </View>
          {ticketTypes.map((type) => (
            <View key={type.id}>
              <View style={{ marginBottom: 25 }}>
                <EventInput
                  label='Type of tickets'
                  onChangeText={(text) =>
                    changeTicketType(type.id, 'type', text)
                  }
                  value={type.type}
                />
                <EventInput
                  label='Name of type'
                  onChangeText={(text) =>
                    changeTicketType(type.id, 'name', text)
                  }
                  value={type.name}
                />
              </View>
              <View style={{ marginBottom: 25 }}>
                <TicketsSubtitle>Early Bird</TicketsSubtitle>
                <EventInput
                  label='Price'
                  onChangeText={(text) =>
                    changeTicketType(type.id, 'earlyPrice', text)
                  }
                  value={type.earlyPrice}
                />

                <EventInput
                  label='Quantity'
                  onChangeText={(text) =>
                    changeTicketType(type.id, 'earlyQuantity', text)
                  }
                  value={type.earlyQuantity}
                />
              </View>
              <View style={{ marginBottom: 25 }}>
                <TicketsSubtitle>Regular</TicketsSubtitle>
                <EventInput
                  label='Price'
                  onChangeText={(text) =>
                    changeTicketType(type.id, 'regularPrice', text)
                  }
                  value={type.regularPrice}
                />
                <EventInput
                  label='Quantity'
                  onChangeText={(text) =>
                    changeTicketType(type.id, 'regularQuantity', text)
                  }
                  value={type.regularQuantity}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <TicketsSubtitle>Last Chance</TicketsSubtitle>
                <EventInput
                  label='Price'
                  onChangeText={(text) =>
                    changeTicketType(type.id, 'lastPrice', text)
                  }
                  value={type.lastPrice}
                />
                <EventInput
                  label='Quantity'
                  onChangeText={(text) =>
                    changeTicketType(type.id, 'lastQuantity', text)
                  }
                  value={type.lastQuantity}
                />
              </View>
            </View>
          ))}
          <AddButton
            text='add another type'
            onPress={addTicketType}
            style={{ marginBottom: 24 }}
          />
          <Line style={{ marginBottom: 24 }} />
          <View style={{ marginBottom: 26 }}>
            <AppText weight={600} size={20} style={{ marginBottom: 4 }}>
              Selecting options
            </AppText>
            <AppText
              weight={500}
              size={12}
              style={{ color: '#999999', marginBottom: 18 }}
            >
              To require user input at the purchase stage
            </AppText>
            <View>
              {requiredOptionsCheckBoxes.map((item) => (
                <View key={item.id} style={styles.checkBoxContainer}>
                  <CheckBox
                    checkBoxColor='#FFDBAA'
                    checkedCheckBoxColor='#FF9100'
                    onClick={() => setActiveRequiredOption(item.id)}
                    isChecked={item.active}
                  />
                  <AppText
                    style={{ fontSize: 12, color: '#828282', marginLeft: 14 }}
                  >
                    {item.value}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
          <Line />
          <View style={{ marginBottom: 16 }}>
            <ContentWithSwitchButton
              active={isPrivate}
              setActive={setIsPrivate}
              title='Private event'
              text='The event can only be viewed directly via the link'
            />
          </View>
          <Line />
          <View style={{ marginBottom: 16 }}>
            <ContentWithSwitchButton
              title='Only Card Payment'
              text='If the switch is on, users will not be able to book tickets and pay for them in cash'
            />
          </View>
          <Line />
          <View style={{ marginBottom: 16 }}>
            <ContentWithSwitchButton
              title='Personalization of tickets'
              text='if this switch is on,  the buyer will be asked the name and phone number of the visitor'
            />
          </View>
          <Line />
          <View style={{ marginBottom: 16 }}>
            <ContentWithSwitchButton
              title='Confirmation'
              text='You will be able to manually confirm ticket purchase requests'
            />
          </View>
          <Line style={{ marginBottom: 24 }} />
          <View style={{ marginBottom: 42 }}>
            <AppText weight={500} size={20}>
              Access to the event
            </AppText>
            <AppText
              weight={400}
              size={12}
              style={{ color: '#999999', marginBottom: 14 }}
            >
              add other users to control event
            </AppText>
            <AddButton
              text='edit access'
              onPress={() => setShowAccessToEvent(true)}
            />
          </View>
          <NextButton onPress={create}>Create event</NextButton>
        </Wrapper>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    width: '24%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginRight: 30,
  },
  headerNavigate: {
    width: '100%',
    height: 100,
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 25,
    zIndex: 2,
    backgroundColor: 'white',
  },
});

export default CreateEvent;
