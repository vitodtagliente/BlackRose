import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Audio, Image } from 'blackrose/asset';
import { Section } from 'blackrose/debug';
import { Color, Texture } from 'blackrose/graphics';
import { random, Transform, Vector3 } from 'blackrose/math';
import { Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.run();

const backgroundAudio: Audio = Audio.load("assets/music.mp3");
// backgroundAudio.play();

class BallComponent extends Component
{
    public radius: number;
    public color: Color;
    public speed: number;

    private goRight: boolean = true;

    public constructor(app: Application)
    {
        super(app);
    }

    public _init(): void 
    {
        this.color = Color.random();
        this.radius = random(5, 30);
        this.speed = random(4, 10);
        this.owner.transform.position.x = random(
            this.radius, this.app.canvas.width - this.radius
        );
        this.owner.transform.position.y = random(
            this.radius, this.app.canvas.height - this.radius
        );
    }

    public update(deltaTime: number): void 
    {
        if (this.goRight)
        {
            this.goRight = this.owner.transform.position.x < this.app.canvas.width - this.radius;
        }
        else 
        {
            this.goRight = this.owner.transform.position.x < this.radius;
        }

        this.owner.transform.position.x += this.speed * (this.goRight ? 1 : -1);

        this.app.renderer.drawCircle(this.owner.transform.position, this.radius, this.color);
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

    public _init(): void 
    {
        this.owner.transform.position = new Vector3(
            this.app.canvas.width / 2 - this.catTexture.image.width / 2,
            this.app.canvas.height / 2 - this.catTexture.image.height / 2,
            0
        );
    }

    public update(deltaTime: number): void 
    {
        this.app.renderer.drawSprite(this.owner.transform.position, this.catTexture);
    }
}

for (let i: number = 0; i < 200; ++i)
{
    const ball: Entity = app.world.spawn(new Entity("ball"), new Transform);
    ball.addComponent(new BallComponent(app));
}

const cat: Entity = app.world.spawn(new Entity("cat"), new Transform);
cat.addComponent(new CatComponent(app));

app.debug.addSection('entities')
    .entity('cat', cat);