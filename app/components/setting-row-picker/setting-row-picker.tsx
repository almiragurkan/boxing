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
const STYLE_PICKER: ViewStyle = {
  marginBottom:3,
  flex: 0.5,
  backgroundColor:color.palette.lightGrey
}
const STYLE_PICKER_ITEM: TextStyle = {
  color: color.palette.white
}
const STYLE_ICON: ImageStyle = {
  width:18, height:18
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
  updateSelected: any
}


const generateItems = (itemArray) => {
  const result = []
  for (let i = 0; i < itemArray.length; i++) {
    result.push(<Picker.Item label={itemArray[i].label} value={itemArray[i].value} key={"picker" + i} />)
  }

  return result
}

const getLabelByVal = (dataSource, val) => {
  for (let i = 0; i < dataSource.length; i++) {
    if (dataSource[i].value === val)
      return dataSource[i].label
  }
  return val
}

export const SettingRowPicker = observer(function SettingRowPicker(props: SettingRowPickerProps) {
  const { style, value, styleLabel, styleSmallLabel, labelText, dataSource, updateSelected } = props
  const styles = Object.assign({}, CONTAINER, style)
  const labelStyle = Object.assign({}, STYLE_PICKER_LABEL, styleLabel)
  const labelSmallStyle = Object.assign({}, STYLE_PICKER_LABEL_SMALL, styleSmallLabel)

  const gItem = generateItems(dataSource)
  const [showPicker, setShowPicker] = useState(false)
  const [pickerValue, setPickerValue] = useState(value)
  const [pickerLabel, setPickerLabel] = useState(getLabelByVal(dataSource, value))

  const onPressDropdown = () => {
    if (showPicker === false) {
      setShowPicker(true)

    } else if (showPicker === true) {
      setShowPicker(false)
    }
  }
  useKeepAwake()

  return (
    <View style={styles}>
      <View style={STYLE_INNER_VIEW1}>
        <TouchableOpacity onPress={() => {
          onPressDropdown()
        }}>
          <Text style={labelStyle}>{labelText}</Text>
        </TouchableOpacity>
          <Text style={labelSmallStyle}>{pickerLabel}</Text>
          {
            showPicker ?
              <Picker
                style={STYLE_PICKER}
                selectedValue={pickerValue}
                onValueChange={(itemValue, itemIndex) => {
                  setPickerValue(itemValue)
                  setShowPicker(false)
                  setPickerLabel(dataSource[itemIndex].label)
                  updateSelected(itemValue)
                }
                }
                itemStyle={STYLE_PICKER_ITEM}
              >
                {gItem}
              </Picker>
              :
              null
          }
      </View>
      <View style={STYLE_INNER_VIEW2}>
        <TouchableOpacity onPress={() => {onPressDropdown()}}>
          {
          showPicker ?
            <Icon style={STYLE_ICON} icon="iconsDropdownButton" />
            :
            <Icon style={STYLE_ICON} icon="iconsDropdownRightButton" />
          }
        </TouchableOpacity>
      </View>
    </View>
  )
})
