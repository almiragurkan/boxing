import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { Switch } from "../switch/switch"

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
  paddingBottom: spacing[1]
}

const STYLE_INNER_VIEW1: ViewStyle = {
  flexDirection: "column",
}

export interface SettingRowBoolProps {
  style?: StyleProp<ViewStyle>
  defaultValue?: boolean
  labelText?: string
  labelTextSmall?: string
  styleLabel?: TextStyle
  styleSmallLabel?: TextStyle
}

/**
 * Describe your component here
 */
export const SettingRowBool = observer(function SettingRowBool(props: SettingRowBoolProps) {
  const { style,labelText,labelTextSmall,styleLabel,styleSmallLabel } = props
  const styles = Object.assign({}, CONTAINER, style)
  const labelStyle = Object.assign({}, STYLE_PICKER_LABEL,styleLabel )
  const labelSmalStyle = Object.assign({}, STYLE_PICKER_LABEL_SMALL,styleSmallLabel )

  return (
    <View style={styles}>
      <View style={STYLE_INNER_VIEW1}>
        <Text style={labelStyle}>{labelText}</Text>
        <Text style={labelSmalStyle}>{labelTextSmall}</Text>
      </View>
      <View>
        <Switch />
      </View>
    </View>
  )
})
