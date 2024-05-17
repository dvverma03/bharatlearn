import React from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default class SemiCircleProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      percentage: props.percentage,
      animatedPercentage: new Animated.Value(props.percentage),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.percentage !== this.props.percentage) {
      this.setState({ percentage: this.props.percentage }, () => {
        this.animate();
      });
    }
  }

  animate = () => {
    const { percentage, animatedPercentage } = this.state;
    Animated.timing(animatedPercentage, {
      toValue: percentage,
      duration: 500, // adjust duration as needed
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { radius, strokeWidth, strokeColor, backgroundColor } = this.props;
    const { animatedPercentage } = this.state;

    const circumference = 2 * Math.PI * radius;
    const animatedStroke = animatedPercentage.interpolate({
      inputRange: [0, 100],
      outputRange: [0, circumference],
    });

    return (
      <View style={styles.container}>
        <Svg width={radius * 2} height={radius}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="transparent"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={animatedStroke}
          />
          <Text
            x={radius}
            y={radius}
            textAnchor="middle"
            style={styles.Percentage}
            alignmentBaseline="middle"
            fontSize={20} // adjust font size as needed
            fill="black" // adjust text color as needed
          >
            {`${100 - this.state.percentage - 15}%`}
          </Text>
        </Svg>
      </View>
    );
  }
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  Percentage: {
    position: "relative",
    left: 70,
    top: 60,
    fontSize: 30,
    fontWeight: "600",
  },
});
