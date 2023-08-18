export const initialState = {
  points: {
    points: null,
    status: null,
    error: null,
  },
  packageTypes: {
    packages: null,
    status: null,
    error: null,
  },

  package: {
    length: null,
    width: null,
    weight: null,
    height: null,
  },

  senderPoint: {
    id: null,
    name: null,
    latitude: null,
    longitude: null,
  },

  receiverPoint: {
    id: null,
    name: null,
    latitude: null,
    longitude: null,
  },

  receiver: {
    firstname: null,
    lastname: null,
    middlename: null,
    phone: null,
  },

  sender: {
    firstname: null,
    lastname: null,
    middlename: null,
    phone: null,
  },

  payer: 'RECEIVER',

  calc: {
    options: [],
    error: null,
    status: null,
  },

  order: {
    res: null,
    error: null,
    status: null,
  },

  senderAddress: {
    street: null,
    house: null,
    appartament: null,
    comment: null,
  },
  receiverAddress: {
    street: null,
    house: null,
    appartament: null,
    comment: null,
  },
  option: {
    id: null,
    price: null,
    days: null,
    name: null,
    type: null,
  },
};
