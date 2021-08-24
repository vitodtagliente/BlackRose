import * as BlackRose from 'blackrose';
import { SpriteAnimation, SpriteAnimator } from 'blackrose/animation';
import { Image } from 'blackrose/asset';
import { SpriteRenderer } from 'blackrose/components';
import { GameMode } from 'blackrose/game';
import { Color, Texture, TextureRect } from 'blackrose/graphics';
import { Quaternion, random, Vector3 } from 'blackrose/math';
import { Entity } from 'blackrose/scene';
import * as Editor from 'blackrose-editor';

class TestGameMode extends GameMode
{
    private _texture: Texture;

    public constructor()
    {
        super();
    }

    public init(): void 
    {
        const image: Image = Image.load("assets/spritesheet_default.png", () =>
        {
            this._texture = app.context.createTexture(image);

            for (let i: number = 0; i < 1; ++i)
            {
                const entity: Entity = app.world.spawn(new Entity("entity" + i), Vector3.zero(), Quaternion.identity());
                // entity.transform.position.set(random(-.9, .9), random(-.9, .9), 0);
                entity.transform.scale.set(0.1, 0.1, 1);
                const sprite = entity.addComponent(new SpriteRenderer(app));
                sprite.texture = this._texture;
                const size: number = 1 / 11;
                sprite.textureRect.set(size * 9, size * 10, size, size);
            }
        });
    }
}

const editor: Editor.Editor = new Editor.Editor();
editor.startup();

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.WebGL);
app.canvas.fullscreen();
app.run(new TestGameMode());

/*
let camera: Camera = app.world.spawn(new Camera("camera"), Vector3.zero(), Quaternion.identity());
camera.viewport.x = -1;
camera.viewport.y = -1;
camera.computeViewMatrix();
camera.transform.compute();
camera.compute();

app.context.camera = camera.matrix;
*/