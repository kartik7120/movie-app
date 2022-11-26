import { getPlaiceholder } from "plaiceholder";

export default async function ImagePlaceHolder(uri: string): Promise<{
    blurDataURL: string, img: any
}> {
    const { base64, img } = await getPlaiceholder(uri);

    return { blurDataURL: base64, img }
}