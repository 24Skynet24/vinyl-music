import { ButtonHTMLAttributes } from 'react'
import { PanelView } from '../../../features/Navigation/model/views'

export interface DefaultButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
}

export interface PlayButtonProps extends DefaultButtonType {
  isPlaying: boolean
}

export interface NextPrevButtonProps extends DefaultButtonType {
  isPrev?: boolean
}

export interface RepeatButtonProps extends DefaultButtonType {
  isRepeat: boolean
  isRepeatOne: boolean
}

export interface RandomButtonProps extends DefaultButtonType {
  isRandom: boolean
}

export interface NavSidebarButtonPros extends DefaultButtonType {
  isPlaying?: boolean
  view?: PanelView
  title?: string
}

export interface TextButtonProps extends DefaultButtonType {
  text: string
  minWidth?: number
}