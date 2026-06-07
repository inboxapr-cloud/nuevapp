/**
 * API de Anthropic — SIEMPRE a través del proxy de Vite en dev
 * En producción: Cloud Function en Firebase
 * NUNCA exponer ANTHROPIC_API_KEY al cliente
 */

const API_ENDPOINT = import.meta.env.DEV
  ? '/api/ai'                              // Proxy local de Vite (vite.config.js)
  : 'https://us-central1-micanton-cr.cloudfunctions.net/generateContent'; // Cloud Function

/**
 * Genera contenido con IA
 * @param {string} prompt - Prompt del usuario
 * @param {object} options - Opciones adicionales
 * @returns {Promise<string>} - Texto generado
 */
export async function generateWithAI(prompt, options = {}) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // En producción: Cloud Function maneja la API key
      // En dev: el proxy de Vite inyecta la key desde .env
      ...(import.meta.env.DEV && {
        'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY_DEV || '',
        'anthropic-version': '2023-06-01',
      }),
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: options.maxTokens || 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error('Error de API: ' + response.status);
  }

  const data = await response.json();
  return data.content?.map(b => b.text || '').join('') || '';
}

export default { generateWithAI };
