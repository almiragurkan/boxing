import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { Picker } from "@react-native-picker/picker"
import { Icon } from "../icon/icon"
import { useState } from "react"

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
const zeroPad = (num, places) => String(num).padStart(places, '0')

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
        <Text style={STYLE_PICKER_LABEL_SMALL}>{labelTextSmall} ({zeroPad(timeOfRoundsMin,2)}:{zeroPad(timeOfRoundsSec,2)})</Text>
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
  )
})
