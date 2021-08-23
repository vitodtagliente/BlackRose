import * as BlackRose from 'blackrose';
import { SpriteAnimation, SpriteAnimator } from 'blackrose/animation';
import { Image } from 'blackrose/asset';
import { SpriteComponent } from 'blackrose/components';
import { GameMode } from 'blackrose/game';
import { Color, Texture, TextureRect } from 'blackrose/graphics';
import { Quaternion, random, Vector3 } from 'blackrose/math';
import { Entity } from 'blackrose/scene';

class TestGameMode extends GameMode
{
    private _texture: Texture;

    public constructor()
    {
        super();
    }

    public init(): void 
    {
        const image: Image = Image.load("assets/cat.png", () =>
        {
            this._texture = app.context.createTexture(image);

            for (let i: number = 0; i < 100; ++i)
            {
                const entity: Entity = app.world.spawn(new Entity("entity" + i), Vector3.zero(), Quaternion.identity());
                entity.transform.position.set(random(-.5, .5), random(-.5, .5), 0);
                console.log(entity.transform.position.data);
                entity.transform.scale.set(0.15, 0.15, 1);
                const sprite = entity.addComponent(new SpriteComponent(app));
                sprite.texture = this._texture;
                sprite.textureRect.width = 1 / 6;

                const animator = entity.addComponent(new SpriteAnimator(app));
                {
                    const walk: SpriteAnimation = new SpriteAnimation;
                    const size: number = 1 / 6;
                    walk.add(new TextureRect(0 * size, 0, size, 1), 100);
                    walk.add(new TextureRect(1 * size, 0, size, 1), 100);
                    walk.add(new TextureRect(2 * size, 0, size, 1), 100);
                    walk.add(new TextureRect(3 * size, 0, size, 1), 100);
                    walk.add(new TextureRect(4 * size, 0, size, 1), 100);
                    walk.add(new TextureRect(5 * size, 0, size, 1), 100);
                    animator.add("walk", walk);
                }
                animator.play("walk", true);
            }
        });
    }
}

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