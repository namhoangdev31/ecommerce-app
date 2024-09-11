import { Button as ReactNativeBtn, View as ReactNativeView } from "react-native";
import { styled } from 'nativewind';

export const Button = styled(ReactNativeBtn);
export const Column = styled(ReactNativeView, {
  props: {
    className: 'flex flex-col'
  }
});
export const Row = styled(ReactNativeView, {
  props: {
    className: 'flex flex-row'
  }
});