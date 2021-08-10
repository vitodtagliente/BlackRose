import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Image } from 'blackrose/asset';
import { Color, Texture } from 'blackrose/graphics';
import { random, Transform, Vector3 } from 'blackrose/math';
import { Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.run();

class BallComponent extends Component
{
    private _radius: number;
    private _color: Color;
    private _speed: number;

    private goRight: boolean = true;

    public constructor(app: Application)
    {
        super(app);
    }

    public _init(): void 
    {
        this._color = Color.random();
        this._radius = random(15, 30);
        this._speed = random(4, 10);
        this.owner.transform.position.x = random(
            this._radius, this.app.canvas.width - this._radius
        );
        this.owner.transform.position.y = random(
            this._radius, this.app.canvas.height - this._radius
        );
    }

    public update(deltaTime: number): void 
    {
        if (this.goRight)
        {
            this.goRight = this.owner.transform.position.x < this.app.canvas.width - this._radius;
        }
        else 
        {
            this.goRight = this.owner.transform.position.x < this._radius;
        }

        this.owner.transform.position.x += this._speed * (this.goRight ? 1 : -1);

        this.app.renderer.drawCircle(this.owner.transform.position, this._radius, this._color);
    }
}

class CatComponent extends Component
{
    private catTexture: Texture;

    public constructor(app: Application)
    {
        super(app);
        this.catTexture = new Texture(Image.load("assets/cat.png", () =>
        {
            console.log("cat loaded");
        })
        );
    }

    public update(deltaTime: number): void 
    {
        const position: Vector3 = new Vector3(
            this.app.canvas.width / 2 - this.catTexture.image.width / 2,
            this.app.canvas.height / 2 - this.catTexture.image.height / 2
        );
        this.app.renderer.drawSprite(position, this.catTexture);
    }
}

for (let i: number = 0; i < 1000; ++i)
{
    const ball: Entity = app.world.spawn(new Entity("ball"), new Transform);
    ball.addComponent(new BallComponent(app));
}

const cat: Entity = app.world.spawn(new Entity("cat"), new Transform);
cat.addComponent(new CatComponent(app));