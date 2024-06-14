import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

export type Story = StoryObj<typeof Footer>;

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
};

export default meta;

export const Default: Story = {};