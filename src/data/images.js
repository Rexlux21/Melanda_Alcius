import heroImg from '../assets/hero.jpg'

export const imageSrc = (item) => (item.image === 'hero' ? heroImg : item.image)
