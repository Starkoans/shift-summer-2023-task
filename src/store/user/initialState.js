export const initialState = {
  location: null,
  userInfo: {
    _id: null,
    firstname: null,
    middlename: null,
    lastname: null,
    email: null,
    city: null,
    status: null,
    error: null,
  },
  token: null,
  otp: {
    code: null,
    error: null,
    status: null,
  },
  phone: {
    status: null,
    error: null,
    phoneNum: null,
    retryDelay: null,
  },
  deliveryHistory: {
    error: null,
    status: null,
    history: null,
  },
};
