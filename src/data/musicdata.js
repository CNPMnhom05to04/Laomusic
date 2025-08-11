// src/data/aggregateClient.js
// Gọi các hàm từ src/api/appClient.js và gom vào 1 mảng/sections

import api from '../api/appClient'; // <-- gọi appClient trong /src/api

export async function fetchAllCategoriesAggregate(options = {}) {
  const {
    recommended = { paginate: true, pageSize: 100, itemsPath: undefined },
    top100 = { params: {} },
    topGenres = { params: {} },
    topArtists = { params: {} },
    concurrency = true
  } = options;

  const fetchRecommended = async () => {
    if (recommended.paginate) {
      return api.getAllRecommended({ pageSize: recommended.pageSize });
    }
    return api.getRecommendedPage(recommended.params || {});
  };

  try {
    let [recommendedItems, top100Result, topGenresResult, topArtistsResult] = [[], null, null, null];

    if (concurrency) {
      const results = await Promise.allSettled([
        fetchRecommended(),
        api.getTop100Playlists(top100.params || {}),
        api.getTopGenresPlaylists(topGenres.params || {}),
        api.getTopFavouriteArtists(topArtists.params || {})
      ]);
      const unwrap = (r) => r.status === 'fulfilled' ? r.value : (console.warn('Fetch failed', r.reason), []);
      recommendedItems = unwrap(results[0]);
      top100Result = unwrap(results[1]);
      topGenresResult = unwrap(results[2]);
      topArtistsResult = unwrap(results[3]);
    } else {
      recommendedItems = await fetchRecommended();
      top100Result = await api.getTop100Playlists(top100.params || {});
      topGenresResult = await api.getTopGenresPlaylists(topGenres.params || {});
      topArtistsResult = await api.getTopFavouriteArtists(topArtists.params || {});
    }

    const normalize = (resp) => {
      if (!resp) return [];
      if (Array.isArray(resp)) return resp;
      if (Array.isArray(resp.items)) return resp.items;
      if (Array.isArray(resp.data)) return resp.data;
      if (resp.data && Array.isArray(resp.data.items)) return resp.data.items;
      if (Array.isArray(resp.results)) return resp.results;
      for (const k of Object.keys(resp)) if (Array.isArray(resp[k])) return resp[k];
      return [];
    };

    const sections = [
      { id: 'recommended', title: 'Nghe gì hôm nay', items: normalize(recommendedItems) },
      { id: 'top100', title: 'Nhạc top 100', items: normalize(top100Result) },
      { id: 'topGenres', title: 'Các chủ đề tiếp theo', items: normalize(topGenresResult) },
      { id: 'topArtists', title: 'Ca sỹ yêu thích', items: normalize(topArtistsResult) }
    ];

    const flatItems = sections.reduce((acc, s) => acc.concat(s.items || []), []);
    return { sections, flatItems };
  } catch (err) {
    console.error('fetchAllCategoriesAggregate error', err);
    throw err;
  }
}

export default { fetchAllCategoriesAggregate };
