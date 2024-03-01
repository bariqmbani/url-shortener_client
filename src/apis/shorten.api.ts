export const shorten = async (url: string, captcha: string): Promise<string> => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      captcha,
    }),
  });

  const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
  let result = "";
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    result = value;
  }
  return result;
};
