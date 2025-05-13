import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
/**
 * Detects whether text contains Thai characters and returns appropriate language code
 * @param {string} text - The text to analyze for language detection
 * @returns {'th-TH' | 'en-US'} Language code - 'th-TH' for Thai text, 'en-US' for non-Thai text
 */
export const detectLanguage = (text: string): 'th-TH' | 'en-US' => {
  const thPattern = /[\u0E00-\u0E7F]/; // Thai Unicode Range
  return thPattern.test(text) ? 'th-TH' : 'en-US';
};

/**
 * Generates a TTS (Text-to-Speech) audio URL from the provided text using environment variable for API URL
 * @param {string} text - The text to convert to speech
 * @returns {Promise<string>} A URL pointing to the generated audio blob
 * @throws {Error} If the TTS API request fails
 */
export const getTTSAudio = async (text: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/tts`,
    { text },
    { responseType: 'blob' }
  );
  console.log('TTS response ', response);
  return URL.createObjectURL(response.data);
};
