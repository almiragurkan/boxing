import React, { useEffect, useState } from "react"
import { ImageStyle, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"



const TEXT_TIME: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontWeight: "bold",
  textAlign: "center",
  fontSize:130,
}
export interface TimerProps {
  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */

  containerStyle?: StyleProp<ViewStyle>

  /**
   * The name of the icon
   */

  initialMinute?:number
  initialSeconds?:number
  onStart?:any
  onPause?:any
  onEnd?:any
}


const Timer = (props:TimerProps) => {
  const {initialMinute, initialSeconds, /* onStart, onPause, onEnd */} = props;
  __DEV__&&console.log("değerler",initialMinute,initialSeconds)
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);
  useEffect(()=>{
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000)
    return ()=> {
      clearInterval(myInterval);
    };
  });

  return (
    <View>
      { minutes === 0 && seconds === 0
        ? <Text>{minutes}:{seconds}</Text>
        : <Text style={TEXT_TIME}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Text>
      }
    </View>
  )
}

export default Timer;