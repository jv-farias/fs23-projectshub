import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from '.';


const meta: Meta<typeof MyButton> = {
  component: MyButton,
};

export default meta;
type Story = StoryObj<typeof MyButton>;

export const Primary: Story = {
  render: () => <MyButton />,
};

