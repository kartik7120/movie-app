export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);


export function runTimeConversion(runtime: string): string {
  const temp = new Date(parseInt(runtime) * 1000 * 60).toISOString().substring(11, 19);
  let part1 = temp.substring(0, 2);
  let part2 = temp.substring(3, 5);
  return `${parseInt(part1)}h ${part2}m`;
}

export function covertDataFormat(date: string): string {
  const part1 = date.substring(0, 4);
  const part2 = date.substring(5, 7);
  const part3 = date.substring(8);
  return `${part3}/${part2}/${part1}`;
}

export function convertCode(code: string | null) {
  if (code === null)
    return "";
  return new Intl.DisplayNames([`${code}`], {
    type: "language"
  }).of('en')
}

export function getAge(dateString: string | null | undefined): number | null {

  if (dateString === null || dateString === undefined) {
    return null;
  }
  const date = new Date();
  const birthDate = new Date(dateString);
  let age = date.getFullYear() - birthDate.getFullYear();
  const m = date.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}