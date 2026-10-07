import { useEffect, useState } from 'react'

// undefined = still loading, null = no poster available (caller falls back to the embed)
type Poster = string | null | undefined

const vimeoPosters = new Map<string, Promise<string | null>>()

function fetchVimeoPoster(id: string): Promise<string | null> {
  let poster = vimeoPosters.get(id)
  if (!poster) {
    poster = fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}&width=1280`,
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => (data?.thumbnail_url as string | undefined) ?? null)
      .catch(() => null)
    vimeoPosters.set(id, poster)
  }
  return poster
}

/** Clean poster image for an embed URL, without the provider's player chrome. */
export function usePoster(embedUrl: string): Poster {
  const youtubeId = embedUrl.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]+)/)?.[1]
  const vimeoId = embedUrl.match(/player\.vimeo\.com\/video\/(\d+)/)?.[1]
  const [vimeoPoster, setVimeoPoster] = useState<Poster>(undefined)

  useEffect(() => {
    if (!vimeoId) return
    let cancelled = false
    fetchVimeoPoster(vimeoId).then((url) => {
      if (!cancelled) setVimeoPoster(url)
    })
    return () => {
      cancelled = true
    }
  }, [vimeoId])

  if (youtubeId) return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
  if (vimeoId) return vimeoPoster
  return null
}
