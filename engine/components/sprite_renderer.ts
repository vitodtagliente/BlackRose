import { Image } from "../asset";
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
        this.textureRect = new TextureRect();
    }

    public render(renderer: Renderer): void 
    {
        super.render(renderer);
        
        if (this.image != null)
        {
            renderer.drawSprite(renderer.textureLibrary.get(this.image), this.transform, this.textureRect);
        }
    }
}