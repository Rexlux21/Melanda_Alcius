import { useSyncExternalStore } from 'react'
import { SERVICES } from './content'

const PREFIX = 'melanda_v2_'
export const DEFAULT_PASSCODE = 'melanda2026'

export const DEFAULTS = {
  services: SERVICES,
  repairs: [
    { item: 'Hem — pants or jeans', price: 18, note: 'Original hem kept +$8' },
    { item: 'Hem — skirt or dress', price: 25, note: 'Lined garments +$10' },
    { item: 'Take in / let out waist', price: 30, note: '' },
    { item: 'Take in sides or seams', price: 35, note: 'Shirts, dresses, jackets' },
    { item: 'Replace zipper', price: 28, note: 'Jackets and coats from $45' },
    { item: 'Shorten sleeves — shirt', price: 30, note: '' },
    { item: 'Shorten sleeves — jacket or coat', price: 55, note: 'Working cuffs from $75' },
    { item: 'Patch or mend a tear', price: 15, note: 'Priced after inspection' },
    { item: 'Replace button', price: 5, note: 'Each' },
    { item: 'Bridal & formal alterations', price: 120, note: 'Starting at — quoted per gown' },
  ],
  portfolio: [
    { id: 'p1', title: 'Graduate Collection', category: 'Runway', desc: 'Mauve velvet gown with a flowing rose silk wrap — the closing look of the 2026 graduate show.', image: 'hero', tone: 0 },
    { id: 'p2', title: 'The Evening Column', category: 'Custom', desc: 'A floor-length bias-cut column built for movement.', image: '', tone: 1 },
    { id: 'p3', title: 'Atelier Tailoring', category: 'Custom', desc: 'Structured jacket, hand-finished lining.', image: '', tone: 2 },
    { id: 'p4', title: 'Veil & Silk', category: 'Bridal', desc: 'Bridal study in ivory silk crepe.', image: '', tone: 3 },
    { id: 'p5', title: 'Golden Hour Editorial', category: 'Editorial', desc: 'Styled for a spring editorial shoot.', image: '', tone: 4 },
    { id: 'p6', title: 'Rose Study No. 3', category: 'Runway', desc: 'Draped rose satin from the thesis collection.', image: '', tone: 0 },
  ],
  messages: [],
  settings: {
    email: 'melanda@yourdomain.com',
    phone: '',
    location: 'By appointment',
    hours: 'Mon–Sat, 10am–6pm',
    instagram: '',
    pinterest: '',
    tiktok: '',
    formEndpoint: '',
    passHash: '',
    bio: 'Melanda Alcius is a fashion designer who just graduated with a degree in fashion design, and is now taking on private clients.\n\nShe works across custom garments, tailoring and repair, personal styling and brand consulting. Every project starts the same way: understanding how you actually want to move through your life, then building toward that.\n\nHer approach is simple — clothes should fit the body they live on, hold up to real wear, and feel like you the moment you put them on.',
  },
}

const cache = {}
const listeners = new Set()
const notify = () => listeners.forEach((l) => l())

function read(key) {
  if (key in cache) return cache[key]
  let v = DEFAULTS[key]
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw !== null) v = JSON.parse(raw)
  } catch { /* storage blocked or corrupt — use defaults */ }
  if (key === 'settings') v = { ...DEFAULTS.settings, ...v }
  cache[key] = v
  return v
}

/** Returns false if the browser refused the write (e.g. storage full). */
export function write(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    return false
  }
  cache[key] = value
  notify()
  return true
}

export function resetAll() {
  Object.keys(DEFAULTS).forEach((k) => {
    try { localStorage.removeItem(PREFIX + k) } catch { /* ignore */ }
    delete cache[k]
  })
  notify()
}

export function exportAll() {
  return Object.fromEntries(Object.keys(DEFAULTS).map((k) => [k, read(k)]))
}

export function importAll(obj) {
  Object.keys(DEFAULTS).forEach((k) => {
    if (obj[k] !== undefined && typeof obj[k] === typeof DEFAULTS[k]) write(k, obj[k])
  })
}

function subscribe(cb) {
  listeners.add(cb)
  const onStorage = (e) => {
    if (e.key && e.key.startsWith(PREFIX)) {
      delete cache[e.key.slice(PREFIX.length)]
      cb()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}

export function useData(key) {
  return useSyncExternalStore(subscribe, () => read(key), () => DEFAULTS[key])
}

export async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function checkPasscode(input) {
  const { passHash } = read('settings')
  if (!passHash) return input === DEFAULT_PASSCODE
  return (await sha256(input)) === passHash
}

/** Resize an uploaded image to keep localStorage usage small. */
export function fileToDataUrl(file, max = 1000) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      const c = document.createElement('canvas')
      c.width = Math.round(img.width * scale)
      c.height = Math.round(img.height * scale)
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
      URL.revokeObjectURL(url)
      resolve(c.toDataURL('image/jpeg', 0.82))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image')) }
    img.src = url
  })
}
