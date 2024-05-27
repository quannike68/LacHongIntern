import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const defaultCircleSize = 16;
const defaultCircleColor = '#007AFF';
const defaultLineWidth = 2;
const defaultLineColor = '#007AFF';
const defaultTimeTextColor = 'black';
const defaultDotColor = 'white';
const defaultInnerCircle = 'dot';
const isRtl = I18nManager.isRTL;

const TimelineC = (props: any) => {
  const [state, setState] = useState({
    data: props.data,
    x: 0,
    width: 0,
  });

  let _lineColor: string;

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const renderTime = (rowData: any, rowID: number) => {
    if (!props.showTime) {
      return null;
    }
    let timeWrapper: StyleProp<ViewStyle>;
    switch (props.columnFormat) {
      case 'single-column-left':
        timeWrapper = {
          alignItems: 'flex-end',
        };
        break;
      case 'single-column-right':
        timeWrapper = {
          alignItems: 'flex-start',
        };
        break;
      case 'two-column':
        timeWrapper = {
          flex: 1,
          alignItems:
            (rowData.position && rowData.position === 'right') ||
            (!rowData.position && rowID % 2 === 0)
              ? 'flex-end'
              : 'flex-start',
        };
        break;
    }
    const {isAllowFontScaling} = props;
    return (
      <View style={timeWrapper}>
        <View
          style={[
            styles.timeContainer,
            {
              minWidth:
                props.columnFormat === 'single-column-right' ||
                props.columnFormat === 'single-column-left' ||
                !props.columnFormat
                  ? state.x - 10
                  : 45,
              // backgroundColor: '#929CB1',
              borderRadius: 10,
              paddingHorizontal: 5,
            },
            props.timeContainerStyle,
          ]}>
          <Text
            style={[styles.time, props.timeStyle, {textAlign: 'center'}]}
            allowFontScaling={isAllowFontScaling}>
            {rowData.time}
          </Text>
        </View>
      </View>
    );
  };

  const _renderItemDetail = useCallback(
    (item: any, index: any) => {
      return (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#F5F5F5',
              width: 100,
              borderRadius: 15,
            }}
            activeOpacity={0.8}>
            <Text
              style={{
                color: '#282A31',
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
              }}>
              {item.project}
            </Text>
          </TouchableOpacity>
          {item.tasks.map((task: any, index: number) => (
            <View key={index}>
              <Text style={[styles.title]} allowFontScaling={true}>
                {task.name}
              </Text>
              {task.activities.map((activity: any, index: number) => (
                <View key={index}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#282A31',
                      fontWeight: 'normal',
                    }}>
                    {activity.description}
                    <Text style={{fontStyle: 'italic', color: '#929CB1'}}>
                      {' by ' + activity.staff}
                    </Text>
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      );
    },
    [state],
  );

  const renderDetail = (rowData: any, rowID: number) => {
    const {isAllowFontScaling} = props;
    let description;
    if (typeof rowData.description === 'string') {
      description = (
        <Text
          style={[
            styles.description,
            props.descriptionStyle,
            rowData.descriptionStyle,
          ]}
          allowFontScaling={isAllowFontScaling}>
          {rowData.description}
        </Text>
      );
    } else if (typeof rowData.description === 'object') {
      description = rowData.description;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={rowData.content}
          renderItem={({item, index}) => _renderItemDetail(item, index)}
          keyExtractor={(item, index) => `${item.project}-${index}`}
        />
      </View>
    );
  };

  const renderCircle = (rowData: any, rowID: number) => {
    const circleSize =
      rowData.circleSize || props.circleSize || defaultCircleSize;
    const circleColor = _lineColor;
    const lineWidth = rowData.lineWidth || props.lineWidth || defaultLineWidth;

    let circleStyle;
    switch (props.columnFormat) {
      case 'single-column-left':
        circleStyle = isRtl
          ? {
              width: state.width ? circleSize : 0,
              height: state.width ? circleSize : 0,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              right: state.width - circleSize / 2 - (lineWidth - 1) / 2,
            }
          : {
              width: state.x ? circleSize : 0,
              height: state.x ? circleSize : 0,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              left: state.x + 10 - circleSize / 2 + (lineWidth - 1) / 2,
            };
        break;
      case 'single-column-right':
        circleStyle = {
          width: state.width ? circleSize : 0,
          height: state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: state.width - circleSize / 2 - (lineWidth - 1) / 2,
        };
        break;
      case 'two-column':
        circleStyle = {
          width: state.width ? circleSize : 0,
          height: state.width ? circleSize : 0,
          borderRadius: circleSize / 2,
          backgroundColor: circleColor,
          left: state.width - circleSize / 2 - (lineWidth - 1) / 2,
        };
        break;
    }

    let innerCircle;
    let stypeInnerCircle =
      props.innerCircle !== 'none' ? props.innerCircle : defaultInnerCircle;
    switch (stypeInnerCircle) {
      case 'icon':
        const iconDefault = rowData.iconDefault || props.iconDefault;
        let iconSource = rowData.icon || iconDefault;
        if (React.isValidElement(iconSource)) {
          innerCircle = iconSource;
          break;
        }
        if (rowData.icon)
          iconSource =
            rowData.icon.constructor === String
              ? {uri: rowData.icon}
              : rowData.icon;
        const iconStyle = {
          height: circleSize,
          width: circleSize,
        };
        innerCircle = (
          <Image
            source={iconSource}
            defaultSource={
              typeof iconDefault === 'number' ? iconDefault : undefined
            }
            style={[iconStyle, props.iconStyle]}
          />
        );
        break;
      case 'dot':
        const dotSize = props.dotSize || circleSize / 2;
        const dotStyle = {
          height: dotSize,
          width: dotSize,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : props.dotColor
            ? props.dotColor
            : defaultDotColor,
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
      case 'element':
        innerCircle = rowData.icon;
        break;
    }
    return (
      <View style={[styles.circle, circleStyle, props.circleStyle]}>
        {innerCircle}
      </View>
    );
  };
  const renderEvent = (rowData: any, rowID: number) => {
    const handleLayout = (event: LayoutChangeEvent) => {
      const {x, width} = event.nativeEvent.layout;
      if (!state.x && !state.width) {
        setState({...state, x, width});
      }
    };
    const lineWidth = rowData.lineWidth || props.lineWidth;
    const lineColor = generateColor();
    _lineColor = lineColor;

    let opStyle;
    switch (props.columnFormat) {
      case 'single-column-left':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: lineWidth,
          borderRightWidth: 0,
          marginLeft: 20,
          paddingLeft: 20,
        };
        break;
      case 'single-column-right':
        opStyle = {
          borderColor: lineColor,
          borderLeftWidth: 0,
          borderRightWidth: lineWidth,
          marginRight: 20,
          paddingRight: 20,
        };
        break;
      case 'two-column':
        opStyle =
          (rowData.position && rowData.position === 'right') ||
          (!rowData.position && rowID % 2 === 0)
            ? {
                borderColor: lineColor,
                borderLeftWidth: lineWidth,
                borderRightWidth: 0,
                marginLeft: 20,
                paddingLeft: 20,
              }
            : {
                borderColor: lineColor,
                borderLeftWidth: 0,
                borderRightWidth: lineWidth,
                marginRight: 20,
                paddingRight: 20,
              };
        break;
    }

    const handlePress = () => {
      if (props.onEventPress) {
        props.onEventPress(rowData);
      }
    };

    return (
      <View
        style={[
          styles.details,
          opStyle,
          props.eventContainerStyle,
          rowData.eventContainerStyle,
        ]}
        onLayout={handleLayout}>
        <TouchableOpacity
          disabled={!props.onEventPress}
          style={[props.detailContainerStyle]}
          onPress={handlePress}>
          <View style={[styles.detail, props.eventDetailStyle]}>
            {renderDetail(rowData, rowID)}
          </View>
          {renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = useCallback(
    (item: any, index: number) => {
      let content;
      switch (props.columnFormat) {
        case 'single-column-left':
          content = (
            <View style={[styles.rowContainer, props.rowContainerStyle]}>
              {renderTime(item.item, index)}
              {renderEvent(item.item, index)}
              {renderCircle(item.item, index)}
            </View>
          );
          break;
        case 'single-column-right':
          content = (
            <View style={[styles.rowContainer, props.rowContainerStyle]}>
              {renderEvent(item.item, index)}
              {renderTime(item.item, index)}
              {renderCircle(item.item, index)}
            </View>
          );
          break;
        case 'two-column':
          content =
            (item.position && item.position === 'right') ||
            (!item.position && item.index % 2 === 0) ? (
              <View style={[styles.rowContainer, props.rowContainerStyle]}>
                {renderTime(item.item, item.index)}
                {renderEvent(item.item, item.index)}
                {renderCircle(item.item, item.index)}
              </View>
            ) : (
              <View style={[styles.rowContainer, props.rowContainerStyle]}>
                {renderEvent(item.item, item.index)}
                {renderTime(item.item, item.index)}
                {renderCircle(item.item, item.index)}
              </View>
            );
          break;
      }
      return <View key={index}>{content}</View>;
    },
    [state],
  );

  useEffect(() => {
    if (state.data !== props.data) {
      setState(prevState => ({...prevState, data: props.data}));
    }
  }, [props.data]);

  const renderSeparator = useCallback(() => {
    if (!props.separator) {
      return null;
    }
    return <View style={[styles.separator, props.separatorStyle]} />;
  }, [props.separator, props.separatorStyle]);

  return (
    <View style={[styles.container, props.style]}>
      {props.isUsingFlatlist ? (
        <FlatList
          style={[styles.listview, props.listViewStyle]}
          contentContainerStyle={props.listViewContainerStyle}
          data={state.data}
          extraData={state}
          renderItem={renderItem}
          keyExtractor={(item, index) => index + ''}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          {...props.options}
        />
      ) : (
        state.data.map((item: any, index: number) => (
          <View key={index + ''}>{renderItem(item, index)}</View>
        ))
      )}
    </View>
  );
};

TimelineC.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: 'single-column-left',
  separator: false,
  showTime: true,
  isAllowFontScaling: true,
  isUsingFlatlist: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listview: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 15,
    backgroundColor: '#007AFF',
    height: 30,
    justifyContent: 'center',
  },
  sectionHeaderText: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  timeContainer: {
    minWidth: 45,
  },
  time: {
    textAlign: 'right',
    color: defaultTimeTextColor,
    overflow: 'hidden',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: defaultDotColor,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    borderLeftWidth: defaultLineWidth,
    flexDirection: 'column',
    flex: 1,
  },
  detail: {paddingTop: 10, paddingBottom: 10},
  description: {
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#aaa',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default TimelineC;