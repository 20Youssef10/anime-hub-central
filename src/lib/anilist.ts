import { Anime } from '@/types/anime';

const ANILIST_API = 'https://graphql.anilist.co';

// GraphQL query fragments
const MEDIA_FRAGMENT = `
  id
  title {
    romaji
    english
    native
  }
  coverImage {
    extraLarge
    large
  }
  bannerImage
  description(asHtml: false)
  episodes
  status
  season
  seasonYear
  averageScore
  popularity
  genres
  studios(isMain: true) {
    nodes {
      name
    }
  }
  trailer {
    id
    site
  }
  nextAiringEpisode {
    episode
    airingAt
  }
  externalLinks {
    site
    url
  }
`;

interface AniListMedia {
  id: number;
  title: {
    romaji: string;
    english?: string;
    native?: string;
  };
  coverImage: {
    extraLarge?: string;
    large?: string;
  };
  bannerImage?: string;
  description?: string;
  episodes?: number;
  status: string;
  season?: string;
  seasonYear?: number;
  averageScore?: number;
  popularity: number;
  genres: string[];
  studios?: {
    nodes: { name: string }[];
  };
  trailer?: {
    id: string;
    site: string;
  };
  nextAiringEpisode?: {
    episode: number;
    airingAt: number;
  };
  externalLinks?: {
    site: string;
    url: string;
  }[];
}

// Transform AniList data to our Anime type
function transformMedia(media: AniListMedia): Anime {
  const streamingLinks: Anime['streamingLinks'] = [];
  
  media.externalLinks?.forEach(link => {
    const siteLower = link.site.toLowerCase();
    if (siteLower.includes('crunchyroll')) {
      streamingLinks.push({ platform: 'crunchyroll', url: link.url });
    } else if (siteLower.includes('netflix')) {
      streamingLinks.push({ platform: 'netflix', url: link.url });
    } else if (siteLower.includes('funimation')) {
      streamingLinks.push({ platform: 'funimation', url: link.url });
    } else if (siteLower.includes('hulu')) {
      streamingLinks.push({ platform: 'hulu', url: link.url });
    }
  });

  return {
    id: media.id,
    title: media.title.romaji,
    titleEnglish: media.title.english || undefined,
    titleJapanese: media.title.native || undefined,
    coverImage: media.coverImage.extraLarge || media.coverImage.large || '',
    bannerImage: media.bannerImage || undefined,
    synopsis: media.description?.replace(/<[^>]*>/g, '') || '',
    episodes: media.episodes || null,
    status: media.status as Anime['status'],
    season: media.season as Anime['season'],
    seasonYear: media.seasonYear,
    score: (media.averageScore || 0) / 10,
    popularity: media.popularity,
    genres: media.genres,
    studios: media.studios?.nodes.map(s => s.name) || [],
    trailer: media.trailer,
    nextAiringEpisode: media.nextAiringEpisode,
    streamingLinks: streamingLinks.length > 0 ? streamingLinks : undefined,
  };
}

async function fetchAniList<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`AniList API error: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'AniList API error');
  }

  return json.data;
}

// Fetch trending anime
export async function fetchTrendingAnime(page = 1, perPage = 20): Promise<Anime[]> {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
          ${MEDIA_FRAGMENT}
        }
      }
    }
  `;

  const data = await fetchAniList<{ Page: { media: AniListMedia[] } }>(query, { page, perPage });
  return data.Page.media.map(transformMedia);
}

// Fetch popular anime
export async function fetchPopularAnime(page = 1, perPage = 20): Promise<Anime[]> {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
          ${MEDIA_FRAGMENT}
        }
      }
    }
  `;

  const data = await fetchAniList<{ Page: { media: AniListMedia[] } }>(query, { page, perPage });
  return data.Page.media.map(transformMedia);
}

// Fetch top rated anime
export async function fetchTopRatedAnime(page = 1, perPage = 20): Promise<Anime[]> {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: SCORE_DESC, isAdult: false) {
          ${MEDIA_FRAGMENT}
        }
      }
    }
  `;

  const data = await fetchAniList<{ Page: { media: AniListMedia[] } }>(query, { page, perPage });
  return data.Page.media.map(transformMedia);
}

