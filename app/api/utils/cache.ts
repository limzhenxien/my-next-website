import NodeCache from 'node-cache';

// Cache with 5 minute TTL (time to live) by default
const apiCache = new NodeCache({ 
  stdTTL: 300, 
  checkperiod: 320,
  useClones: false 
});

export const getCachedData = <T>(key: string): T | undefined => {
  return apiCache.get<T>(key);
};

export const setCachedData = <T>(key: string, data: T, ttl: number = 300): boolean => {
  return apiCache.set<T>(key, data, ttl);
};

export const removeCachedData = (key: string): number => {
  return apiCache.del(key);
};

export const generateCacheKey = (params: Record<string, any>): string => {
  // Sort keys to ensure consistent cache keys
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result: Record<string, any>, key) => {
      if (params[key] !== undefined) {
        result[key] = params[key];
      }
      return result;
    }, {});

  return JSON.stringify(sortedParams);
};

export default apiCache; 