import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {Icon} from '@rneui/themed';
const Iconn = ({
  name,
  size,
  color,
  style,
  onPresss,
}: {
  name: string;
  size: number;
  color: string;
  style?: ViewStyle;
  onPresss?: () => void;
}) => {
  return (
    <Pressable
      // android_ripple={{color: color}}
      style={({pressed}) => [pressed ? styles.buttonPressed : null]}
      onPress={onPresss}>
      <Icon name={name} size={size} color={color} style={style} />
    </Pressable>
  );
};

export default Iconn;

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },
});
