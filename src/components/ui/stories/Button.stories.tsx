import { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button'

const meta = {
    title: 'Shadcn/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: [
                'default',
                'secondary',
                'destructive',
                'ghost',
                'link',
                'outline',
            ],
        },
    },
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

//color
export const Default: Story = {
    args: {
        variant: 'default',
        children: 'Button',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Button',
    },
}

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Button',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Button',
    },
}

export const Link: Story = {
    args: {
        variant: 'link',
        children: 'Button',
    },
}
export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Button',
    },
}
