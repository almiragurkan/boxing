import React, { FC } from "react"
import { View, ViewStyle, TextStyle, Text, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  GradientBackground,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"




const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex:1,
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
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
  flex:0.1
}
const TEXT_WORK_REST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize:30,
}

const TIME: ViewStyle = {
  alignItems:"center",
  paddingVertical:spacing[8],
  flex:0.4
}
const TEXT_TIME: TextStyle = {
  ...TEXT,
  ...BOLD,
  textAlign: "center",
  fontSize:130,
}
const TEXT_ROUND: TextStyle = {
  ...TEXT,
  ...BOLD,
  textAlign: "center",
  fontSize:50,
  flex:0.15
}
const PLAY: ViewStyle = {
  alignItems:"center",
  flex:0.20
}
const TEXT_PLAY: TextStyle = {
  ...TEXT,
  ...BOLD,
  borderRadius:50,
  borderColor:color.palette.lighterGrey,
  borderWidth: 1,
  backgroundColor:color.palette.lighterGrey,
  paddingVertical:10,
  paddingHorizontal:15,
  fontSize:30,
}
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

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.boxing" style={HEADER} titleStyle={HEADER_TITLE} />
          <Text style={TEXT_BOXING}>classic boxing</Text>
          <View style={WORK_REST}>
            <Text style={TEXT_WORK_REST}>Work</Text>
            <Text style={TEXT_WORK_REST}>Rest</Text>
          </View>
          <View style={TIME}>
            <Text style={TEXT_TIME}>03:00</Text>
          </View>
          <Text style={TEXT_ROUND}>Round 1/2</Text>
          <TouchableOpacity style={PLAY}>
            <Text style={TEXT_PLAY}>▶</Text>
          </TouchableOpacity>
          <TouchableOpacity style={SETTING} onPress={nextScreen}>
            <Text style={TEXT_SETTING}>✻</Text>
          </TouchableOpacity>

        </Screen>
      </View>
    )
  },
)