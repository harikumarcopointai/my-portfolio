export interface YTCategory {
  key: string
  label: string
  glow: string
  accent?: string
  tags: string[]
  ids: string[]
  layout?: 'posters' | 'hero' | 'coverflow'
}

export const YT_CATEGORIES: YTCategory[] = [
  {
    key: 'hotels',
    label: 'Hotel Commercial Advertisements',
    glow: 'rgba(255,180,80,.5)',
    tags: ['Hospitality', 'Cinematic'],
    ids: [
      'l8D2tNfLm-I','rhA8M_oNRH4','gzUnRRZxVBg','UjXGCPwioJI','IrcACEg--2A','35kUCSy9tGs',
      'rjmtf-x-Wpo','3oEOuf2iw1Y','1c4y7e1pmZA','ep6pjAuTEpE','79H2qPEn5E0','8auWLhxkOLk',
    ],
  },
  {
    key: 'brand',
    label: 'Brand Stories',
    glow: 'rgba(120,140,255,.5)',
    tags: ['Brand', 'Storytelling'],
    ids: [
      'h8zC5tRPfh8','qIuBx84qD2c','Az-zkCNpsuE','72JKvDTsH20','UAeB_j-_7QU',
      '85QTOyrAlN0','l3nl_05MEhE','KWKrsPO8m5Y','VG7tsFua1jE','YbZI2HAwrR4',
    ],
  },
  {
    key: 'docu',
    label: 'Documentaries',
    glow: 'rgba(90,210,160,.5)',
    accent: '#5ad2a0',
    tags: ['Documentary', 'Real Life'],
    layout: 'posters',
    ids: ['tIJJQcMLtX8','K9yMiXsTdiY','9rfMff43j6o'],
  },
  {
    key: 'ibw',
    label: 'India Bike Week 2023 — The Movie',
    glow: 'rgba(255,90,40,.55)',
    tags: ['IBW 2023', 'Feature Film'],
    ids: ['fu8tr_z85IQ'],
  },
  {
    key: 'music',
    label: 'Music Videos',
    glow: 'rgba(220,80,200,.5)',
    tags: ['Music', 'Cinematic'],
    ids: [
      'tFSOEdTF4vU','qIrvTehjxr4','fVrFw5Vu5uw','R6hdqXM63w0','w41OHBgx9pU','QaAfDy34doI','s31W40ZvLAo',
      'cdxx_TBXAow','Agw0cRvvFbw','gcEeYHwJ27g','DXPYPqrTIqM','8yz0jKAaMAk','-ijLwIYBlUU','Fe8Rmdt6968',
    ],
  },
  {
    key: 'podcast',
    label: 'Podcast',
    glow: 'rgba(80,200,255,.5)',
    tags: ['Podcast', 'Long Form'],
    ids: ['3KGHJS6IgPc','DqlIQ4oo8ZA','ahdUXDnl8Gg'],
  },
  {
    key: 'series',
    label: 'Web Series',
    glow: 'rgba(255,140,40,.5)',
    tags: ['Web Series', 'Episodic'],
    ids: ['GDGvt_q_p2U','UxXXawCLzCA','eJeWInEst8M','2E8O83KEWwA','VAtxHoDh0Is','XjcI_-INd-4','6EGlZXt-hvE'],
  },
  {
    key: 'bts',
    label: 'Behind the Scenes — TOTM Awards Show',
    glow: 'rgba(255,80,80,.55)',
    tags: ['BTS', 'TOTM Awards'],
    ids: ['FAWCezOcx_Y'],
  },
]

export interface Tool {
  name: string
  cat: string
  logo: string
  glow: string
}

export const TOOLS: Tool[] = [
  { name: 'Premiere Pro', cat: 'Video Editing', logo: 'https://cdn.simpleicons.org/adobepremierepro', glow: 'rgba(154,153,255,.55)' },
  { name: 'After Effects', cat: 'Motion / VFX', logo: 'https://cdn.simpleicons.org/aftereffects', glow: 'rgba(154,153,255,.55)' },
  { name: 'Photoshop', cat: 'Design', logo: 'https://cdn.simpleicons.org/photoshop', glow: 'rgba(49,168,255,.55)' },
  { name: 'DaVinci Resolve', cat: 'Colour Grading', logo: 'https://cdn.simpleicons.org/davinciresolve', glow: 'rgba(255,140,40,.55)' },
  { name: 'HeyGen', cat: 'AI Video', logo: 'https://cdn.simpleicons.org/heygen', glow: 'rgba(120,140,255,.55)' },
  { name: 'Higgsfield AI', cat: 'Motion AI', logo: 'https://cdn.simpleicons.org/higgsfield', glow: 'rgba(255,122,0,.55)' },
  { name: 'Claude', cat: 'AI Workflows', logo: 'https://cdn.simpleicons.org/claude', glow: 'rgba(217,119,87,.55)' },
]

export const EXPERIENCE = [
  {
    date: 'Dec 2025\nPresent',
    company: 'CoPoint AI · Delhi',
    role: 'Creative Producer',
    points: [
      'Lead end-to-end creative production — podcasts, branded media, thought leadership videos',
      'Architect scalable content frameworks for YouTube, LinkedIn, and short-form platforms',
      'Integrated HeyGen, Higgsfield, Hedra, Claude — reducing turnaround time by 40%+',
      'Partner with founders to translate complex AI into accessible, engaging narratives',
    ],
  },
  {
    date: '2023\n2025',
    company: 'Acko Drive · Gurugram',
    role: 'Senior Video Editor',
    points: [
      'Spearheaded TOTM Awards Show (SonyLIV) — flagship broadcast reaching millions',
      'Applied advanced pacing, colour science, and sound design to maximise storytelling impact',
      'Collaborated with producers, directors, DPs across large-scale productions',
    ],
  },
  {
    date: '2022\n2023',
    company: 'Arav Studios · New Delhi',
    role: 'Senior Editor & Production Lead',
    points: [
      'Oversaw end-to-end production: pre-production, on-set direction, crew, delivery',
      'Developed distinctive visual identities through camera direction and lighting design',
    ],
  },
  {
    date: '2019\n2022',
    company: 'Saint MSG School · Sirsa',
    role: 'Motion Graphics Designer & Editor',
    points: [
      'Motion graphics and video content for institutional events and campaigns',
      'Real-time multi-camera edits for live events — zero revision cycles',
    ],
  },
  {
    date: '2018\n2019',
    company: 'Zerone Smart Infrastructure · Delhi',
    role: 'Motion Graphics Designer & Editor',
    points: [
      'Animations and video content for digital and social platforms',
      'Collaborated with design teams to translate briefs into high-quality visual outputs',
    ],
  },
]
