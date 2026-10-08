export const SERVICES = [
  {
    name: 'Custom Garment Design',
    desc: 'A one-of-one piece built from your first sketch to final fitting — occasion wear, bridal, or a signature staple for your closet.',
    tags: ['1-on-1', '3–6 weeks', 'In-person or remote'],
    price: 450,
    unit: 'starting at',
  },
  {
    name: 'Personal Style Consultation',
    desc: 'A 90-minute session working through your wardrobe, proportions, and the silhouettes that actually work for your life.',
    tags: ['90 min', 'Remote or studio'],
    price: 85,
    unit: 'per session',
  },
  {
    name: 'Alterations & Tailoring',
    desc: 'Precision fitting for existing garments — hems, resizing, structural repairs, and shape corrections.',
    tags: ['48–72hr turnaround'],
    price: 35,
    unit: 'starting at',
  },
  {
    name: 'Capsule Wardrobe Build',
    desc: 'A curated, mix-and-match wardrobe plan built around pieces you already own plus a short list of additions.',
    tags: ['2 sessions', 'Includes shopping guide'],
    price: 220,
    unit: 'flat rate',
  },
  {
    name: 'Runway & Editorial Styling',
    desc: 'Full look development for shows, shoots, and campaigns — concept, sourcing, fittings, and on-set support.',
    tags: ['Day rate', 'Team available'],
    price: 600,
    unit: 'per day',
  },
  {
    name: 'Brand & Collection Consulting',
    desc: 'For small fashion labels and boutiques — line development, sourcing strategy, and production guidance.',
    tags: ['Ongoing or project-based'],
    price: 150,
    unit: 'per hour',
  },
]

export const QUOTES = [
  { quote: 'Fashion fades, only style remains the same.', author: 'Coco Chanel', place: 'Paris', flag: '🇫🇷' },
  { quote: 'Style is a way to say who you are without having to speak.', author: 'Rachel Zoe', place: 'New York', flag: '🇺🇸' },
  { quote: 'Elegance is not standing out, but being remembered.', author: 'Giorgio Armani', place: 'Milan', flag: '🇮🇹' },
  { quote: 'Clothes mean nothing until someone lives in them.', author: 'Marc Jacobs', place: 'New York', flag: '🇺🇸' },
  { quote: 'I don’t design clothes. I design dreams.', author: 'Ralph Lauren', place: 'New York', flag: '🇺🇸' },
  { quote: 'Simplicity is the keynote of all true elegance.', author: 'Coco Chanel', place: 'Paris', flag: '🇫🇷' },
  { quote: 'Fashion is architecture: it is a matter of proportions.', author: 'Coco Chanel', place: 'Paris', flag: '🇫🇷' },
  { quote: 'The joy of dressing is an art.', author: 'John Galliano', place: 'London', flag: '🇬🇧' },
  { quote: 'What you wear is how you present yourself to the world.', author: 'Miuccia Prada', place: 'Milan', flag: '🇮🇹' },
  { quote: 'Buy less, choose well, make it last.', author: 'Vivienne Westwood', place: 'London', flag: '🇬🇧' },
  { quote: 'Creativity comes from a conflict of ideas.', author: 'Donatella Versace', place: 'Milan', flag: '🇮🇹' },
  { quote: 'Style is knowing who you are, what you want to say, and not giving a damn.', author: 'Orson Welles (on Gore Vidal)', place: 'Hollywood', flag: '🇺🇸' },
  { quote: 'Craft is what allows imagination to take physical form.', author: 'Alexander McQueen', place: 'London', flag: '🇬🇧' },
  { quote: 'Dressing well is a form of good manners.', author: 'Tom Ford', place: 'Los Angeles', flag: '🇺🇸' },
  { quote: 'The dress must follow the body of a woman, not the body following the shape of the dress.', author: 'Hubert de Givenchy', place: 'Paris', flag: '🇫🇷' },
  { quote: 'Colour and pattern move a room; the same is true of the body.', author: 'Ozwald Boateng', place: 'London', flag: '🇬🇧' },
]

export const formatPrice = (n) => '$' + Number(n).toLocaleString('en-US')
