import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Image } from 'blackrose/asset';
import { Color, Texture } from 'blackrose/graphics';
import { Transform, Vector3 } from 'blackrose/math';
import { Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.run();

class BallComponent extends Component
{
    private readonly _radius = 30;
    private readonly _color: Color;

    private goRight: boolean = true;

    public constructor(app: Application)
    {
        super(app);
        this._color = Color.red;
    }

    public _init(): void 
    {
        this.owner.transform.position.y = this.app.canvas.height / 2 - this._radius;
        console.log("initializing the ball");
    }

    public update(deltaTime: number): void 
    {
        const speed: number = this.app.canvas.width / 180;
        if (this.goRight && this.owner.transform.position.x > this.app.canvas.width - this._radius / 2)
        {
            this.goRight = false;
        }
        else if (!this.goRight && this.owner.transform.position.x < this._radius / 2)
        {
            this.goRight = true;
        }

        this.owner.transform.position.y = this.app.canvas.height / 2 - this._radius;
        this.owner.transform.position.x += speed * (this.goRight ? 1 : -1);

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
            console.log("image loaded");
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

const ball: Entity = app.world.spawn(new Entity("ball"), new Transform);
ball.addComponent(new BallComponent(app));

const cat: Entity = app.world.spawn(new Entity("cat"), new Transform);
ball.addComponent(new CatComponent(app));