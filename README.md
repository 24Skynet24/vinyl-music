# Vinyl Music

Vinyl Music is a desktop music player built with Electron, React, TypeScript, and Vite. It is designed as a local-first app for importing audio files, organizing them into playlists, and listening with a vinyl-inspired interface.

## Features

- Import local audio files into the app library.
- Read and restore track metadata such as title, artist, album, year, genre, duration, bitrate, and track number.
- Create, edit, and delete playlists.
- Add and remove tracks from playlists.
- Search music by title, year, album, or artist.
- Sort music by title, artist, album, or duration.
- Control playback with play, pause, next, previous, repeat, repeat-one, and random modes.
- Remember playback state between app launches, including volume, selected track, current time, active playlist, queue, and random history.
- Store the music library locally on the user's machine.

## Tech Stack

- Electron
- React
- TypeScript
- Vite
- Zustand
- Tailwind CSS
- music-metadata

## Download
- [Windows](https://github.com/24Skynet24/vinyl-music/releases)

## Local Storage

Vinyl Music does not use a shared cloud backend. Imported tracks, covers, playlists, and library data are stored locally in Electron's `userData` directory for the current OS user.

This means each computer and user profile has its own independent music library.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```
