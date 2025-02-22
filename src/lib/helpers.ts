export function convertObjectToURLParams<T extends Record<string, unknown>>(
  data: T,
): string {
  const params = new URLSearchParams();

  for (const [key, values] of Object.entries(data)) {
    if (values) {
      if (Array.isArray(values)) {
        const value = values.filter((v) => v); // Filter out empty or falsy values from array
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, `${values}`);
      }
    }
  }

  return `${params}`;
}
