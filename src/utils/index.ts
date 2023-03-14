export function stringifyEnumValues(e: unknown): string {
  const values = Object.values(e);

  return `[${values.join(', ')}]`;
}
