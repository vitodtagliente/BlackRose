import { Audio, Image } from ".";

export default class Loader
{
    private _images: Array<Image>;
    private _audios: Array<Audio>;

    public constructor()
    {
        this._images = new Array<Image>();
        this._audios = new Array<Audio>();
    }

    public audio(name: string): Audio
    {
        return null;
    }

    public image(name: string): Image 
    {
        return null;
    }
}