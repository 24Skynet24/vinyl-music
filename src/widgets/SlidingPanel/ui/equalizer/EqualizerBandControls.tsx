import {
    EQUALIZER_GAIN_MAX,
    EQUALIZER_GAIN_MIN,
    EqualizerBandId,
    EqualizerBandValues,
    equalizerBands,
} from "../../../../entities/audio"
import { useTranslation } from "react-i18next"

interface EqualizerBandControlsProps {
    values: EqualizerBandValues
    onChange: (bandId: EqualizerBandId, gain: number) => void
}

function EqualizerBandControls({ values, onChange }: EqualizerBandControlsProps) {
    const { t } = useTranslation()

    return (
        <section className="rounded-[16px] bg-black-main/40 px-[28px] py-[32px]">
            <div className="mb-[24px] flex items-center justify-between text-[16px] uppercase text-white-main/60">
                <span>{EQUALIZER_GAIN_MAX} dB</span>
                <span>{t("equalizer.gain")}</span>
                <span>{EQUALIZER_GAIN_MIN} dB</span>
            </div>

            <div className="flex h-[360px] items-end justify-between gap-[16px]">
                {equalizerBands.map((band) => (
                    <div key={band.id} className="flex h-full flex-col items-center justify-between gap-[16px]">
                        <span className="min-h-[28px] text-[18px] text-orange-main">
                            {values[band.id] > 0 ? "+" : ""}
                            {values[band.id]}
                        </span>

                        <input
                            type="range"
                            min={EQUALIZER_GAIN_MIN}
                            max={EQUALIZER_GAIN_MAX}
                            step={1}
                            value={values[band.id]}
                            onChange={(event) => onChange(band.id, Number(event.target.value))}
                            className="h-[220px] w-[28px] cursor-pointer accent-orange-main"
                            style={{
                                writingMode: "vertical-lr",
                                direction: "rtl",
                            }}
                        />

                        <span className="text-[18px] uppercase text-white-main">
                            {band.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default EqualizerBandControls
