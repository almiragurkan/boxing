import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import {
  GradientBackground,
  Header,
  Screen,
  MinSecPicker, SettingRowBool, SettingRowPicker,
} from "../../components"

import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { defaultTrainingModelData } from "../../models/training-profile/training-profile-default"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  fontFamily: typography.primary,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TEXT_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 15,
  color: color.palette.orangeDarker,
  marginTop: spacing[5],
  marginBottom: spacing[2],
  paddingTop: spacing[1],
}

const savedProfilesToPickerDatasource = (profiles) => {
  const results = []
  for (let i = 0; i < profiles.length; i++) {
    results.push({
      label: profiles[i].name,
      value: profiles[i].id,
    })
  }
  return results
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

const generateRoundsPicker = (rounds: number) => {
  const result = []
  for (let i = 1; i <= rounds; i++) {
    result.push({ label: i.toString(), value: i })
  }
  return result
}
export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const { profileTrainingStore } = useStores()

    if (profileTrainingStore.profiles.length <= 0) {
      profileTrainingStore.saveProfiles([defaultTrainingModelData])
    }

    const defaultProfileName = profileTrainingStore.profiles[0] ? profileTrainingStore.profiles[0].name : "default"
    const [selectedProfileName] = useState(defaultProfileName)

    var selectedProfile = getSelectedProfile(selectedProfileName, profileTrainingStore)

    return (
      <View testID="SettingsScreen" style={FULL}>
        <GradientBackground colors={["#000000", "#000000"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="settingsScreen.setting"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text style={TEXT_TITLE}>Profile Settings</Text>

          <SettingRowPicker
            updateSelected={(val) => selectedProfile.setField("id", val)}
            dataSource={savedProfilesToPickerDatasource(profileTrainingStore.profiles)}
            labelText="Profile" value={selectedProfile.id} />

          <SettingRowPicker
            updateSelected={(val) => {
              selectedProfile.setField("rounds", val)
            }}
            dataSource={generateRoundsPicker(200)}
            labelText="Number of Rounds" value={selectedProfile.rounds} />

          <MinSecPicker
            labelText="Time of Round"
            valueInSeconds={selectedProfile.timeOfRound}
            updateSelected={(val) => selectedProfile.setField("timeOfRound", val)} />
          <MinSecPicker
            labelText="Time of Rest"
            valueInSeconds={selectedProfile.timeOfRest}
            updateSelected={(val) => selectedProfile.setField("timeOfRest", val)} />
          <MinSecPicker
            labelText="Time round warning"
            valueInSeconds={selectedProfile.timeRoundWarning}
            updateSelected={(val) => selectedProfile.setField("timeRoundWarning", val)} />
          <MinSecPicker
            labelText="Inner periodic alert"
            valueInSeconds={selectedProfile.innerPeriodicAlert}
            updateSelected={(val) => selectedProfile.setField("innerPeriodicAlert", val)} />
          <MinSecPicker
            labelText="Time of prepare"
            valueInSeconds={selectedProfile.timeOfPrepare}
            updateSelected={(val) => selectedProfile.setField("timeOfPrepare", val)} />

          <SettingRowBool
            labelText="Signal the end of rest"
            labelTextSmall="Round bitiminden 10s önce uyar"
            defaultValue={selectedProfile.signalEndOfRest} />

          <Text style={TEXT_TITLE}>Sensor Settings</Text>
          <SettingRowBool
            labelText="Use accelerometer"
            labelTextSmall="Sensör ile başlat"
            defaultValue={selectedProfile.useAccelerometer} />

          <SettingRowBool
            labelText="Accelerometer sensivity"
            labelTextSmall="Hassaiyet ayarı"
            defaultValue={true} />

          <SettingRowBool
            labelText="Use proximity sensor"
            labelTextSmall="Sensör ile başlat"
            defaultValue={true} />

          {/* <Text style={TEXT_TITLE}>Sound Settings</Text> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM_}>Start-End round</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM_}>Before round end</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM_}>Before rest end</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM_}>Inner round alert</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}

          {/* <Text style={TEXT_TITLE}>Background Colors</Text> */}
          {/* <Text style={TEXT_TITLE}>Other</Text> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM}>Hide panel</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM}>Enable voice output</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM}>Device TTS Setting</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM}>Keep Screen On</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM}>'Media' sound stream</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM_}>Language</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>Default</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM}>Help us translate</Text> */}
          {/* </View> */}
          {/* <Text style={TEXT_TITLE}>Paid Version</Text> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM}>Buy paid version</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text> */}
          {/* </View> */}
          {/* <View style={LINE}/> */}
          {/* <View> */}
          {/*   <Text style={TEXT_ITEM}>User id</Text> */}
          {/*   <Text style={TEXT_SUBITEM}>123456</Text> */}
          {/* </View> */}
        </Screen>
      </View>
    )
  },
)