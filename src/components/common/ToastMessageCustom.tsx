import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

interface dataToast {
  type: string;
  title: string;
  message: string;
}

export const showToastMessage = ({type, title, message}: dataToast) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    autoHide: true,
    visibilityTime: 2500,
  });
};
