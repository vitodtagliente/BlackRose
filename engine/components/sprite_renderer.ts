import { Application } from "../application";
import { Renderer, Texture, TextureRect } from "../graphics";
import { Component } from "../scene";

export default class SpriteRenderer extends Component
{
    public texture: Texture;
    public textureRect: TextureRect;

    public constructor()
    {
        super();
        this.textureRect = new TextureRect();
    }

    public render(renderer: Renderer): void 
    {
        if (this.texture != null)
        {
            renderer.drawSprite(this.texture, this.transform, this.textureRect);
        }
    }
}