'use client';
import { Profiles } from '@/lib/schema';
import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  User,
} from '@nextui-org/react';
import { AiFillApi } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function UserMenu({ profile }: { profile: Profiles }) {
  return (
    <Dropdown
      showArrow
      radius='sm'
      classNames={{
        base: 'before:bg-default-200', // change arrow background
        content: 'p-0 border-small border-divider bg-background',
      }}
    >
      <DropdownTrigger>
        <Button size='sm'>
          <RxHamburgerMenu />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Custom item styles'
        disabledKeys={['profile']}
        className='p-3'
        itemClasses={{
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        }}
      >
        <DropdownSection aria-label='Profile & Actions'>
          <DropdownItem key='profile' className='h-14 gap-2'>
            <User
              name={profile.name}
              classNames={{
                name: 'text-default-600',
                description: 'text-default-500',
              }}
              avatarProps={{
                size: 'sm',
                src: profile.avatar_url,
              }}
            />
          </DropdownItem>
          <DropdownItem key='dashboard'>Dashboard</DropdownItem>
          <DropdownItem key='settings'>Settings</DropdownItem>
          <DropdownItem
            key='new_project'
            endContent={<AiFillApi className='text-large' />}
          >
            New Project
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label='Preferences' showDivider>
          <DropdownItem key='quick_search' shortcut='⌘K'>
            Quick search
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key='theme'
            className='cursor-default'
            endContent={
              <select
                className='z-10 w-16 rounded-md border-small border-default-300 bg-transparent py-0.5 text-tiny text-default-500 outline-none group-data-[hover=true]:border-default-500 dark:border-default-200'
                id='theme'
                name='theme'
              >
                <option>System</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label='Help & Feedback'>
          <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
          <DropdownItem key='logout'>Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
