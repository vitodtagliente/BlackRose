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
    private _sprites: Array<[Transform, TextureRect]> = [];

    public constructor(app: Application)
    {
        super(app);
    }

    public init(): void
    {
        //this.transform.position.set(random(-.8, .8), random(-.8, .8), 0);
        //this.transform.scale.set(random(.2, .5), random(.2, .5), 1);

        const randomTranform = () =>
        {
            let t: Transform = new Transform;
            t.position.set(random(-1, 1), random(-1, 1), 0);
            t.rotation.z = random(0, 360);
            t.scale.set(random(0.3, 0.5), random(0.3, 0.5), 0);
            t.compute();
            return t;
        };

        const randomTextRect = () => 
        {
            return new TextureRect(random(0, 0.5), random(0, 0.5), random(0, 1), random(0, 1));
        };

        for (let i = 0; i < 200; ++i)
        {
            this._sprites.push([
                randomTranform(), new TextureRect()
            ]);
        }
    }

    public update(deltaTime: number): void
    {
        // this.app.context.drawSprite(roseTexture, this.transform);
        // this.app.context.drawSubSprite(roseTexture, this.transform, new TextureRect(0, 0, 0.5, 0.5));

        this.app.context.drawSprites(roseTexture, this._sprites);
    }
}

for (let i: number = 0; i < 1; ++i)
{
    const rose: Entity = app.world.spawn(new Entity("rose"), Vector3.zero, Quaternion.identity);
    rose.isStatic = true;
    rose.addComponent(new RoseComponent(app));
}