const CODEIUM_API_URL = "https://api.codeium.com/v1/completion";

export async function getCodeiumSuggestions(code:any, language:any) {
  const response = await fetch(CODEIUM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_CODEIUM_API_KEY"
    },
    body: JSON.stringify({
      code,
      language,
    })
  });

  const data = await response.json();
  return data.suggestions || [];
}
