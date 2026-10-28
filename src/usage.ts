/**
 * GET /v1/keys/me/usage: this month's usage for the key's account.
 *
 * Written by hand: the SDK spec (openapi-sdk.json) leaves out the /v1/keys/
 * account routes, so the generator never makes this function.
 * scripts/post-generate.mjs restores this file and re-exports it from the
 * package root after every regeneration. The response types are generated.
 *
 * The call is not billed and does not use the plan's limits; each key may
 * make it 60 times a minute.
 */
import { client } from './client.gen.js';
import type { RequestResult } from './client/index.js';
import type { Options } from './sdk.gen.js';
import type { ApiResponseMyUsageResponse, ErrorResponse } from './types.gen.js';

export type GetMyUsageData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/v1/keys/me/usage';
};

export type GetMyUsageErrors = {
    401: ErrorResponse;
    403: ErrorResponse;
    429: ErrorResponse;
    500: ErrorResponse;
};

export type GetMyUsageResponses = {
    200: ApiResponseMyUsageResponse;
};

/**
 * Get this month's usage for your account
 *
 * Returns the calls used this UTC month, the monthly limit, the per-minute
 * limit and when the month resets.
 */
export const getMyUsage = <ThrowOnError extends boolean = false>(options?: Options<GetMyUsageData, ThrowOnError>): RequestResult<GetMyUsageResponses, GetMyUsageErrors, ThrowOnError> => (options?.client ?? client).get<GetMyUsageResponses, GetMyUsageErrors, ThrowOnError>({
    security: [{ scheme: 'bearer', type: 'http' }],
    url: '/v1/keys/me/usage',
    ...options
});
