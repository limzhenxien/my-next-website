import { setCachedData, getCachedData } from './cache';
import { scrapeAlphaBadminton, scrapeKBCBadminton, scrapeNBCBadminton } from './scraper';
import { Court } from '../courts/service';

// Cache keys
const CACHE_KEY_PREFIX = 'venue_courts';

// Generate a cache key for a specific venue and date
const getVenueCacheKey = (venueId: string, date: string) => {
  return `${CACHE_KEY_PREFIX}_${venueId}_${date}`;
};

// Schedule timestamps for data refresh
const lastRefreshTime: Record<string, number> = {};

// Check if data needs refresh (every hour)
const needsRefresh = (key: string): boolean => {
  const now = Date.now();
  const lastTime = lastRefreshTime[key] || 0;
  return now - lastTime > 60 * 60 * 1000; // 1 hour
};

// Refresh court data for all venues for a specific date
export async function refreshCourtData(date: string): Promise<void> {
  console.log(`Refreshing court data for ${date}`);
  
  // Fetch data from Alpha Badminton
  const alphaKey = getVenueCacheKey('alpha', date);
  if (needsRefresh(alphaKey)) {
    const alphaResult = await scrapeAlphaBadminton(date);
    if (alphaResult.success && alphaResult.courts.length > 0) {
      setCachedData<Court[]>(alphaKey, alphaResult.courts, 3600); // Cache for 1 hour
      lastRefreshTime[alphaKey] = Date.now();
    }
  }
  
  // Fetch data from KBC
  const kbcKey = getVenueCacheKey('kbc', date);
  if (needsRefresh(kbcKey)) {
    const kbcResult = await scrapeKBCBadminton(date);
    if (kbcResult.success && kbcResult.courts.length > 0) {
      setCachedData<Court[]>(kbcKey, kbcResult.courts, 3600);
      lastRefreshTime[kbcKey] = Date.now();
    }
  }
  
  // Fetch data from NBC
  const nbcKey = getVenueCacheKey('nbc', date);
  if (needsRefresh(nbcKey)) {
    const nbcResult = await scrapeNBCBadminton(date);
    if (nbcResult.success && nbcResult.courts.length > 0) {
      setCachedData<Court[]>(nbcKey, nbcResult.courts, 3600);
      lastRefreshTime[nbcKey] = Date.now();
    }
  }
}

// Get cached court data for a venue, or refresh if needed
export async function getVenueCourtData(venueId: string, date: string): Promise<Court[]> {
  const cacheKey = getVenueCacheKey(venueId, date);
  
  // Check if we have cached data
  const cachedData = getCachedData<Court[]>(cacheKey);
  if (cachedData && !needsRefresh(cacheKey)) {
    return cachedData;
  }
  
  // No cached data or needs refresh, fetch new data
  let result: Court[] = [];
  
  try {
    // Based on venue ID, call appropriate scraper
    switch (venueId) {
      case 'alpha':
        const alphaResult = await scrapeAlphaBadminton(date);
        if (alphaResult.success) {
          result = alphaResult.courts;
        }
        break;
      case 'kbc':
        const kbcResult = await scrapeKBCBadminton(date);
        if (kbcResult.success) {
          result = kbcResult.courts;
        }
        break;
      case 'nbc':
        const nbcResult = await scrapeNBCBadminton(date);
        if (nbcResult.success) {
          result = nbcResult.courts;
        }
        break;
    }
    
    // Cache the results
    if (result.length > 0) {
      setCachedData<Court[]>(cacheKey, result, 3600);
      lastRefreshTime[cacheKey] = Date.now();
    }
    
    return result;
  } catch (error) {
    console.error(`Error fetching court data for venue ${venueId}:`, error);
    return cachedData || [];
  }
}

// Initialize the scheduler for upcoming dates
export async function initializeDataScheduler(): Promise<void> {
  // Get today and next 7 days
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    dates.push(formattedDate);
  }
  
  // Initialize data for each date
  for (const date of dates) {
    await refreshCourtData(date);
  }
  
  console.log('Initial court data loaded for the next 7 days');
} 