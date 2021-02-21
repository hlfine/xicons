import { useEffect, useMemo, createElement, useContext } from 'react'
import { mountStyle } from './style'
import type { IconConfigProviderContext } from './interface'
import { iconConfigProviderContext } from './IconConfigProvider'
import { defaultTag } from './config'

interface IconProps extends IconConfigProviderContext {
  children?: React.ReactNode
}

export function Icon ({ size, color, tag = 'span', children }: IconProps) {
  const iconConfig = useContext(iconConfigProviderContext)
  const mergedSize = useMemo(() => {
    const _size = size ?? iconConfig?.size
    if (_size === undefined) return undefined
    if (typeof _size === 'number' || /^\d+$/.test(_size)) return `${_size}px`
    return _size
  }, [size, iconConfig?.size])
  const mergedColor = color ?? iconConfig?.color
  const mergedTag = tag ?? iconConfig?.tag ?? defaultTag
  useEffect(() => {
    mountStyle()
  }, [])
  return (
    createElement(mergedTag, {
      className: "xicon",
      style: {
        color: mergedColor,
        fontSize: mergedSize
      }
    }, children)
  )
}
