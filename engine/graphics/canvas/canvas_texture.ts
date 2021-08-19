import { Image } from "../../asset";
import Texture from "../texture";

export default class CanvasTexture extends Texture
{
    public constructor(image: Image)
    {
        super(image);
    }

    public bind(slot: number = 0): void
    {
        
    }

    public free(): void
    {
        this.image.data.remove();
    }
}