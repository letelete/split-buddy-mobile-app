import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ListRenderItem, ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';

export interface CarouselProps<TItem> extends Stylable {
  data: TItem[];
  renderItem: ListRenderItem<TItem>;
  keyExtractor: (item: TItem, index: number) => string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  CarouselEmptyComponent?: React.ComponentType<unknown> | React.ReactElement | null | undefined;
  onChange?: (index: number) => void;
}

const Carousel = <TItem,>({
  data,
  containerStyle,
  contentContainerStyle,
  renderItem,
  keyExtractor,
  CarouselEmptyComponent,
  onChange,
}: CarouselProps<TItem>) => {
  const { styles, theme } = useStyles(stylesheet);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = Math.max(0, scrollViewWidth - theme.container.padding.horizontal * 2);
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;

  const panX = useSharedValue(0);

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      panX.value = event.contentOffset.x;
    },
  });

  const handleInitialChange = useCallback(() => {
    onChange?.(0);
  }, [onChange]);

  useFocusEffect(handleInitialChange);

  return (
    <Animated.FlatList
      contentInset={{
        left: halfBoxDistance,
        right: halfBoxDistance,
      }}
      renderItem={(info) => (
        <Item
          boxWidth={boxWidth}
          halfBoxDistance={halfBoxDistance}
          info={info}
          panX={panX}
          renderItem={renderItem}
        />
      )}
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      contentInsetAdjustmentBehavior='never'
      contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
      data={data}
      decelerationRate='fast'
      keyExtractor={keyExtractor}
      ListEmptyComponent={CarouselEmptyComponent}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      snapToAlignment='center'
      snapToInterval={boxWidth}
      style={[styles.container, containerStyle]}
      horizontal
      onLayout={(e) => {
        setScrollViewWidth(e.nativeEvent.layout.width);
      }}
      onMomentumScrollEnd={(e) => {
        const panX = e.nativeEvent.contentOffset.x;
        const currentIndex = boxWidth
          ? Math.min(Math.max(0, Math.floor((panX + boxDistance) / boxWidth)), data.length - 1)
          : 0;

        onChange?.(currentIndex);
      }}
      onScroll={handler}
    />
  );
};

Carousel.displayName = 'Carousel';

export { Carousel };

const stylesheet = createStyleSheet(() => ({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
}));

interface ItemProps<TItem> {
  info: ListRenderItemInfo<TItem>;
  panX: SharedValue<number>;
  boxWidth: number;
  halfBoxDistance: number;
  renderItem: CarouselProps<TItem>['renderItem'];
}

const Item = <TItem,>({ info, panX, boxWidth, halfBoxDistance, renderItem }: ItemProps<TItem>) => {
  const boxHeight = useSharedValue(0);

  const interpolatedPanX = useDerivedValue(() =>
    interpolate(
      panX.value,
      [
        (info.index - 1) * boxWidth - halfBoxDistance,
        info.index * boxWidth - halfBoxDistance,
        (info.index + 1) * boxWidth - halfBoxDistance,
      ],
      [-1, 0, 1],
      Extrapolation.CLAMP
    )
  );

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      interpolatedPanX.value,
      [-1, 0, 1],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      interpolatedPanX.value,
      [-1, 0, 1],
      [0.95, 1, 0.95],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[animatedStyle, { width: boxWidth }]}
      onLayout={(e) => {
        boxHeight.value = e.nativeEvent.layout.height;
      }}
    >
      {renderItem(info)}
    </Animated.View>
  );
};
