import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

export default function App() {
  const progress = useSharedValue(0);
  const CIRCLE_LENGHT = 1000;
  const R = CIRCLE_LENGHT / (Math.PI*2);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const { width, height } = useWindowDimensions();

  const animatedPropsCircle = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGHT*progress.value
  }));


  const handleValueChange = (value: number) => {
    progress.value = withTiming((1 - value), {duration: 500})
  }

  return (
    <View style={styles.container}>
      <Svg>
        <AnimatedCircle 
          cx={width/2}
          cy={height/2}
          r={R}
          stroke="#fca311"
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGHT}
          animatedProps={animatedPropsCircle}
          
        />
      </Svg>
      <Slider
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#fca311"
        maximumTrackTintColor="#ffffff"
        style={styles.slider}
        onValueChange={handleValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  slider: {
    width: 200, 
    height: 40, 
    position: 'absolute',
  },
  text: {
    color: 'white',
    position: 'absolute',
    fontSize: 24,
    transform: [
      {
        translateY: -50
      }
    ]
  }
});
