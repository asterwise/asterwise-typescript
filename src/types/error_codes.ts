/**
 * AUTO-GENERATED — DO NOT EDIT.
 *
 * This file is produced by scripts/generate_error_artifacts.py in
 * asterwise-api. Any hand edits will be overwritten on the next
 * generator run and will fail the CI drift check.
 *
 * To change the contents, edit the source registry at
 * app/core/error_codes.py in asterwise-api, then re-run the
 * generator with --write-sdks.
 *
 * Generated from 47 codes (hash a6da401d38ca7954) ErrorCode members.
 */

/**
 * Stable wire-value identifier for every error the API can return.
 *
 * Use as the type for the ``error`` field of error responses:
 *   if (response.error === "api_key_revoked") { ... }
 */
export type ErrorCode =
  | "account_not_found"
  | "already_on_plan"
  | "api_key_invalid"
  | "api_key_missing"
  | "api_key_not_found"
  | "api_key_revoked"
  | "authentication_failed"
  | "burst_limit_exceeded"
  | "city_not_found"
  | "email_delivery_failed"
  | "email_not_verified"
  | "ephemeris_unavailable"
  | "exchange_code_already_used"
  | "exchange_code_attempt_limit_exceeded"
  | "exchange_code_not_found"
  | "geocode_query_too_short"
  | "geocode_unavailable"
  | "internal_error"
  | "invalid_email"
  | "invalid_request_body"
  | "ip_rate_limit_exceeded"
  | "key_not_found"
  | "location_required"
  | "magic_link_already_used"
  | "magic_link_email_limit_exceeded"
  | "magic_link_expired"
  | "magic_link_ip_limit_exceeded"
  | "magic_link_not_found"
  | "max_keys_exceeded"
  | "monthly_usage_limit_exceeded"
  | "order_creation_failed"
  | "ownership_denied"
  | "payload_too_large"
  | "payment_provider_unavailable"
  | "payment_request_invalid"
  | "payment_verification_failed"
  | "plan_not_found"
  | "resource_not_found"
  | "session_expired"
  | "session_not_found"
  | "session_required"
  | "session_revoked"
  | "solar_day_out_of_range"
  | "subscription_expired"
  | "subscription_not_found"
  | "sun_calculation_failed"
  | "validation_error";

/**
 * Runtime array of every valid ErrorCode value.
 */
export const ALL_ERROR_CODES: readonly ErrorCode[] = [
  "account_not_found",
  "already_on_plan",
  "api_key_invalid",
  "api_key_missing",
  "api_key_not_found",
  "api_key_revoked",
  "authentication_failed",
  "burst_limit_exceeded",
  "city_not_found",
  "email_delivery_failed",
  "email_not_verified",
  "ephemeris_unavailable",
  "exchange_code_already_used",
  "exchange_code_attempt_limit_exceeded",
  "exchange_code_not_found",
  "geocode_query_too_short",
  "geocode_unavailable",
  "internal_error",
  "invalid_email",
  "invalid_request_body",
  "ip_rate_limit_exceeded",
  "key_not_found",
  "location_required",
  "magic_link_already_used",
  "magic_link_email_limit_exceeded",
  "magic_link_expired",
  "magic_link_ip_limit_exceeded",
  "magic_link_not_found",
  "max_keys_exceeded",
  "monthly_usage_limit_exceeded",
  "order_creation_failed",
  "ownership_denied",
  "payload_too_large",
  "payment_provider_unavailable",
  "payment_request_invalid",
  "payment_verification_failed",
  "plan_not_found",
  "resource_not_found",
  "session_expired",
  "session_not_found",
  "session_required",
  "session_revoked",
  "solar_day_out_of_range",
  "subscription_expired",
  "subscription_not_found",
  "sun_calculation_failed",
  "validation_error",
] as const;
