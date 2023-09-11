import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'; // Import KeyboardAvoidingView and ScrollView
import Keyboard from './Keyboard';

export default function Calculator() {
  const [result, setResult] = useState('');
  const [firstValue, setFirstValue] = useState('');
  const [operation, setOperation] = useState('');
  const [minus, setMinus] = useState(true);
  const [isClearButtonDisabled, setIsClearButtonDisabled] = useState(false);

  const HandleClick = (button) => {
    switch (button.type) {
      case 'action':
        switch (button.title) {
          case 'C':
            setResult('');
            setFirstValue('');
            setOperation('');
            setIsClearButtonDisabled(true);
            break;
          case '+/-':
            setMinus(!minus);
            let sign = minus ? '-' : '';
            result.length > 0 && result[0] === '-'
              ? setResult(result.slice(1))
              : null;
            setResult((item) => sign + item);
            break;
          case '%':
            calculateResult(result + '/100');
            break;
        }
        break;
      case 'number':
        result.length <= 9 ? setResult((item) => item + button.title) : null;
        break;
    }
  };
  const HandleCountClick = (item) => {
    item.title !== '='
      ? setOperation(item.title.replace('x', '*')) &
        setFirstValue(result) &
        setResult('')
      : calculateResult(firstValue + operation + result);
  };
  const calculateResult = (input) => {
    try {
      let evalResult = eval(input);
      evalResult = isFinite(evalResult)
        ? evalResult % 1 !== 0
          ? setResult(parseFloat(evalResult).toFixed(6))
          : setResult(evalResult.toString())
        : setResult('Error');
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.results}>
          <Text style={styles.text}>{result}</Text>
        </View>
        <Keyboard
          HandleClick={HandleClick}
          HandleCountClick={HandleCountClick}
          isClearButtonDisabled={isClearButtonDisabled}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  results: {
    backgroundColor: 'flex',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 80,
    fontWeight: '300',
  },
});
