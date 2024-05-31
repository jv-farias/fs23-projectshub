import type { Meta, StoryObj } from '@storybook/react';
import { Logo, Twitter, GitHub, Radix, Npm, Yarn, React, Tailwind, Spinner } from './Icons';

const meta: Meta<typeof Logo> = {
  title: 'Components/Icons', 
  component: Logo,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'color' },
    style: { control: 'object' },
  },
  tags: ['autodocs'],

};

export default meta;
type Story = StoryObj<typeof meta>;

//@ts-ignore
const Template: Story<{ IconComponent: React.ComponentType, style?: React.CSSProperties, color?: string, size?: 'small' | 'medium' | 'large', width?: string, height?: string }> = ({ IconComponent, ...args }: { IconComponent: React.ComponentType, style?: React.CSSProperties, color?: string, size?: 'small' | 'medium' | 'large', width?: string, height?: string }) => (
  <div style={{ ...args.style, color: args.color, width: getSize(args.size, args.width), height: getSize(args.size, args.height) }}>
    <IconComponent />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  IconComponent: Logo,
  size: 'medium',
  color: 'black',
};

export const TwitterIcon = Template.bind({});
TwitterIcon.args = {
  IconComponent: Twitter,
  size: 'medium',
  color: 'black',
};

export const GitHubIcon = Template.bind({});
GitHubIcon.args = {
  IconComponent: GitHub,
  size: 'medium',
  color: 'black',
};

export const RadixIcon = Template.bind({});
RadixIcon.args = {
  IconComponent: Radix,
  size: 'medium',
  color: 'black',
};

export const NpmIcon = Template.bind({});
NpmIcon.args = {
  IconComponent: Npm,
  size: 'medium',
  color: 'black',
};

export const YarnIcon = Template.bind({});
YarnIcon.args = {
  IconComponent: Yarn,
  size: 'medium',
  color: 'black',
};

export const ReactIcon = Template.bind({});
ReactIcon.args = {
  IconComponent: React,
  size: 'medium',
  color: 'black',
};

export const TailwindIcon = Template.bind({});
TailwindIcon.args = {
  IconComponent: Tailwind,
  size: 'medium',
  color: 'black',
};

export const SpinnerIcon = Template.bind({});
SpinnerIcon.args = {
  IconComponent: Spinner,
  size: 'medium',
  color: 'black',
};

function getSize(size: 'small' | 'medium' | 'large' | undefined, defaultSize: string | undefined): string | undefined {
  if (size === 'small') {
    return '16px';
  } else if (size === 'medium') {
    return '24px';
  } else if (size === 'large') {
    return '32px';
  } else {
    return defaultSize; 
  }
}