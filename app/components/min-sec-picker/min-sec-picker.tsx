import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { Picker } from "@react-native-picker/picker"
import { Icon } from "../icon/icon"
import { useState } from "react"
import { useKeepAwake } from "expo-keep-awake"

const CONTAINER: ViewStyle = {
  borderWidth: 0.5,
  borderBottomColor: color.palette.lightGrey,
  marginVertical: 5,
  flexDirection: "row",
  justifyContent: "space-between",
}
const SUB_CONTAINER: ViewStyle = {
  flex: 0.9,
}
const SUB_CONTAINER2: ViewStyle = {
  flex: 0.1,
}
const INNER_VIEW1: ViewStyle = {
  marginBottom: 10,
  backgroundColor: color.palette.black,
}
const INNER_VIEW2: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
}
const BOLD: TextStyle = {
  fontWeight: "bold",
}
const STYLE_PICKER: ViewStyle = {
  flex: 0.5,
  backgroundColor: color.palette.pickerBg,
}
const STYLE_PICKER_ITEM: TextStyle = {
  color: color.palette.white,
}
const STYLE_PICKER_LABEL: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 18,
  color: color.palette.white,
}
const STYLE_PICKER_LABEL_SMALL: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 12,
  color: color.palette.white,
  paddingStart: spacing[2],
  paddingBottom: spacing[1],
}
const STYLE_OK_BUTTON: ViewStyle = {
  height: 40,
  borderColor: color.palette.pickerBg1,
  borderTopColor: color.palette.pickerBg1,
  borderTopWidth: 1,
  borderBottomWidth: 1.5,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  justifyContent: "center",
  backgroundColor: color.palette.pickerBg
}
const STYLE_OK_BUTTON_TEXT: TextStyle = {
  color: color.palette.white,
  fontSize: 20,
  textAlign: "center", ...BOLD,
}
const STYLE_ICON: ImageStyle = {
  width: 18, height: 25,
}


export interface MinSecPickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  labelText?: string
  labelTextSmall?: string
  valueInSeconds?: number
  styleLabel?: TextStyle
  styleSmallLabel?: TextStyle
  updateSelected: any
}

const secondsToMinutes = (seconds: number) => {
  const secs = seconds % 60
  const mins = (seconds - secs) / 60
  return { mins, secs }
}
const zeroPad = (num, places) => String(num).padStart(places, "0")

const generateMinutes = () => {
  const result = []
  for (let i = 0; i < 60; i++) {
    result.push(<Picker.Item label={i.toString()} value={i} key={"mins" + i} style={STYLE_PICKER_ITEM}/>)
  }

  return result
}

const generateSeconds = () => {
  const result = []
  for (let i = 0; i < 60; i++) {
    result.push(<Picker.Item label={i.toString()} value={i} key={"secs" + i} />)
  }

  return result
}

/**
 * Describe your component here
 */
export const MinSecPicker = observer(function MinSecPicker(props: MinSecPickerProps) {
  const { style, labelText, labelTextSmall, valueInSeconds, updateSelected } = props
  const styles = Object.assign({}, CONTAINER, style)

  const { mins, secs } = secondsToMinutes(valueInSeconds)
  const [timeOfRoundsMin, setTimeOfRoundsMin] = useState(mins)
  const [timeOfRoundsSec, setTimeOfRoundsSec] = useState(secs)
  const [showTimeOfRounds, setShowTimeOfRounds] = useState(false)

  const onPressDropdown = () => {
    if (showTimeOfRounds === false) {
      setShowTimeOfRounds(true)

    } else if (showTimeOfRounds === true) {
      setShowTimeOfRounds(false)
    }
  }
  const calSeconds = (mins, secs) => {
    return (mins * 60) + secs
  }
  useKeepAwake()

  return (
    <View style={styles}>
      <View style={SUB_CONTAINER}>
        <TouchableOpacity onPress={() => {
          onPressDropdown()
        }}>
          <Text style={STYLE_PICKER_LABEL}>{labelText}</Text>
        </TouchableOpacity>
        <Text
          style={STYLE_PICKER_LABEL_SMALL}>{labelTextSmall} ({zeroPad(timeOfRoundsMin, 2)}:{zeroPad(timeOfRoundsSec, 2)})</Text>
        {
          showTimeOfRounds ?
            <View style={INNER_VIEW1}>
              <View style={INNER_VIEW2}>
                <Picker
                  style={STYLE_PICKER}
                  selectedValue={timeOfRoundsMin}
                  onValueChange={(itemValue, itemIndex) => {
                    setTimeOfRoundsMin(itemValue)
                    updateSelected(calSeconds(itemValue, timeOfRoundsSec))
                  }}
                  itemStyle={STYLE_PICKER_ITEM}
                >
                  {generateMinutes()}
                </Picker>
                <Picker
                  style={STYLE_PICKER}
                  selectedValue={timeOfRoundsSec}
                  onValueChange={(itemValue, itemIndex) => {
                    setTimeOfRoundsSec(itemValue)
                    updateSelected(calSeconds(timeOfRoundsMin, itemValue))
                  }}
                  itemStyle={STYLE_PICKER_ITEM}
                >
                  {generateSeconds()}
                </Picker>
              </View>
              <TouchableOpacity style={STYLE_OK_BUTTON}>
                <Text style={STYLE_OK_BUTTON_TEXT}
                      onPress={() => setShowTimeOfRounds(false)}>Tamam</Text>
              </TouchableOpacity>
            </View>
            :
            null
        }
      </View>
      <View style={SUB_CONTAINER2}>
        <TouchableOpacity onPress={() => {
          onPressDropdown()
        }}>
          {
            showTimeOfRounds ?
              <Icon style={STYLE_ICON} icon="iconsDropdownButton" />
              :
              <Icon style={STYLE_ICON} icon="iconsDropdownRightButton" />
          }
        </TouchableOpacity>
      </View>
    </View>
  )
})
