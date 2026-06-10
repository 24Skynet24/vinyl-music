export interface PlayerDiskType {
    isPlaying: boolean;
}

export interface PlayerInfoTextType {
    musicName: string;
    authorName?: string;
    albumName?: string;
    year?: string | number;
}

export interface PlayerTimeLineType {
    duration: number
    isPlaying: boolean
}