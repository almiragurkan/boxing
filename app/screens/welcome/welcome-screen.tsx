import React, { FC, useRef, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleProp, ImageStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  GradientBackground, Icon,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { Countdown } from "react-native-element-timer"
import { useKeepAwake } from "expo-keep-awake"

const image = require("../screens/welcome/logo2.png")


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const IMAGE: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TEXT_BOXING: TextStyle = {
  ...TEXT,
  ...BOLD,
  textAlign: "center",
  fontSize: 20,
  padding: spacing[4],
}


const TIME: ViewStyle = {
  alignItems: "center",
  paddingVertical: spacing[8],
  flex: 0.25,
}
const TEXT_TIME: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 130,
}

const SETTING: ViewStyle = {
  flex: 0.10,
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("settings")

    const countdownRef = useRef(null)
    const [counterState, setCounterState] = useState("initial")

    const onPressPlayPause = () => {
      if (counterState === "initial") {
        countdownRef.current.start()
        setCounterState("running")
      } else if (counterState === "running") {
        countdownRef.current.pause()
        setCounterState("paused")
      } else if (counterState === "paused") {
        countdownRef.current.resume()
        setCounterState("running")
      }
    }
    useKeepAwake()

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#000000", "#000000"]} />
        <ImageBackground source={image} resizeMode="contain" style={IMAGE}>
          <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
            <View style={{ flex: 0.1 }}>
              <Text style={TEXT_BOXING}>classic boxing</Text>
            </View>
            <View style={WORK_REST}>
              <View style={TEXT_WORK_REST_VIEW}>
                <Text style={TEXT_WORK_REST}>Work</Text>
                <Text style={TEXT_WORK_REST_VALUE}>03:00</Text>
              </View>
              <View style={TEXT_WORK_REST_VIEW}>
                <Text style={TEXT_WORK_REST}>Round</Text>
                <Text style={TEXT_WORK_REST_VALUE}>1/6</Text>
              </View>
              <View style={TEXT_WORK_REST_VIEW}>
                <Text style={TEXT_WORK_REST}>Rest</Text>
                <Text style={TEXT_WORK_REST_VALUE}>00:30</Text>
              </View>
            </View>
            <View style={{ flex: 0.35, justifyContent: "center" }}>
              <Countdown
                ref={countdownRef}
                textStyle={TEXT_TIME}
                initialSeconds={180}
                // onTimes={}
                // onPause={}
                // onEnd={}
              />
            </View>
            <View style={{ flex: 0.2, flexDirection: "row", justifyContent: "center" }}>
              {counterState === "initial" || counterState === "paused" ?
                <TouchableOpacity onPress={onPressPlayPause}>
                  <Icon icon="iconsPlayButton" style={STYLE_ICON_BUTTONS} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={onPressPlayPause}>
                  <Icon icon="iconsPauseButton" style={STYLE_ICON_BUTTONS} />
                </TouchableOpacity>
              }
              {(counterState !== "initial") ?
                <TouchableOpacity onPress={() => {
                  countdownRef.current.stop()
                  setCounterState("initial")
                }}>
                  <Icon icon="iconsStopButton" style={STYLE_ICON_BUTTONS} />
                </TouchableOpacity>
                :
                null
              }
            </View>
            <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "flex-start" }}>
              <TouchableOpacity style={SETTING} onPress={nextScreen}>
                <Icon icon="iconsSettingsButton" style={STYLE_SETTINGS_BUTTONS} />
              </TouchableOpacity>
            </View>
          </Screen>
        </ImageBackground>
      </View>
    )
  },
)

const STYLE_ICON_BUTTONS: StyleProp<ImageStyle> = {
  height: 96,
  width: 96,
  marginStart: 10,
  marginEnd: 10,
}
const STYLE_SETTINGS_BUTTONS: StyleProp<ImageStyle> = {
  height: 48,
  width: 48,
}
const PLAY: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}
const WORK_REST: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 0.2,
}

const TEXT_WORK_REST_VIEW: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  paddingTop: spacing[4],
  paddingBottom: spacing[2],
}
const TEXT_WORK_REST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
}
const TEXT_WORK_REST_VALUE: TextStyle = {
  ...TEXT,
  fontSize: 20,
  textAlign: "center",
}