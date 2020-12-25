import { Story, Meta } from "@storybook/react/types-6-0"
import type { User } from "../components/UserProvider"
import Home from "../pages"
import { createRootComponent } from "./createRootComponent"

const HomePage = createRootComponent(Home)

export default {
  title: "Pages/Home",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
} as Meta

const Template: Story<{ user: User }> = (args) => <HomePage {...args} />

export const LoggedOut = Template.bind({})

LoggedOut.parameters = {
  percy: { skip: false },
}

export const LoggedIn = Template.bind({})

LoggedIn.args = {
  user: { name: "StorybookUser", id: "1", token: "token" },
}

LoggedIn.parameters = {
  percy: { skip: false },
}
