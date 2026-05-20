// src/components/Select/select.tsx
import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ArrowDownIcon } from '../../icons/lib/arrow-down-icon'

interface SelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
  leftIcon?: React.ReactNode
  placeholder?: string
  isObrigatorie?: boolean
}

export function Select({
  label,
  value,
  onChange,
  children,
  leftIcon,
  placeholder = 'Selecione...',
  isObrigatorie = false,
}: SelectProps) {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          {leftIcon}
        </div>
      )}

      <SelectPrimitive.Root value={value} onValueChange={onChange}>
        <SelectPrimitive.Trigger
          className={`
            w-full
            border border-[var(--color-gray-light)]
            bg-[var(--color-bg)]
            text-[var(--color-text)]
            rounded-lg
            text-base font-medium
            outline-none
            transition-all duration-200
            flex items-center justify-between

            ${leftIcon ? 'pl-10' : 'pl-4'}
            pr-5 py-3

            focus:border-[var(--color-primary)]
            focus:ring-2 focus:ring-[var(--color-primary)]/20
          `}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="pointer-events-none mt-2.5 text-[var(--color-text-muted)]">
            <ArrowDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="
              bg-[var(--color-bg)]
              border border-[var(--color-gray-light)]
              rounded-lg
              shadow-lg
              z-[60]
              w-[var(--radix-select-trigger-width)]
          "
            position="popper"
            sideOffset={8}
          >
            <SelectPrimitive.Viewport className="p-2 max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-[var(--color-primary)] scrollbar-track-transparent">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      <label
        className="
          absolute left-3 -top-2
          bg-[var(--color-bg)]
          px-1
          text-xs
          text-[var(--color-primary)]
          pointer-events-none
          z-10
        "
      >
        {label}
        {isObrigatorie && <span className="text-red-600 ml-1">*</span>}
      </label>
    </div>
  )
}
