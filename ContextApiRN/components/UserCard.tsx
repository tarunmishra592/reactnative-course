import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const SWIPE_THRESHOLD = 120;

interface User {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
}

export default function UserCards() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
      .catch((err) => console.error(err));
  }, []);

  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const handleSwipe = (direction: 'left' | 'right', user: User) => {
    if (direction === 'left') {
      console.log('Swiped Left: ', user.name.first);
    } else {
      console.log('Swiped Right: ', user.name.first);
    }
    setUsers((prevUsers) => prevUsers.slice(1));
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = (event.translationX / width) * 20;
    })
    .onEnd(() => {
      if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-width, {}, () => {
          runOnJS(handleSwipe)('left', users[0]);
        });
      } else if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(width, {}, () => {
          runOnJS(handleSwipe)('right', users[0]);
        });
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  if (users.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No more users</Text>
      </View>
    );
  }

  const user = users[0];

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Image
            source={{ uri: user.picture.large }}
            style={styles.image}
          />
          <Text style={styles.name}>
            {user.name.first} {user.name.last}
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: CARD_WIDTH,
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  name: {
    fontSize: 24,
    marginTop: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
