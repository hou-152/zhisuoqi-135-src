// OpenAI-compatible chat transport shared by the offline scripts and local server.
// This module deliberately does not load credential files or parse the model's
// content, cache results, retry requests, or choose fallbacks. Callers own those
// policies.

function endpoint(base) {
  return `${base.replace(/\/$/, '')}/chat/completions`;
}

/**
 * Send one chat completion request.
 *
 * The return value is intentionally response-shaped rather than throwing for
 * HTTP failures, so each caller can retain its existing error text and exit
 * behavior. `raw` is kept because some callers include the upstream body in
 * diagnostics. `signal` is passed straight through, so a caller can impose its
 * own timeout without this module choosing a retry or fallback policy.
 */
export async function chatCompletion({ base, key, model, messages, json = false, maxTokens, temperature = 0,
  errorBodyFallback = false, signal }) {
  const payload = { model, messages, temperature };
  if (maxTokens !== undefined) payload.max_tokens = maxTokens;
  if (json) payload.response_format = { type: 'json_object' };

  const response = await fetch(endpoint(base), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(payload),
    ...(signal ? { signal } : {}),
  });

  if (!response.ok) {
    const raw = errorBodyFallback ? await response.text().catch(() => '') : await response.text();
    return {
      ok: false,
      status: response.status,
      raw,
      error: `llm-http-${response.status}`,
      detail: raw.slice(0, 300),
    };
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  return {
    ok: true,
    status: response.status,
    data,
    content,
    tokens: data.usage?.total_tokens ?? 0,
    model: data.model,
    finish: data.choices?.[0]?.finish_reason,
  };
}
