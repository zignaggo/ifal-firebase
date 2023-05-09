import React from 'react'
import { HStack, Heading, NativeBaseProvider, VStack } from "native-base"
import { TouchableOpacity } from "react-native"
import 'react-native'
import TestRenderer from 'react-test-renderer'
import * as ReactDOM from 'react-dom';
import { Subject } from './Subject'
import { render } from '@testing-library/react-native'


test('componente matéria', () => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  }
  
  render(

    <NativeBaseProvider initialWindowMetrics={inset} >
      <Subject />
    </NativeBaseProvider >
  )
})
