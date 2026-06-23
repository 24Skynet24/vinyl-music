import type { DragEvent } from "react"

export interface SelectAddMusicProps {
    onSelect: () => void
    onDrop?: (event: DragEvent<HTMLElement>) => void
    onDragOver?: (event: DragEvent<HTMLElement>) => void
}
