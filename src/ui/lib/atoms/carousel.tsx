import { useCallback, useState } from 'react';
import { ListRenderItem, ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Stylable } from '~/ui:lib/shared/interfaces';

export interface CarouselProps<TItem> extends Stylable {
  data: TItem[];
  renderItem: ListRenderItem<TItem>;
  keyExtractor: (item: TItem, index: number) => string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const Carousel = <TItem,>({
  data,
  containerStyle,
  contentContainerStyle,
  renderItem,
  keyExtractor,
}: CarouselProps<TItem>) => {
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;

  const panX = useSharedValue(0);

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      panX.value = event.contentOffset.x;
    },
  });

  const renderInterpolatedItem = useCallback(
    (info: ListRenderItemInfo<TItem>) => (
      <Animated.View
        style={{
          transform: [
            {
              scale: interpolate(
                panX.value,
                [
                  (info.index - 1) * boxWidth - halfBoxDistance,
                  info.index * boxWidth - halfBoxDistance,
                  (info.index + 1) * boxWidth - halfBoxDistance,
                ],
                [0.8, 1, 0.8],
                Extrapolation.CLAMP
              ),
            },
          ],
        }}
      >
        {renderItem(info)}
      </Animated.View>
    ),
    [boxWidth, halfBoxDistance, panX.value, renderItem]
  );

  return (
    <Animated.FlatList
      contentInset={{
        left: halfBoxDistance,
        right: halfBoxDistance,
      }}
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={contentContainerStyle}
      contentInsetAdjustmentBehavior='never'
      contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
      data={data}
      decelerationRate='fast'
      keyExtractor={keyExtractor}
      renderItem={renderInterpolatedItem}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      snapToAlignment='center'
      snapToInterval={boxWidth}
      style={containerStyle}
      horizontal
      onLayout={(e) => {
        setScrollViewWidth(e.nativeEvent.layout.width);
      }}
      onScroll={handler}
    />
  );
};

Carousel.displayName = 'Carousel';

export { Carousel };
