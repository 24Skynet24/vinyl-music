import { protocol, net } from "electron"
import { createReadStream, statSync } from "node:fs"
import path from "node:path"
import { Readable } from "node:stream"
import { pathToFileURL } from "node:url"
import { getLibraryPaths } from "./paths"

export const MEDIA_PROTOCOL = "vinyl-media"

export const registerMediaProtocolPrivileges = () => {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: MEDIA_PROTOCOL,
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
        stream: true,
      },
    },
  ])
}

export const createMediaUrl = (type: "audio" | "covers", fileName: string) =>
  `${MEDIA_PROTOCOL}://${type}/${encodeURIComponent(fileName)}`

export const resolveMediaFilePath = (mediaUrl: string) => {
  const url = new URL(mediaUrl)
  const { audioDir, coversDir } = getLibraryPaths()
  const mediaDir = url.hostname === "audio" ? audioDir : coversDir
  const fileName = path.basename(decodeURIComponent(url.pathname))

  return path.join(mediaDir, fileName)
}

const getContentType = (filePath: string) => {
  switch (path.extname(filePath).toLowerCase()) {
    case ".mp3":
      return "audio/mpeg"
    case ".wav":
      return "audio/wav"
    case ".ogg":
      return "audio/ogg"
    case ".flac":
      return "audio/flac"
    case ".m4a":
    case ".aac":
      return "audio/aac"
    case ".png":
      return "image/png"
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".webp":
      return "image/webp"
    default:
      return "application/octet-stream"
  }
}

const streamFile = (filePath: string, request: Request) => {
  const stat = statSync(filePath)
  const contentType = getContentType(filePath)
  const range = request.headers.get("range")

  if (!range) {
    return new Response(Readable.toWeb(createReadStream(filePath)) as BodyInit, {
      status: 200,
      headers: {
        "Accept-Ranges": "bytes",
        "Content-Length": String(stat.size),
        "Content-Type": contentType,
      },
    })
  }

  const match = /bytes=(\d+)-(\d*)/.exec(range)
  if (!match) {
    return new Response(null, {
      status: 416,
      headers: {
        "Content-Range": `bytes */${stat.size}`,
      },
    })
  }

  const start = Number(match[1])
  const requestedEnd = match[2] ? Number(match[2]) : stat.size - 1
  const end = Math.min(requestedEnd, stat.size - 1)

  if (start >= stat.size || end < start) {
    return new Response(null, {
      status: 416,
      headers: {
        "Content-Range": `bytes */${stat.size}`,
      },
    })
  }

  return new Response(Readable.toWeb(createReadStream(filePath, { start, end })) as BodyInit, {
    status: 206,
    headers: {
      "Accept-Ranges": "bytes",
      "Content-Length": String(end - start + 1),
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Content-Type": contentType,
    },
  })
}

export const registerMediaProtocol = () => {
  protocol.handle(MEDIA_PROTOCOL, (request) => {
    const url = new URL(request.url)
    const filePath = resolveMediaFilePath(request.url)

    if (url.hostname === "audio") {
      return streamFile(filePath, request)
    }

    return net.fetch(pathToFileURL(filePath).toString())
  })
}
