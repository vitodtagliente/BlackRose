import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Audio, Image } from 'blackrose/asset';
import { Section } from 'blackrose/debug';
import { Color, Texture } from 'blackrose/graphics';
import { KeyCode } from 'blackrose/input';
import { Quaternion, random, Transform, Vector2, Vector3 } from 'blackrose/math';
import { Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.run();

class CatComponent extends Component
{
    private _catTexture: Texture;
    private _rainbowTexture: Texture;
    private _catAnimIndex: number = 0;
    private _rainbowAnimIndex: number = 0;
    private _animTime: number = 0;

    public constructor(app: Application)
    {
        super(app);
        this._catTexture = new Texture(Image.load("assets/cat.png"));
        this._rainbowTexture = new Texture(Image.load("assets/rainbow.png"));
    }

    public init(): void 
    {
        this.transform.position.set(
            this.app.canvas.width / 2 - this._catTexture.image.width / 12,
            this.app.canvas.height / 2 - this._catTexture.image.height / 12,
            0
        );

        this.app.canvas.onResize.on(() =>
        {
            this.transform.position.set(
                this.app.canvas.width / 2 - this._catTexture.image.width / 12,
                this.app.canvas.height / 2 - this._catTexture.image.height / 12,
                0
            );
        });
    }

    public update(deltaTime: number): void 
    {
        this.app.renderer.drawSubTexture(
            this.owner.transform.position.sub(new Vector3(100, 0, 0)),
            this._rainbowTexture,
            new Vector2(this._rainbowTexture.image.width / 2 * this._rainbowAnimIndex, 0),
            new Vector2(this._rainbowTexture.image.width / 2, this._rainbowTexture.image.height)
        );

        this.app.renderer.drawSubTexture(
            this.owner.transform.position,
            this._catTexture,
            new Vector2(this._catTexture.image.width / 6 * this._catAnimIndex, 0),
            new Vector2(this._catTexture.image.width / 6, this._catTexture.image.height)
        );

        this._animTime += deltaTime;
        if (this._animTime > 200)
        {
            this._animTime = 0;

            this._catAnimIndex++;
            this._rainbowAnimIndex++;

            if (this._catAnimIndex > 5)
                this._catAnimIndex = 0;

            if (this._rainbowAnimIndex > 1)
                this._rainbowAnimIndex = 0;
        }
    }
}

const cat: Entity = app.world.spawn(new Entity("cat"), Vector3.zero, Quaternion.identity);
cat.addComponent(new CatComponent(app));

app.debug.addSection('entities')
    .entity('cat', cat);

const backgroundAudio: Audio = Audio.load("assets/music.mp3");
app.mouse.onClick.on(() =>
{
    backgroundAudio.play();
});