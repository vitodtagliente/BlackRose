import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Audio, Image } from 'blackrose/asset';
import { Section } from 'blackrose/debug';
import { Color, Texture } from 'blackrose/graphics';
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
    public constructor(app: Application)
    {
        super(app);
    }

    public init(): void
    {
        this.transform.position.set(
            random(-1, 1),
            random(-1, 1),
            0
        );
        this.transform.scale.set(0.4, 0.4, 1);
    }

    public update(deltaTime: number): void
    {
        this.app.context.drawSprite(roseTexture, this.transform);
    }
}

for (let i: number = 0; i < 10; ++i)
{
    const rose: Entity = app.world.spawn(new Entity("rose"), Vector3.zero, Quaternion.identity);
    rose.addComponent(new RoseComponent(app));
}