import React, { FC, useRef } from "react"
import { View, ViewStyle, TextStyle, Text, TouchableOpacity, ImageBackground } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  GradientBackground, Icon,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import {Countdown} from 'react-native-element-timer';


const image = require("../screens/welcome/logo2.png")


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex:1,
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const IMAGE: ViewStyle = {
  flex:1,
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
  fontSize:20,
  padding: spacing[0],
  flex:0.05
}
const WORK_REST: ViewStyle = {
  flexDirection: "row",
  justifyContent:"space-around",
  padding: spacing[4],
  flex:0.35
}
const TEXT_WORK_REST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize:30,
}

const TIME: ViewStyle = {
  alignItems:"center",
  paddingVertical:spacing[8],
  flex:0.25,
}
const TEXT_TIME: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontWeight: "bold",
  textAlign: "center",
  fontSize:130,
}

const TEXT_ROUND: TextStyle = {
  ...TEXT,
  ...BOLD,
  textAlign: "center",
  fontSize:50,
  flex:0.12
}
const PLAY: ViewStyle = {
  flexDirection:"row",
  justifyContent:"center",
  alignItems:"center",
  flex:0.13
}
/* const TEXT_PLAY: TextStyle = {
  ...TEXT,
  ...BOLD,
  borderRadius:50,
  borderColor:color.palette.lighterGrey,
  borderWidth: 1,
  backgroundColor:color.palette.lighterGrey,
  paddingVertical:10,
  paddingHorizontal:15,
  fontSize:30,
} */
const SETTING: ViewStyle = {
  flex:0.10,
}
const TEXT_SETTING: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize:40,
}


export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("settings")

    const countdownRef = useRef(null);

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#000000", "#000000"]} />
        <ImageBackground source={image} resizeMode="contain" style={IMAGE}>
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.boxing" style={HEADER} titleStyle={HEADER_TITLE} />
          <Text style={TEXT_BOXING}>classic boxing</Text>
          <View style={WORK_REST}>
            <Text style={TEXT_WORK_REST}>Work</Text>
            <Text style={TEXT_WORK_REST}>Rest</Text>
          </View>
          <View style={TIME}>
            <Countdown
              ref={countdownRef}
              textStyle={TEXT_TIME}
              initialSeconds={180}
              onTimes={e => {}}
              onPause={e => {}}
              onEnd={(e) => {}}
            />
          </View>
          <Text style={TEXT_ROUND}>Round 1/2</Text>
          <View style={PLAY}>
            <TouchableOpacity  onPress={() => {countdownRef.current.start()}}>
              {/* onPress={switchIcon} */}
              <Icon icon="iconsPlayButton"></Icon>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {countdownRef.current.pause()}}>
              <Icon icon="iconsPauseButton"></Icon>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {countdownRef.current.resume()}}>
              <Icon icon="bug"></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {countdownRef.current.stop()}}>
              <Icon icon="bullet"></Icon>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={SETTING} onPress={nextScreen}>
            <Text style={TEXT_SETTING}>✻</Text>
          </TouchableOpacity>

        </Screen>
        </ImageBackground>
      </View>
    )
  },
)
