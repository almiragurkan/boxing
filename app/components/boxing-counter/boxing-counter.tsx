import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Countdown } from "react-native-element-timer"
import { useEffect, useImperativeHandle, useRef, useState } from "react"
import { Icon } from "../icon/icon"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT_TIME: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 130,
}

const STYLE_VIEW_BUTTONS: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
}
const STYLE_VIEW_COUNTER_TEXT: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
}

const STYLE_ICON_BUTTONS: StyleProp<ImageStyle> = {
  height: 96,
  width: 96,
  marginStart: 10,
  marginEnd: 10,
}

export interface BoxingCounterProps {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  signalOutStates?: any
  onRound: any
  rounds: number
  timeOfRound: number
  timeOfRest: number
  timeRoundWarning: number
  timeOfPrepare: number
}


export const BoxingCounter = observer(function BoxingCounter(props: BoxingCounterProps, ref) {
    const {
      style,
      textStyle,
      rounds,
      timeOfPrepare,
      timeOfRound,
      timeOfRest,
      onRound,
      signalOutStates,
    } = props
    const styles = Object.assign({}, CONTAINER, style)
    const styleText = Object.assign({}, TEXT_TIME, textStyle)

    const countDownRef = useRef(null)
    const [counterState, setCounterState] = useState("initial")
    const [roundCount, setRoundCount] = useState(rounds)
    const [countingValue, setCountingValue] = useState(timeOfRound)
    const [isPaused, setIsPaused] = useState(false)

    const initCounter = () => {
      setCounterState("initial")
      setRoundCount(rounds)
      setCountingValue(timeOfRound)
    }

    useEffect(() => {
      onRound(roundCount)
    }, [roundCount])

    useEffect(() => {
      if (counterState === "stopping") {
        countDownRef.current.stop()
      }
      signalOutStates(counterState)
    }, [counterState])

    const setCVal = async (val) => {
      setCountingValue(val)
    }

    const pauseResume = () => {
      if (isPaused) {
        __DEV__ && console.log("Resume")
        countDownRef.current.resume()
      } else {
        __DEV__ && console.log("Paused")
        countDownRef.current.pause()
      }
      setIsPaused(!isPaused)
    }

    useImperativeHandle(ref, () => {
      return { stopCounter }
    })

    const stopCounter = () => {
      setCounterState("stopping")
    }

    const EXEC_STATE_ENGINE = () => {
      __DEV__ && console.log("counterState=> ", counterState)
      switch (counterState) {
        case "initial":
          setCounterState("run-prepare")
          setCVal(timeOfPrepare).then(() => {
            countDownRef.current.start()
          })

          break
        case "run-prepare":
          setCounterState("run-round")
          setCVal(timeOfRound).then(() => {
            countDownRef.current.start()
            __DEV__ && console.log("Counter value set to ", countingValue)
          })
          break
        case "run-round":
          if (roundCount > 1) {
            setCounterState("run-resting")
            setCVal(timeOfRest).then(() => {
              countDownRef.current.start()
            })
          } else {
            setCounterState("end")
            initCounter()
          }
          break
        case "run-resting":
          if (roundCount > 1) {
            setRoundCount(roundCount - 1)
            setCounterState("run-round")
            setCVal(timeOfRound).then(() => {
              countDownRef.current.start()
            })
          } else {
            setCounterState("end")
            countDownRef.current.stop()
          }
          break
        case "stopping":
          initCounter()
          break
        case "end":
          initCounter()
          break
        default:
          __DEV__ && console.log("counterState 1 => unknown :", counterState)
      }
    }

    return (
      <View style={styles}>
        <View style={STYLE_VIEW_COUNTER_TEXT}>
          <Countdown
            ref={countDownRef}
            autoStart={false}
            textStyle={styleText}
            initialSeconds={countingValue}
            onEnd={EXEC_STATE_ENGINE}
          />
        </View>
        <View style={STYLE_VIEW_BUTTONS}>
          {counterState === "initial" ?
            <TouchableOpacity onPress={EXEC_STATE_ENGINE}>
              <Icon icon="iconsPlayButton" style={STYLE_ICON_BUTTONS} />
            </TouchableOpacity>
            :
            <View style={{ flexDirection: "row" }}>
              {isPaused ?
                <TouchableOpacity onPress={pauseResume}>
                  <Icon icon="iconsPlayButton" style={STYLE_ICON_BUTTONS} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={pauseResume}>
                  <Icon icon="iconsPauseButton" style={STYLE_ICON_BUTTONS} />
                </TouchableOpacity>
              }
              <TouchableOpacity onPress={stopCounter}>
                <Icon icon="iconsStopButton" style={STYLE_ICON_BUTTONS} />
              </TouchableOpacity>
            </View>
          }

        </View>
      </View>
    )
  },
  { forwardRef: true })
