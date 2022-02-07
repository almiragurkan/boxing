import React, { FC, useEffect, useRef, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleProp, ImageStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Screen,
  GradientBackground, Icon, BoxingCounter,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useKeepAwake } from "expo-keep-awake"
import { useStores } from "../../models"
import { defaultTrainingModelData } from "../../models/training-profile/training-profile-default"
import { Audio } from "expo-av"

const image = require("../../../assets/images/tko-bg.png")


const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const INNER_VIEW1: ViewStyle = {
  flex: 0.1,
}
const INNER_VIEW2: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 0.1,
}

const INNER_VIEW5: ViewStyle = {
  flex: 0.1,
  flexDirection: "row",
  justifyContent: "space-between",
}
const IMAGE: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const TEXT_BOXING: TextStyle = {
  ...TEXT,
  ...BOLD,
  textAlign: "center",
  fontSize: 20,
  padding: spacing[4],
}

const SETTING: ViewStyle = {
  flex: 0.10,
}

const STYLE_SETTINGS_BUTTONS: StyleProp<ImageStyle> = {
  height: 42,
  width: 42,
  borderRadius: 50,
  marginEnd: 20,
  paddingEnd: 20,
}
const TEXT_WORK_REST_VIEW: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  paddingTop: spacing[1],
}
const TEXT_WORK_REST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 24,
}
const TEXT_WORK_REST_VALUE: TextStyle = {
  ...TEXT,
  fontSize: 20,
  textAlign: "center",
}

const getSelectedProfile = (profileName: string, profileStore) => {
  for (let i = 0; i < profileStore.profiles.length; i++) {
    if (profileStore.profiles[i].name === profileName)
      return profileStore.profiles[i]
  }

  return [
    defaultTrainingModelData,
  ]
}

const timeFormatter = (seconds: number) => {
  const secs = seconds % 60
  const mins = (seconds - secs) / 60
  const strMin = String(mins).padStart(2, "0")
  const strSec = String(secs).padStart(2, "0")
  return strMin + ":" + strSec
}

const STYLE_COUNTER: ViewStyle = {
  flex: 0.65,
  flexDirection: "column",
  justifyContent: "space-between",
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const countDownRef = useRef(null)

    useEffect(() => {
      const unsubscribe = navigation.addListener("blur", () => {
        countDownRef.current.stopCounter()
      })
      return unsubscribe
    }, [navigation])

    const nextScreen = () => {
      navigation.navigate("settings")
    }
    const { profileTrainingStore } = useStores()

    async function playSound() {
      const sound = new Audio.Sound()
      try {
        __DEV__ && console.log("Loading Sound")
        await sound.loadAsync(require("../../../assets/sound/fight.mp3"))
        __DEV__ && console.log("Playing Sound")
        await sound
          .playAsync()
          .then(async playbackStatus => {
            setTimeout(() => {
              sound.unloadAsync()
            }, 2500)
          })
      } catch (error) {
        __DEV__ && console.log(error)
      }

    }

    if (profileTrainingStore.profiles.length <= 0) {
      profileTrainingStore.saveProfiles([defaultTrainingModelData])
    }

    const defaultProfileName = profileTrainingStore.profiles[0] ? profileTrainingStore.profiles[0].name : "default"
    const [selectedProfileName] = useState(defaultProfileName)
    var selectedProfile = getSelectedProfile(selectedProfileName, profileTrainingStore)

    const [roundCounter, setRoundCounter] = useState(1)
    const [bgColorGradient, setGgColorGradient] = useState([])

    const shiftBackgroundColor = ((states: string) => {
      let bgColor = []
      switch (states) {
        case "initial":
          bgColor = color.colorGradient.primary
          break
        case "run-prepare":
          bgColor = color.colorGradient.prepare
          break
        case "run-round":
          playSound().then(() => console.log("Playing ring"))
          bgColor = color.colorGradient.round
          break
        case "run-resting":
          bgColor = color.colorGradient.resting
          break
        case "end":
          bgColor = color.colorGradient.primary
          break
      }
      setGgColorGradient(bgColor)
    })


    useKeepAwake()
    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={bgColorGradient} />
        <ImageBackground source={image} resizeMode="contain" style={IMAGE}>
          <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
            <View style={INNER_VIEW1}>
              <Text style={TEXT_BOXING}>classic boxing</Text>
            </View>
            <View style={INNER_VIEW2}>
              <View style={TEXT_WORK_REST_VIEW}>
                <Text style={TEXT_WORK_REST}>Work</Text>
                <Text style={TEXT_WORK_REST_VALUE}>{timeFormatter(selectedProfile.timeOfRound)}</Text>
              </View>
              <View style={TEXT_WORK_REST_VIEW}>
                <Text style={TEXT_WORK_REST}>Round</Text>
                <Text
                  style={TEXT_WORK_REST_VALUE}>{selectedProfile.rounds - roundCounter + 1}/{selectedProfile.rounds}</Text>
              </View>
              <View style={TEXT_WORK_REST_VIEW}>
                <Text style={TEXT_WORK_REST}>Rest</Text>
                <Text style={TEXT_WORK_REST_VALUE}>{timeFormatter(selectedProfile.timeOfRest)}</Text>
              </View>
            </View>
            <BoxingCounter
              style={STYLE_COUNTER}
              onRound={(round) => setRoundCounter(round)}
              rounds={selectedProfile.rounds}
              timeOfRound={selectedProfile.timeOfRound}
              timeOfRest={selectedProfile.timeOfRest}
              timeRoundWarning={selectedProfile.timeRoundWarning}
              timeOfPrepare={selectedProfile.timeOfPrepare}
              signalOutStates={shiftBackgroundColor}
              ref={countDownRef}
            />
            <View style={INNER_VIEW5}>
              <TouchableOpacity style={SETTING} onPress={nextScreen}>
                <Icon icon="iconsSettingsButton" style={STYLE_SETTINGS_BUTTONS} />
              </TouchableOpacity>
              {/* <TouchableOpacity style={SETTING} onPress={nextScreen}> */}
              {/*   <Icon icon="iconAbout" style={STYLE_SETTINGS_BUTTONS} /> */}
              {/* </TouchableOpacity> */}
            </View>
          </Screen>
        </ImageBackground>
      </View>
    )
  },
)
