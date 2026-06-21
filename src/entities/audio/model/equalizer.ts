export const EQUALIZER_GAIN_MIN = -12
export const EQUALIZER_GAIN_MAX = 12

export const equalizerBands = [
  { id: "60", label: "60", frequency: 60 },
  { id: "170", label: "170", frequency: 170 },
  { id: "310", label: "310", frequency: 310 },
  { id: "600", label: "600", frequency: 600 },
  { id: "1k", label: "1K", frequency: 1000 },
  { id: "3k", label: "3K", frequency: 3000 },
  { id: "6k", label: "6K", frequency: 6000 },
  { id: "12k", label: "12K", frequency: 12000 },
] as const

export type EqualizerBandId = typeof equalizerBands[number]["id"]
export type BuiltInEqualizerPresetId = "flat" | "bassBoost" | "rock" | "pop" | "vocal" | "electronic"
export type EqualizerPresetId = string
export type EqualizerBandValues = Record<EqualizerBandId, number>

export interface EqualizerPreset {
  id: string
  label: string
  values: EqualizerBandValues
  isCustom?: boolean
}

export const createFlatEqualizerValues = (): EqualizerBandValues => ({
  "60": 0,
  "170": 0,
  "310": 0,
  "600": 0,
  "1k": 0,
  "3k": 0,
  "6k": 0,
  "12k": 0,
})

export const equalizerPresets: EqualizerPreset[] = [
  {
    id: "flat",
    label: "Flat",
    values: createFlatEqualizerValues(),
  },
  {
    id: "bassBoost",
    label: "Bass Boost",
    values: {
      "60": 8,
      "170": 6,
      "310": 3,
      "600": 0,
      "1k": -1,
      "3k": -2,
      "6k": 0,
      "12k": 2,
    },
  },
  {
    id: "rock",
    label: "Rock",
    values: {
      "60": 5,
      "170": 4,
      "310": -2,
      "600": -3,
      "1k": 1,
      "3k": 4,
      "6k": 5,
      "12k": 3,
    },
  },
  {
    id: "pop",
    label: "Pop",
    values: {
      "60": 3,
      "170": 2,
      "310": 0,
      "600": 1,
      "1k": 3,
      "3k": 4,
      "6k": 3,
      "12k": 2,
    },
  },
  {
    id: "vocal",
    label: "Vocal",
    values: {
      "60": -3,
      "170": -2,
      "310": 0,
      "600": 3,
      "1k": 5,
      "3k": 4,
      "6k": 2,
      "12k": 0,
    },
  },
  {
    id: "electronic",
    label: "Electronic",
    values: {
      "60": 6,
      "170": 4,
      "310": 0,
      "600": -2,
      "1k": 1,
      "3k": 3,
      "6k": 5,
      "12k": 6,
    },
  },
]

export const getEqualizerPreset = (presetId: EqualizerPresetId) =>
  equalizerPresets.find((preset) => preset.id === presetId) ?? equalizerPresets[0]

const createCustomEqualizerPresetId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? `custom-${crypto.randomUUID()}`
    : `custom-${Date.now()}-${Math.random().toString(36).slice(2)}`

export const createCustomEqualizerPreset = (
  label: string,
  values: EqualizerBandValues
): EqualizerPreset => ({
  id: createCustomEqualizerPresetId(),
  label,
  values: { ...values },
  isCustom: true,
})
