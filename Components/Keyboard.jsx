import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useState } from 'react';

export default function Keyboard(props) {
  const { width } = Dimensions.get('window');
  const windowWidth = width;
  const itemPerRow = 4;
  const childWidth = windowWidth / itemPerRow;
  const [selectedItemId, setSelectedItemId] = useState(null);

  const keyboard = [
    {
      id: 1,
      title: 'C',
      type: 'action',
    },
    {
      id: 2,
      title: '+/-',
      type: 'action',
    },
    {
      id: 3,
      title: '%',
      type: 'action',
    },

    {
      id: 4,
      title: '/',
      type: 'count',
    },

    {
      id: 6,
      title: '7',
      type: 'number',
    },
    {
      id: 7,
      title: '8',
      type: 'number',
    },
    {
      id: 8,
      title: '9',
      type: 'number',
    },
    {
      id: 9,
      title: 'x',
      type: 'count',
    },
    {
      id: 10,
      title: '4',
      type: 'number',
    },
    {
      id: 11,
      title: '5',
      type: 'number',
    },
    {
      id: 12,
      title: '6',
      type: 'number',
    },
    {
      id: 13,
      title: '-',
      type: 'count',
    },

    {
      id: 14,
      title: '1',
      type: 'number',
    },
    {
      id: 15,
      title: '2',
      type: 'number',
    },
    {
      id: 16,
      title: '3',
      type: 'number',
    },
    {
      id: 17,
      title: '+',
      type: 'count',
    },

    {
      id: 18,
      title: '0',
      type: 'number',
    },
    {
      id: 19,
      title: '.',
      type: 'number',
    },
    {
      id: 20,
      title: '=',
      type: 'count',
    },
  ];

  const styles = StyleSheet.create({
    rows: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderRadius: 100,
      margin: 10,
      padding: 20,
    },
    btnBackGroundForNumbers: {
      backgroundColor: '#505050',
    },
    btnBackGroundForAction: {
      backgroundColor: '#D4D4D2',
    },
    btnBackGroundForCount: {
      backgroundColor: '#FF9500',
    },
    commonBtn: {
      width: childWidth - 20,
      alignItems: 'center',
    },
    btnZero: {
      width: 2 * childWidth - 20,
      alignItems: 'left',
    },

    buttonText: {
      color: 'white',
      fontFamily: 'Roboto',
      fontSize: 28,
      fontWeight: 'bold',
    },
    resizeBtn: {
      fontSize: 25,
    },
    actionText: {
      color: '#1C1C1C',
      fontFamily: 'Roboto',
      fontSize: 25,
      fontWeight: 'bold',
    },
  });

  const composedStyle = (item) => {
    const countStyle = {
      backgroundColor: '#FF9500',
      color: '#ffffff',
    };
    const countStyleClicked = {
      backgroundColor: '#ffffff',
      color: '#FF9500',
    };
    const isSelected = selectedItemId === item.id;
    const backgroundColor = isSelected ? countStyleClicked : countStyle;
    let baseStyle = StyleSheet.compose(
      styles.button,
      item.title === '0' ? styles.btnZero : styles.commonBtn
    );

    return StyleSheet.compose(
      baseStyle,
      item.type === 'action'
        ? styles.btnBackGroundForAction
        : item.type === 'count'
        ? backgroundColor
        : styles.btnBackGroundForNumbers
    );
  };

  const CLickCalculation = (item) => {
    item.type === 'count'
      ? setSelectedItemId(item.id) & props.HandleCountClick(item)
      : props.HandleClick(item);
    item.type === 'action' && item.title === 'C'
      ? setSelectedItemId(item.id)
      : null;
  };
  const CheckCountColor = (item) => {
    const isSelected = selectedItemId === item.id;
    const textColor = isSelected ? '#FF9500' : '#ffffff';
    const newCountStyle = {
      color: textColor,
    };
    return StyleSheet.compose(styles.buttonText, newCountStyle);
  };

  const renderButtons = () => {
    return keyboard.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={composedStyle(item)}
        onPress={(e) => CLickCalculation(item)}
      >
        <Text
          style={StyleSheet.compose(
            item.type === 'action' || item.type === 'count'
              ? styles.resizeBtn
              : null,
            item.type === 'action'
              ? styles.actionText
              : item.type === 'count'
              ? CheckCountColor(item)
              : styles.buttonText
          )}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    ));
  };
  return <View style={styles.rows}>{renderButtons()}</View>;
}
