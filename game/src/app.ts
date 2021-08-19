import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Audio, Image } from 'blackrose/asset';
import { Section } from 'blackrose/debug';
import { Color, Texture, TextureRect } from 'blackrose/graphics';
import { KeyCode } from 'blackrose/input';
import { Matrix2, Matrix3, Quaternion, random, Transform, Vector2, Vector3 } from 'blackrose/math';
import { Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.WebGL);
app.canvas.fullscreen();
app.run();

Color.white.copy(app.renderer.clearColor);

let roseTexture: Texture;
const roseImg: Image = Image.load("assets/rose.png", () =>
{
    console.log("Rose asset ready!");
    roseTexture = app.context.createTexture(roseImg);
});

class RoseComponent extends Component
{
    private _moveDirection: Vector3;

    public constructor(app: Application)
    {
        super(app);
    }

    public init(): void
    {
        //this.transform.position.set(random(-.8, .8), random(-.8, .8), 0);
        //this.transform.scale.set(random(.2, .5), random(.2, .5), 1);
    }

    public update(deltaTime: number): void
    {
        // this.app.context.drawSprite(roseTexture, this.transform);
        // this.app.context.drawSubSprite(roseTexture, this.transform, new TextureRect(0, 0, 1, 1));
        this.app.context.drawSprites(roseTexture, [
            [this.transform, new TextureRect()]
        ]);
    }
}

for (let i: number = 0; i < 1; ++i)
{
    const rose: Entity = app.world.spawn(new Entity("rose"), Vector3.zero, Quaternion.identity);
    rose.addComponent(new RoseComponent(app));
}