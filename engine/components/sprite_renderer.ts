import { AssetLibrary, Image } from "../asset";
import { serializable } from "../core";
import { Renderer, TextureCoords, TextureRect } from "../graphics";
import { Component } from "../scene";

@serializable
export default class SpriteRenderer extends Component
{
    public image: Image;
    public textureRect: TextureRect;

    public constructor()
    {
        super();
        this.image = new Image();
        this.textureRect = new TextureRect();
    }

    public render(renderer: Renderer): void 
    {
        super.render(renderer);
        
        if (this.image.isReady)
        {
            renderer.drawSprite(renderer.textureLibrary.get(this.image), this.transform, this.textureRect);
        }
    }

    public serialize(): any 
    {
        let data: any = super.serialize();
        data["image"] = this.image.serialize();
        data["rect"] = this.textureRect.serialize();
        return data;
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case "image": this.image.deserialize(data[key]); break;
                case "rect": this.textureRect.deserialize(data[key]); break;
            }
        }
    }
}