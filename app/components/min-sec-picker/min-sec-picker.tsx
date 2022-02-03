import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { Picker } from "@react-native-picker/picker"
import { Icon } from "../icon/icon"
import { useEffect, useState } from "react"

const CONTAINER: ViewStyle = {
  borderWidth: 0.5,
  borderBottomColor: color.palette.lightGrey,
  marginVertical: 5,
  flexDirection: "row",
  justifyContent: "space-between",
}

const STYLE_PICKER_LABEL: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}
const STYLE_PICKER_LABEL_SMALL: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 8,
  color: color.primary,
}

const BOLD: TextStyle = { fontWeight: "bold" }

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
    result.push(<Picker.Item label={i.toString()} value={i} key={"mins" + i} />)
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
  const { style, labelText, labelTextSmall, valueInSeconds } = props
  const styles = Object.assign({}, CONTAINER, style)

  const { mins, secs } = secondsToMinutes(valueInSeconds)
  const [timeOfRoundsMin, setTimeOfRoundsMin] = useState(mins)
  const [timeOfRoundsSec, setTimeOfRoundsSec] = useState(secs)
  const [showTimeOfRounds, setShowTimeOfRounds] = useState(false)

  return (
    <View style={styles}>
      <View style={{ flex: 0.9 }}>
        <Text style={STYLE_PICKER_LABEL}>{labelText}</Text>
        <Text
          style={STYLE_PICKER_LABEL_SMALL}>{labelTextSmall} ({zeroPad(timeOfRoundsMin, 2)}:{zeroPad(timeOfRoundsSec, 2)})</Text>
        {
          showTimeOfRounds ?
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Picker
                  style={{ flex: 0.5 }}
                  selectedValue={timeOfRoundsMin}
                  onValueChange={(itemValue, itemIndex) => {
                    setTimeOfRoundsMin(itemValue)
                  }}
                  itemStyle={{ color: color.palette.white }}
                >
                  {generateMinutes()}
                </Picker>
                <Picker
                  style={{ flex: 0.5 }}
                  selectedValue={timeOfRoundsSec}
                  onValueChange={(itemValue, itemIndex) => {
                    setTimeOfRoundsSec(itemValue)
                  }}
                  itemStyle={{ color: color.palette.white }}
                >
                  {generateSeconds()}
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
  )
})