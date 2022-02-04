import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
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

const STYLE_INNER_VIEW1: ViewStyle = {
  flex: 0.9,
}
const STYLE_INNER_VIEW2: ViewStyle = {
  flex: 0.1,
}

export interface SettingRowPickerProps {
  style?: StyleProp<ViewStyle>
  labelText?: string
  labelTextSmall?: string
  styleLabel?: TextStyle
  styleSmallLabel?: TextStyle
  value?: any
  dataSource?: any
}


const generateItems = (itemArray) => {
  const result = []
  for (let i = 0; i < itemArray.length; i++) {
    result.push(<Picker.Item label={itemArray[i].label} value={itemArray[i].value} key={"picker" + i} />)
  }

  return result
}


export const SettingRowPicker = observer(function SettingRowPicker(props: SettingRowPickerProps) {
  const { style, value, styleLabel, styleSmallLabel, labelText, dataSource } = props
  const styles = Object.assign({}, CONTAINER, style)
  const labelStyle = Object.assign({}, STYLE_PICKER_LABEL, styleLabel)
  const labelSmallStyle = Object.assign({}, STYLE_PICKER_LABEL_SMALL, styleSmallLabel)

  const gItem = generateItems(dataSource)
  const [showPicker, setShowPicker] = useState(false)
  const [pickerValue, setPickerValue] = useState(value)
  const [pickerLabel, setPickerLabel] = useState("")

  return (
    <View style={styles}>
      <View style={STYLE_INNER_VIEW1}>
        <Text style={labelStyle}>{labelText}</Text>
        <Text style={labelSmallStyle}>{pickerLabel}</Text>
        {
          showPicker ?
            <Picker
              selectedValue={pickerValue}
              onValueChange={(itemValue, itemIndex) => {
                setPickerValue(itemValue)
                setShowPicker(false)
                setPickerLabel(dataSource[itemIndex].label)
              }}
              itemStyle={{ color: color.palette.white }}
            >
              {gItem}
            </Picker>
            :
            null
        }
      </View>
      <View style={STYLE_INNER_VIEW2}>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Icon icon="back" />
        </TouchableOpacity>
      </View>
    </View>
  )
})
