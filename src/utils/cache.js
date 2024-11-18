/**
 * Instantiate a standalone in-memory cache with basic functionality.
 *
 * A note on serverless:
 * State (between invocations) such as temporary files, memory caches, sub-processes, is preserved.
 * This empowers the developer to take advantage of caching data (in memory or filesystem).
 *
 * State is NOT shared between different instances of the same function, nor between cold-starts.
 * https://vercel.com/docs/functions/concepts#functions-lifecycle
 */
export class LocalCache {
    cache = {};
    /** Delete an item from the cache */
    remove(key) {
        delete this.cache[key];
    }
    /** Internal function to remove expired entries */
    cleanup() {
        for (const key in this.cache) {
            const now = Date.now();
            if (this.cache[key].expiresAtMs <= now) {
                this.remove(key);
            }
        }
    }
    /** Retrieves a value from the cache, or null if entry is expired */
    get(key) {
        const item = this.cache[key];
        const now = Date.now();
        if (item && item.expiresAtMs > now) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- valid
            return item.value;
        }
        if (item && item.expiresAtMs <= now) {
            this.cleanup();
        }
        return null;
    }
    /** Save data to the cache with a given ttl (milliseconds) and key */
    set(params) {
        const ttlMs = params.ttlMs ?? 60 * 60 * 24;
        this.cache[params.key] = {
            value: params.value,
            expiresAtMs: Date.now() + ttlMs,
        };
    }
    /** Delete all entries from the cache - useful for tests */
    clearAll() {
        for (const key in this.cache) {
            this.remove(key);
        }
    }
}
export const globalRuntimeCache = new LocalCache();
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- cachePromises[key] is any
const cachePromises = {};
/**
 * Makes a function cacheable
 * @param param0
 * @returns
 */
export const withCache = ({ key, func, ttlMs, }) => {
    const cachedResult = globalRuntimeCache.get(key);
    // If there is a cached result return it.
    if (cachedResult !== undefined && cachedResult !== null) {
        return Promise.resolve(cachedResult);
    }
    // If there is a cached promise (ie. the function has already been called), we subscribe to it and return the result
    const existingPromise = cachePromises[key];
    if (existingPromise) {
        return new Promise((resolve) => existingPromise.then(resolve));
    }
    // Otherwise, We create a new cache promise
    cachePromises[key] = new Promise((resolve, reject) => {
        func()
            .then((res) => {
            // On success set the cache
            globalRuntimeCache.set({
                key,
                value: res,
                ttlMs,
            });
            // Resolve the value
            resolve(res);
            // Cleanup the promise
            delete cachePromises[key];
        })
            .catch((error) => {
            // On error cleanup the promisse
            delete cachePromises[key];
            // Cascade the error
            reject(error);
        });
    });
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- cachePromises[key] is any
    return cachePromises[key];
};
/**
 * Makes a synchronous function cacheable
 * @param param0
 * @returns
 */
export const withCacheSync = ({ key, func, ttlMs, }) => {
    const cachedResult = globalRuntimeCache.get(key);
    // If there is a cached result return it.
    if (cachedResult !== undefined && cachedResult !== null) {
        return cachedResult;
    }
    const value = func();
    globalRuntimeCache.set({ key, ttlMs, value });
    return value;
};
