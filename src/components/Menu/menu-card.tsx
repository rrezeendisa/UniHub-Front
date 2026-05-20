import { useLocation } from 'react-router-dom'
import { type ReactNode } from 'react'
import { MenuItem } from './menu-item'
import { DeskIcon } from '../../icons/lib/desk-icon'
import { ScheduleIcon } from '../../icons/lib/schedule-icon'
import { ClipboardIcon } from '../../icons/lib/clipboard-icon'

interface MenuItemConfig {
  label: string
  href: string
  icon: ReactNode
}

const menuItems: MenuItemConfig[] = [
  {
    label: 'Agendar mesa de estudo',
    href: '/agendar-mesa',
    icon: <DeskIcon />,
  },
  {
    label: 'Agendar sala de aula',
    href: '/agendar-sala',
    icon: <ScheduleIcon />,
  },
  {
    label: 'Meus agendamentos',
    href: '/meus-agendamentos',
    icon: <ClipboardIcon />,
  },
]

interface MenuCardProps {
  className?: string
}

export function MenuCard({ className = '' }: MenuCardProps) {
  const location = useLocation()

  const isPathActive = (href: string): boolean => {
    return location.pathname === href
  }

  return (
    <div className={['w-full max-w-full rounded-[10px] border border-[var(--color-gray-light)] bg-[var(--color-bg)] px-4 py-5 shadow-sm sm:px-5 sm:py-6 lg:w-72 lg:min-w-[18rem]', className].join(' ')}>
      <div className="mb-6 flex items-center justify-center border-b border-[var(--color-gray-light)] pb-4">
        <span className="text-2xl font-bold text-[var(--color-primary)]">UniHub</span>
      </div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={isPathActive(item.href)}
          />
        ))}
      </nav>
    </div>
  )
}
