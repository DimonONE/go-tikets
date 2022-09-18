import axios from 'axios';

import axiosJwt from '@Plugins/axios/axiosJwt';

axios.defaults.baseURL = 'https://go-ticket-back.herokuapp.com';

const auth = {
  getCode: async (phone) => await axios.post('/auth/send-code', { phone }),
  signIn: async (phone, code, pushNotificationToken) =>
    await axios.post('/auth/login', { phone, code, pushNotificationToken }),
  signUp: async (name, surname, phone, email, birthday, IDcode, instagram) =>
    await axios.post('/auth/register', {
      name,
      surname,
      phone,
      email,
      birthday,
      IDcode,
      instagram,
    }),
};

const user = {
  getUser: async (id) => await axios.get(`/user/${id}`),
  getUserProfile: async () => await axiosJwt.get(`/user/profile`),
  addPayment: async (data) => await axiosJwt.post('/user/add-payment', data),
  getPayments: async () => await axiosJwt.get('/user/payments'),
  removePayment: async (id) => await axiosJwt.delete('/user/payments', { id }),
};

const bank = {
  getBankAccounts: async () => await axiosJwt.get('/bank'),
  getBankAccountById: async (id) => await axiosJwt.get(`/bank?id=${id}`),
  addBankAccounts: async (data) => await axiosJwt.post('/bank', data),
  removeBankAccounts: async (id) => await axiosJwt.delete('/bank', { id }),
};

const guest = {
  getList: async (eventId) => await axios.get(`/guest?eventId=${eventId}`),
  setStatus: async ({ id, status }) =>
    await axiosJwt.put('/guest/status', { id, status }),
  getById: async (id) => await axios.get(`/guest?id=${id}`),
  // getList: async (id) => await axios.get(`/guest?id=${id}`),
};

const profile = {
  updateProfile: async (data) => await axiosJwt.put('/user/profile', data),
  updatePhoto: async (data) =>
    await axiosJwt.put('/user/avatar', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }),
  // getSelectedEvents: async () => await axiosJwt.get('/user/payments/selected'),
};

const ticket = {
  getList: async () => await axios.get('/ticket'),
  getTicket: async (id) => await axios.get(`/ticket?id=${id}`),
  getMyTickets: async () => await axiosJwt.get('/ticket/my'),
  buy: async (id, tickets) =>
    await axios.post('/event/buy-tickets', {
      id,
      tickets,
    }),
};

const event = {
  getMe: async () => await axiosJwt.get('/event/me'),
  geEvents: async () => await axios.get('/event'),
  getList: async (query = '') => await axios.get(`/event${query}`),
  getTickets: async (id) => await axios.get(`/event/tickets?id=${id}`),
  buyTickets: async (data) => await axiosJwt.post('/event/buy-tickets', data),
  create: async ({
    name,
    shortDescription,
    fullDescription,
    startDate,
    endDate,
    files,
    type,
    bank,
    address,
    isPrivate,
    isHidden,
    requiredAdditionalInfo,
    location,
    tickets,
    coupons,
    editors,
  }) => {
    console.log('xdfsfdfs', {
      name,
      shortDescription,
      fullDescription,
      startDate,
      endDate,
      files,
      type,
      bank,
      isPrivate,
      isHidden,
      requiredAdditionalInfo,
      location,
      tickets,
      coupons,
      editors,
    });
    // console.log('asdasfafdfaad', {
    //   name,
    //   shortDescription,
    //   fullDescription,
    //   startDate,
    //   endDate,
    //   files,
    //   type,
    //   bank,
    //   isPrivate,
    //   isHidden,
    //   requiredAdditionalInfo,
    //   location,
    //   tickets,
    //   coupons,
    //   editors,
    // });
    const formData = new FormData();

    // formData.append('demoLinks', JSON.stringify([]));
    formData.append('name', name);
    formData.append('shortDescription', shortDescription);
    formData.append('fullDescription', fullDescription);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    // console.log('files', files);
    if (files) {
      files.forEach((file) => {
        formData.append(`files`, {
          uri: file.uri,
          type: file.type,
          name: file.name,
          size: file?.size,
        });
      });
    }

    if (bank) {
      bank.forEach(({ value }) => {
        formData.append('bank[]', value);
      });
    }
    // formData.append('isHidden', isHidden);
    if (type) {
      type.forEach((value) => {
        formData.append('type[]', value);
      });
    }

    if (requiredAdditionalInfo) {
      for (const [key, value] of Object.entries(requiredAdditionalInfo)) {
        formData.append(`requiredAdditionalInfo[${key}]`, value);
      }
    }

    if (location) {
      for (const [key, value] of Object.entries(location)) {
        formData.append(`location[${key}]`, value);
      }
    }

    // console.log('tickets', tickets);
    if (tickets) {
      tickets.forEach((ticket, index) => {
        if (ticket) {
          for (const [key, value] of Object.entries(ticket)) {
            formData.append(`tickets[${index}][${key}]`, value);
          }
        }
      });
    }
    // formData.append(`tickets[0][type]`, 'VIP');
    // formData.append(`tickets[0][name]`, 'Natura 2021 VIP');
    // formData.append(`tickets[0][price]`, 3500);
    // formData.append(`tickets[0][preOrderPrice]`, 250);
    // formData.append(`tickets[0][lastChancePrice]`, 5000);
    // formData.append(`tickets[0][totalCount]`, 500);
    // formData.append(`tickets[0][canBeBooked]`, false);

    // {
    //   "type": "VIP",
    //   "name": "Natura 2021 VIP",
    //   "price": 3500,
    //   "preOrderPrice": 250,
    //   "lastChancePrice": 5000,
    //   "totalCount": 500,
    //   "canBeBooked": true
    // }

    if (coupons) {
      coupons.forEach((coupon) => {
        formData.append('coupons[]', coupon);
      });
    }

    if (editors) {
      editors.forEach((editor) => {
        formData.append('editors[]', editor);
      });
    }

    // console.log(formData);

    // todo remove it
    // formData.append('isPrivate', JSON.stringify(true));
    // formData.append('demoLinks[]', 'flex');

    return await axiosJwt.post('/event', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

const staticFile = {
  getStatic: (filePath) => `https://go-ticket-back.herokuapp.com/${filePath}`,
};

export { auth, user, guest, ticket, event, profile, bank, staticFile };
