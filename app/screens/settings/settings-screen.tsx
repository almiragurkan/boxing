import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import {
  GradientBackground,
  Header,
  Icon,
  Screen,
  MinSecPicker,
} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
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
  color: color.palette.orangeDarker,
  paddingTop: 10,
}
const TEXT_ITEM: TextStyle = {
  ...TEXT,
  fontSize: 16,
  color: color.palette.white,
}
const TEXT_ITEM_: TextStyle = {
  ...TEXT,
  fontSize: 22,
  color: color.palette.white,
}
const TEXT_SUBITEM: TextStyle = {
  ...TEXT,
  fontSize: 12,
  color: color.palette.lighterGrey,
  paddingBottom: 5,
}
const LINE: ViewStyle = {
  borderWidth: 0.5,
  borderColor: color.palette.lightGrey,
  marginVertical: 5,
}


export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const [selectedProfile, setSelectedProfile] = useState()
    const [showProfileSelect, setShowProfileSelect] = useState(false)

    const [numberOfRounds, setNumberOfRounds] = useState(1)
    const [showNumberOfRounds, setShowNumberOfRounds] = useState(false)

    const [timeOfRoundsMin, setTimeOfRoundsMin] = useState(1)
    const [timeOfRoundsSec, setTimeOfRoundsSec] = useState(1)
    const [showTimeOfRounds, setShowTimeOfRounds] = useState(false)

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

          {/* Setting Profile */}
          <View style={{
            borderWidth: 0.5,
            borderBottomColor: color.palette.lightGrey,
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
            <View style={{ flex: 0.9 }}>
              <Text style={TEXT_ITEM}>Profile</Text>
              <Text style={TEXT_SUBITEM}>Profile : {selectedProfile}</Text>
              {
                showProfileSelect ?
                  <Picker
                    selectedValue={selectedProfile}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedProfile(itemValue)
                      setShowProfileSelect(false)
                    }
                    }
                    itemStyle={{ color: color.palette.white }}
                  >
                    <Picker.Item label="Classic" value="classic" />
                    <Picker.Item label="KickBox" value="kickbox" />
                  </Picker>
                  :
                  null
              }
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => setShowProfileSelect(true)}>
                <Icon icon="back" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Setting Profile Ends */}

          {/* Setting Number of Rounds */}
          <View style={{
            borderWidth: 0.5,
            borderBottomColor: color.palette.lightGrey,
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
            <View style={{ flex: 0.9 }}>
              <Text style={TEXT_ITEM}>Rounds</Text>
              <Text style={TEXT_SUBITEM}>Total rounds : {numberOfRounds}</Text>
              {
                showNumberOfRounds ?
                  <Picker
                    selectedValue={numberOfRounds}
                    onValueChange={(itemValue, itemIndex) => {
                      setNumberOfRounds(itemValue)
                      setShowNumberOfRounds(false)
                    }
                    }
                    itemStyle={{ color: color.palette.white }}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                  </Picker>
                  :
                  null
              }
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => setShowNumberOfRounds(true)}>
                <Icon icon="back" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Setting Number of Rounds Ends */}

          {/* Setting Time of Round */}
          <View style={{
            borderWidth: 0.5,
            borderBottomColor: color.palette.lightGrey,
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
            <View style={{ flex: 0.9 }}>
              <Text style={TEXT_ITEM}>Time of Round</Text>
              <Text style={TEXT_SUBITEM}>Round duration : {timeOfRoundsMin}:{timeOfRoundsSec}</Text>
              {
                showTimeOfRounds ?
                  <View style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                      <Picker
                        style={{ flex: 0.5 }}
                        selectedValue={timeOfRoundsMin}
                        onValueChange={(itemValue, itemIndex) => {
                          setTimeOfRoundsMin(itemValue)
                        }
                        }
                        itemStyle={{ color: color.palette.white }}
                      >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                      </Picker>
                      <Picker
                        style={{ flex: 0.5 }}
                        selectedValue={timeOfRoundsSec}
                        onValueChange={(itemValue, itemIndex) => {
                          setTimeOfRoundsSec(itemValue)
                        }
                        }
                        itemStyle={{ color: color.palette.white }}
                      >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                      </Picker>
                    </View>
                    <Text style={{ color: color.palette.white, fontSize: 20, textAlign: "center", ...BOLD }}
                          onPress={() => setShowTimeOfRounds(false)}>Tamam</Text>
                  </View>


                  :
                  null
              }
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => setShowTimeOfRounds(true)}>
                <Icon icon="back" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Setting Time of Round Ends */}

          <MinSecPicker labelText="Time of Bla bla" labelTextSmall="denme deme" valueInSeconds={233}/>

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