// Fetch currently airing anime
export async function fetchAiringAnime(page = 1, perPage = 20): Promise<Anime[]> {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC, isAdult: false) {
          ${MEDIA_FRAGMENT}
        }
      }
    }
  `;

  const data = await fetchAniList<{ Page: { media: AniListMedia[] } }>(query, { page, perPage });
  return data.Page.media.map(transformMedia);
}

// Fetch anime by season
export async function fetchSeasonalAnime(
  season: string,
  year: number,
  page = 1,
  perPage = 20
): Promise<Anime[]> {
  const query = `
    query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, isAdult: false) {
          ${MEDIA_FRAGMENT}
        }
      }
    }
  `;

  const data = await fetchAniList<{ Page: { media: AniListMedia[] } }>(query, {
    page,
    perPage,
    season,
    seasonYear: year,
  });
  return data.Page.media.map(transformMedia);
}

// Search anime
export async function searchAnime(
  searchQuery: string,
  page = 1,
  perPage = 20
): Promise<Anime[]> {
  const query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, search: $search, isAdult: false, sort: SEARCH_MATCH) {
          ${MEDIA_FRAGMENT}
        }
      }
    }
  `;

  const data = await fetchAniList<{ Page: { media: AniListMedia[] } }>(query, {
    page,
    perPage,
    search: searchQuery,
  });
  return data.Page.media.map(transformMedia);
}

// Browse anime with filters
export interface BrowseFilters {
  genres?: string[];
  season?: string;
  seasonYear?: number;
  sort?: string;
  page?: number;
  perPage?: number;
}

const SORT_MAP: Record<string, string> = {
  popularity: 'POPULARITY_DESC',
  score: 'SCORE_DESC',
  title: 'TITLE_ROMAJI',
  newest: 'START_DATE_DESC',
  trending: 'TRENDING_DESC',
};

export async function browseAnime(filters: BrowseFilters = {}): Promise<Anime[]> {
  const { genres, season, seasonYear, sort = 'popularity', page = 1, perPage = 24 } = filters;

  const query = `
    query ($page: Int, $perPage: Int, $genres: [String], $season: MediaSeason, $seasonYear: Int, $sort: [MediaSort]) {
      Page(page: $page, perPage: $perPage) {
        media(
          type: ANIME
          genre_in: $genres
          season: $season
          seasonYear: $seasonYear
          sort: $sort
          isAdult: false
        ) {
          ${MEDIA_FRAGMENT}
        }
      }
    }
  `;

  const data = await fetchAniList<{ Page: { media: AniListMedia[] } }>(query, {
    page,
    perPage,
    genres: genres?.length ? genres : undefined,
    season: season || undefined,
    seasonYear: seasonYear || undefined,
    sort: [SORT_MAP[sort] || 'POPULARITY_DESC'],
  });
  return data.Page.media.map(transformMedia);
}

// Fetch single anime by ID
export async function fetchAnimeById(id: number): Promise<Anime> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        ${MEDIA_FRAGMENT}
      }
    }
  `;

  const data = await fetchAniList<{ Media: AniListMedia }>(query, { id });
  return transformMedia(data.Media);
}

// Fetch recommendations for an anime
export async function fetchRecommendations(id: number, perPage = 10): Promise<Anime[]> {
  const query = `
    query ($id: Int, $perPage: Int) {
      Media(id: $id, type: ANIME) {
        recommendations(perPage: $perPage, sort: RATING_DESC) {
          nodes {
            mediaRecommendation {
              ${MEDIA_FRAGMENT}
            }
          }
        }
      }
    }
  `;

  const data = await fetchAniList<{
    Media: { recommendations: { nodes: { mediaRecommendation: AniListMedia }[] } };
  }>(query, { id, perPage });

  return data.Media.recommendations.nodes
    .filter(node => node.mediaRecommendation)
    .map(node => transformMedia(node.mediaRecommendation));
}
