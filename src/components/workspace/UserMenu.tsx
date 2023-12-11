'use client';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar,
} from '@nextui-org/react';
import { AiFillApi } from 'react-icons/ai';
import { useAuth } from '@/app/providers';
import { useTheme } from 'next-themes';

export default function UserMenu() {
  const { profile, signOut } = useAuth();
  const theme = useTheme();
  return (
    <Dropdown
      radius='sm'
      classNames={{
        base: 'before:bg-default-200',
        content: 'p-0 border-small border-divider bg-background',
      }}
    >
      <DropdownTrigger>
        <Avatar src={profile?.avatar_url} size='sm' />
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
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        }}
      >
        <DropdownSection aria-label='Profile & Actions'>
          <DropdownItem key='userName' showDivider>
            <p>{profile?.name}</p>
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
                value={theme.theme}
                onChange={(e) => theme.setTheme(e.target.value)}
              >
                {theme.themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label='Help & Feedback'>
          <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
          <DropdownItem
            key='logout'
            onClick={() => signOut()}
            className='text-danger'
            color='danger'
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
