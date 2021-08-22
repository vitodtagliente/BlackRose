import { Application } from "../application";
import { Texture, TextureRect } from "../graphics";
import { Component } from "../scene";

export default class SpriteComponent extends Component
{
    public texture: Texture;
    public textureRect: TextureRect;

    public constructor(app: Application)
    {
        super(app);
        this.textureRect = new TextureRect();
    }

    public update(deltaTime: number): void 
    {
        if (this.texture != null)
        {
            this.app.renderer.drawSprite(this.texture, this.transform, this.textureRect);
        }
    }
}