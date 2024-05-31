import { SessionProvider } from "next-auth/react"
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from "./Header"

export type Story = StoryObj<typeof Header>

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [(Story) => <SessionProvider session={undefined}><Story/></SessionProvider>]
} satisfies Meta<typeof Header>

export default meta;

export const Default: Story = {}