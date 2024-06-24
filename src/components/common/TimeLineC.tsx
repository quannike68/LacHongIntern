import React, {useState, useEffect, useCallback, useMemo} from 'react';
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


interface UserInformation {
  user_id: string;
  username: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  name: string;
  birthday: string | null;
  createdAt: string;
  createdBy: string;
  deletedMark: boolean;
  UserProperty: {
    user_property_id: string;
    department_id: string | null;
    role: {
      name: string;
    };
  };
}

interface Activity {
  activity_id: string;
  description: string;
  createdBy: string;
  modifiedBy: string | null;
  createdAt: string;
  ActivityProperty: ActivityProperty;
  user_information: UserInformation;
}

interface Activities {
  [date: string]: Activity[];
}

interface ActivityProperty {
  activity_property_id: string;
  user_property_id: string;
  activity_id: string;
  task_property_id: string;
}

interface Task {
  task_id: string;
  description: string;
  createdBy: string;
  modifiedBy: string | null;
  createdAt: string;
  TaskProperty: {
    task_property_id: string;
    task_id: string;
  };
  activities: Activities;
}

interface ProjectProperty {
  project_property_id: string;
  project_id: string;
  department_id: string;
  client_id: string;
}

interface information {
  total_user: number;
  total_task: {
    total_task_is_done: number;
    total_task_is_not_done: number;
  };
}

interface Project {
  project_id: string;
  projectCode: string;
  description: string | null;
  startAt: string;
  endAt: string;
  turnover: string | null;
  document: string | null;
  investor: string | null;
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
  ProjectProperty: ProjectProperty;
  information: information;
  tasks: Task[];
}


interface NewProjectFormat {
  projectCode: string;
  date : string;
  task : {
    task_id : string;
    description : string;
    activities :{
      task_id : string ;
      description : string;
      user_information :{
        user_id : string ;
        username : string
      }
    }
  }
}

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

  console.log('Log', state.data);

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
    (rowData: any, rowI : any)  => {
      return (
        <View key={rowI} style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.projectCodeButton}
            activeOpacity={0.8}>
            <Text style={styles.projectCodeText}>{rowData.projectCode}</Text>
          </TouchableOpacity>
          <View style={styles.taskContainer}>
            {rowData.tasks?.map((task  : any, taskIndex : any) => (
              <View key={taskIndex} style={styles.taskItem}>
                <Text style={styles.taskDescription} allowFontScaling={true}>
                  {task.description}
                </Text>
                {task.activities?.map((activity : any, activityIndex : any) => (
                  <View key={activityIndex} style={styles.activityItem}>
                    <Text style={styles.activityDescription}>
                      {activity.description}
                      <Text style={styles.activityUser}>
                        {' by ' +
                          (activity.user_information?.name ?? 'unknown')}
                      </Text>
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      );
    },
    [state],
  );

  const renderDetail = (rowData: any, rowID: number) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={state.data}
          renderItem={({item, index}) => _renderItemDetail(item, index)}
          keyExtractor={(item, index) => `${item.projectCode}-${index}`}
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
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  projectCodeButton: {
    backgroundColor: '#F5F5F5',
    width: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  projectCodeText: {
    color: '#282A31',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  taskContainer: {
    marginBottom: 10,
  },
  taskItem: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  taskDescription: {
    fontSize: 16,
    color: '#282A31',
  },
  activityItem: {
    paddingLeft: 10,
    marginVertical: 5,
  },
  activityDescription: {
    fontSize: 14,
    color: '#282A31',
  },
  activityUser: {
    fontStyle: 'italic',
    color: '#929CB1',
  },
});

export default TimelineC;
