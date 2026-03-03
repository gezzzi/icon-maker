export function simpleHash(str: string): number[] {
  const hash: number[] = [];
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  // Generate enough bytes
  for (let i = 0; i < 32; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    hash.push(h & 0xff);
  }
  return hash;
}

export function hashToColor(hash: number[]): string {
  const h = ((hash[0] * 256 + hash[1]) % 360);
  return `hsl(${h}, 65%, 50%)`;
}
