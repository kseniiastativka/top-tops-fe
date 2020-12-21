// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from './Button';
import Home from "../pages";

export default {
  title: 'Pages/Home',
  component: Home,
} as Meta;

const Template: Story<void> = () => <Home />;

export const Primary = Template.bind({});
