import Tag from './Tag'

export default interface BeatForAuthor {
  id: number
  name: string
  bpm: number | null
  tags: Tag[]
  image: string
  mp3: string
  wavePrice: number
}
