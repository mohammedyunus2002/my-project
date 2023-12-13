import { atom } from 'recoil';

export const checkoutBillState = atom({
  key: 'checkoutBillState',
  default: 0, // Initial value is 0
});

export const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
});