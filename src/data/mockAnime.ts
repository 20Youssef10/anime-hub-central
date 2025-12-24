import { Anime } from '@/types/anime';

export const mockAnime: Anime[] = [
  {
    id: 1,
    title: "Jujutsu Kaisen",
    titleEnglish: "Jujutsu Kaisen",
    titleJapanese: "呪術廻戦",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1920&h=600&fit=crop",
    synopsis: "Yuji Itadori is an unnaturally fit high school student living in Sendai. When he joins the Occult Research Club at school, little does he know what horrific fate awaits him. A cursed object brings about a string of supernatural incidents that will change his life forever.",
    episodes: 24,
    status: 'FINISHED',
    season: 'FALL',
    seasonYear: 2023,
    score: 8.9,
    popularity: 1,
    genres: ['Action', 'Fantasy', 'Supernatural'],
    studios: ['MAPPA'],
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' },
      { platform: 'netflix', url: 'https://netflix.com' }
    ]
  },
  {
    id: 2,
    title: "Demon Slayer: Kimetsu no Yaiba",
    titleEnglish: "Demon Slayer",
    titleJapanese: "鬼滅の刃",
    coverImage: "https://images.unsplash.com/photo-1607604276583-c4f3d4deee5c?w=400&h=600&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=600&fit=crop",
    synopsis: "Tanjiro Kamado is a kindhearted boy who lives with his family and makes a living selling charcoal. His life is shattered when a demon slaughters his entire family, leaving only his sister Nezuko alive but transformed into a demon herself.",
    episodes: 26,
    status: 'RELEASING',
    season: 'SPRING',
    seasonYear: 2024,
    score: 8.7,
    popularity: 2,
    genres: ['Action', 'Fantasy', 'Adventure'],
    studios: ['ufotable'],
    nextAiringEpisode: { episode: 12, airingAt: Date.now() + 86400000 },
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' },
      { platform: 'netflix', url: 'https://netflix.com' }
    ]
  },
  {
    id: 3,
    title: "Attack on Titan",
    titleEnglish: "Attack on Titan",
    titleJapanese: "進撃の巨人",
    coverImage: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&h=600&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=600&fit=crop",
    synopsis: "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid beings who devour humans seemingly without reason. When the walls are breached, Eren Yeager vows to exterminate every Titan.",
    episodes: 87,
    status: 'FINISHED',
    season: 'WINTER',
    seasonYear: 2024,
    score: 9.1,
    popularity: 3,
    genres: ['Action', 'Drama', 'Fantasy'],
    studios: ['MAPPA', 'Wit Studio'],
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' }
    ]
  },
  {
    id: 4,
    title: "Spy x Family",
    titleEnglish: "Spy x Family",
    titleJapanese: "スパイファミリー",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1920&h=600&fit=crop",
    synopsis: "A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and child have secrets of their own, and together they must navigate their fake family life while hiding their true identities.",
    episodes: 25,
    status: 'RELEASING',
    season: 'FALL',
    seasonYear: 2024,
    score: 8.6,
    popularity: 4,
    genres: ['Action', 'Comedy', 'Slice of Life'],
    studios: ['Wit Studio', 'CloverWorks'],
    nextAiringEpisode: { episode: 8, airingAt: Date.now() + 172800000 },
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' },
      { platform: 'netflix', url: 'https://netflix.com' }
    ]
  },
  {
    id: 5,
    title: "Chainsaw Man",
    titleEnglish: "Chainsaw Man",
    titleJapanese: "チェンソーマン",
    coverImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=600&fit=crop",
    synopsis: "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses.",
    episodes: 12,
    status: 'FINISHED',
    season: 'FALL',
    seasonYear: 2023,
    score: 8.5,
    popularity: 5,
    genres: ['Action', 'Horror', 'Supernatural'],
    studios: ['MAPPA'],
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' }
    ]
  },
  {
    id: 6,
    title: "My Hero Academia",
    titleEnglish: "My Hero Academia",
    titleJapanese: "僕のヒーローアカデミア",
    coverImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1920&h=600&fit=crop",
    synopsis: "In a world where most of the population has superpowers, Izuku Midoriya dreams of becoming a hero despite being born without a Quirk. His life changes when he meets the greatest hero of all, All Might.",
    episodes: 138,
    status: 'RELEASING',
    season: 'SPRING',
    seasonYear: 2024,
    score: 8.4,
    popularity: 6,
    genres: ['Action', 'Comedy', 'Supernatural'],
    studios: ['Bones'],
    nextAiringEpisode: { episode: 5, airingAt: Date.now() + 259200000 },
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' },
      { platform: 'netflix', url: 'https://netflix.com' },
      { platform: 'hulu', url: 'https://hulu.com' }
    ]
  },
  {
    id: 7,
    title: "One Piece",
    titleEnglish: "One Piece",
    titleJapanese: "ワンピース",
    coverImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop",
    synopsis: "Monkey D. Luffy sets off on an adventure with his crew of pirates, named the Straw Hat Pirates, to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named 'One Piece'.",
    episodes: 1100,
    status: 'RELEASING',
    season: 'SUMMER',
    seasonYear: 2024,
    score: 8.9,
    popularity: 7,
    genres: ['Action', 'Adventure', 'Comedy'],
    studios: ['Toei Animation'],
    nextAiringEpisode: { episode: 1101, airingAt: Date.now() + 345600000 },
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' },
      { platform: 'netflix', url: 'https://netflix.com' }
    ]
  },
  {
    id: 8,
    title: "Frieren: Beyond Journey's End",
    titleEnglish: "Frieren",
    titleJapanese: "葬送のフリーレン",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=600&fit=crop",
    synopsis: "After the party of heroes defeated the Demon King, they go their separate ways. Frieren, an elf mage, embarks on a new journey to learn more about the world and her companions, but time passes differently for an immortal.",
    episodes: 28,
    status: 'FINISHED',
    season: 'FALL',
    seasonYear: 2023,
    score: 9.3,
    popularity: 8,
    genres: ['Adventure', 'Drama', 'Fantasy'],
    studios: ['Madhouse'],
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' }
    ]
  },
  {
    id: 9,
    title: "Solo Leveling",
    titleEnglish: "Solo Leveling",
    titleJapanese: "俺だけレベルアップな件",
    coverImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
    synopsis: "In a world where hunters with magical abilities must battle deadly monsters to protect the human race, Sung Jinwoo, the weakest hunter of all mankind, finds himself in a constant struggle for survival.",
    episodes: 12,
    status: 'RELEASING',
    season: 'WINTER',
    seasonYear: 2024,
    score: 8.8,
    popularity: 9,
    genres: ['Action', 'Fantasy', 'Adventure'],
    studios: ['A-1 Pictures'],
    nextAiringEpisode: { episode: 10, airingAt: Date.now() + 432000000 },
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' }
    ]
  },
  {
    id: 10,
    title: "Bocchi the Rock!",
    titleEnglish: "Bocchi the Rock!",
    titleJapanese: "ぼっち・ざ・ろっく！",
    coverImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
    synopsis: "Hitori Gotoh, a lonely high school girl whose dream is to perform in a band, joins the band Kessoku Band after being recruited by the drummer Nijika Ijichi.",
    episodes: 12,
    status: 'FINISHED',
    season: 'FALL',
    seasonYear: 2022,
    score: 8.9,
    popularity: 10,
    genres: ['Comedy', 'Slice of Life'],
    studios: ['CloverWorks'],
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' }
    ]
  },
  {
    id: 11,
    title: "Vinland Saga",
    titleEnglish: "Vinland Saga",
    titleJapanese: "ヴィンランド・サガ",
    coverImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop",
    synopsis: "Thorfinn, son of one of the Vikings' greatest warriors, is among the finest fighters in the merry band of mercenaries run by the cunning Askeladd. However, Thorfinn is not part of the group for the plunder.",
    episodes: 48,
    status: 'FINISHED',
    season: 'WINTER',
    seasonYear: 2023,
    score: 9.0,
    popularity: 11,
    genres: ['Action', 'Adventure', 'Drama'],
    studios: ['MAPPA', 'Wit Studio'],
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' },
      { platform: 'netflix', url: 'https://netflix.com' }
    ]
  },
  {
    id: 12,
    title: "Oshi no Ko",
    titleEnglish: "Oshi no Ko",
    titleJapanese: "【推しの子】",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    synopsis: "A doctor who is a fan of an idol named Ai Hoshino is reborn as her son after he is murdered. Together with his twin sister, they navigate the dark entertainment industry.",
    episodes: 11,
    status: 'RELEASING',
    season: 'SUMMER',
    seasonYear: 2024,
    score: 8.7,
    popularity: 12,
    genres: ['Drama', 'Mystery', 'Supernatural'],
    studios: ['Doga Kobo'],
    nextAiringEpisode: { episode: 6, airingAt: Date.now() + 518400000 },
    streamingLinks: [
      { platform: 'crunchyroll', url: 'https://crunchyroll.com' }
    ]
  }
];

export const genres = [
  'Action',
  'Adventure', 
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller'
];

export const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'] as const;

export const years = [2024, 2023, 2022, 2021, 2020, 2019];

export const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'score', label: 'Highest Rated' },
  { value: 'title', label: 'Title A-Z' },
  { value: 'newest', label: 'Newest First' }
];
