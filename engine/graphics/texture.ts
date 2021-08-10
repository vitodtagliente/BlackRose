import { Image } from "../asset";

export default class Texture
{
    public image: Image;
    
    public constructor(image: Image)
    {
        this.image = image;
    }
}