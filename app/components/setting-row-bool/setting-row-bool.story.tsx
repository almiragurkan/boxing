import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { SettingRowBool } from "./setting-row-bool"

storiesOf("SettingRowBool", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SettingRowBool style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
