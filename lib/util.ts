import React from "react";
import { MediaVideo, SpecificMedia, VideoMedia } from "../schemaTypes";

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
  if (parseInt(part1) <= 0) {
    return `${part2}m`;
  }
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

function getAverageRGB(imgEl: any) {
  const promise = new Promise<{ r: number, g: number, b: number }>((resolve, reject) => {
    try {

      let blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

      if (!context) {
        return defaultRGB;
      }

      height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
      width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

      context.drawImage(imgEl, 0, 0);

      try {
        data = context.getImageData(0, 0, width, height);
      } catch (e) {
        /* security error, img on diff domain */
        return defaultRGB;
      }

      length = data.data.length;

      while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
      }

      // ~~ used to floor values
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);

      return resolve(rgb);
    } catch (error) {
      reject({
        r: 0,
        g: 0,
        b: 0
      })
    }
  })

  return promise;
}

function componentToHex(c: any) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


export function getImageColor(img: string) {
  const image = document.createElement("img");
  image.src = img;
  image.width = 1920;
  image.height = 1080;
  image.crossOrigin = "anonymous";

  return new Promise<{ r: number, g: number, b: number }>((resolve, reject) => {
    image.onload = async () => {
      try {
        const rgb = await getAverageRGB(image);
        return resolve(rgb);
      } catch (error) {
        return reject({
          r: 0,
          g: 0,
          b: 0
        })
      }
    }
  })
}

export const monthArr = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export function GetDate(date: string | null) {
  if (date === null) {
    return null;
  }

  const d = new Date(date);
  const month = monthArr[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const day = d.getUTCDay();
  return `${month} ${day},${year}`;
}

export function filterName(arr: any[], filter: string): string[] {

  const newArr = arr.filter((ele) => {
    if (ele.job === filter) {
      return true;
    }
  });

  const result = newArr.map((ele) => {
    return ele.name
  })

  return result;
}

export function getVideoTralier(videoMedia: any | null) {

  if (videoMedia === null) {
    return null;
  }

  if (videoMedia.typeMap === null) {
    return null;
  }

  if (videoMedia.typeMap && videoMedia.typeMap.length <= 0) {
    return null;
  }

  if (videoMedia.typeMap?.includes("Trailer") && videoMedia.mediaVideo) {
    for (let i = 0; i < videoMedia.mediaVideo.length; i++) {
      if (videoMedia.mediaVideo[i]?.type === "Trailer" && videoMedia.mediaVideo[i]) {
        return videoMedia.mediaVideo[i].key;
      }
    }
  }

  if (videoMedia.typeMap?.includes("Teaser") && videoMedia.mediaVideo) {
    for (let i = 0; i < videoMedia.mediaVideo.length; i++) {
      if (videoMedia.mediaVideo[i]?.type === "Teaser" && videoMedia.mediaVideo[i]) {
        return videoMedia.mediaVideo[i].key;
      }
    }
  }

  return null;
}