import { app } from "electron"
import path from "node:path"

export const getLibraryPaths = () => {
  const root = path.join(app.getPath("userData"), "library")
  const media = path.join(root, "media")

  return {
    root,
    libraryFile: path.join(root, "library.json"),
    audioDir: path.join(media, "audio"),
    coversDir: path.join(media, "covers"),
  }
}
