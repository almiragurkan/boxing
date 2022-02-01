import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { GradientBackground, Header, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  DropdownNumber,
  PickerItem, PickerTime,
} from "react-native-ultimate-modal-picker"
import { Picker } from "@react-native-picker/picker"

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
  color:color.palette.orangeDarker,
  paddingTop:10
}
const TEXT_ITEM: TextStyle = {
  ...TEXT,
  fontSize: 16,
  color:color.palette.white
}
const TEXT_ITEM_: TextStyle = {
  ...TEXT,
  fontSize: 22,
  color:color.palette.white
}
const TEXT_SUBITEM: TextStyle = {
  ...TEXT,
  fontSize: 12,
  color:color.palette.lighterGrey,
  paddingBottom:5
}
const LINE: ViewStyle = {
  borderWidth:0.5,
  borderColor:color.palette.lightGrey,
  marginVertical:5
}


export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    // Dropdowns
    const [ numberValue, setNumberValue ] = useState<string>('');
    const [ time, setTime ] = useState<Date>(new Date());

    const items: Array<PickerItem> = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '10', value: '10' },
    ];


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
        <View>
          <Text style={TEXT_ITEM}>Profile</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Number of rounds</Text>
          <DropdownNumber
            onChange={(value: string) => setNumberValue(value)}
            darkMode={true}
              customStyleContainer={{
              containerLight: {
              backgroundColor: '#000000',
              borderColor: '#000000',
              borderBottomWidth: 2,
            },
              containerDark: {
              backgroundColor: 'rgba(255,255,255,0.49)',
              borderColor: '#000000',
              borderBottomWidth: 2,
            },
            }}
          />
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Time of round</Text>
          <PickerTime
            title="Tıme"
            onChange={(date: Date) => setTime(date)}
            mode="spinner"
          />
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Time of rest</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Time round warning</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Inner periodic alert</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Time of prepare</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>Signal the end of rest</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <Text style={TEXT_TITLE}>Sensor Settings</Text>
        <View>
          <Text style={TEXT_ITEM}>Use accelerometer</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>Accelerometer sensivity</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>Use proximity sensor</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <Text style={TEXT_TITLE}>Sound Settings</Text>
        <View>
          <Text style={TEXT_ITEM_}>Start-End round</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Before round end</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Before rest end</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Inner round alert</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <Text style={TEXT_TITLE}>Background Colors</Text>
        <Text style={TEXT_TITLE}>Other</Text>
        <View>
          <Text style={TEXT_ITEM}>Hide panel</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>Enable voice output</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>Device TTS Setting</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>Keep Screen On</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>'Media' sound stream</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM_}>Language</Text>
          <Text style={TEXT_SUBITEM}>Default</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>Help us translate</Text>
        </View>
        <Text style={TEXT_TITLE}>Paid Version</Text>
        <View>
          <Text style={TEXT_ITEM}>Buy paid version</Text>
          <Text style={TEXT_SUBITEM}>classic boxing(Time 47:00)</Text>
        </View>
        <View style={LINE}></View>
        <View>
          <Text style={TEXT_ITEM}>User id</Text>
          <Text style={TEXT_SUBITEM}>123456</Text>
        </View>


      </Screen>
    </View>
  )
  },
)