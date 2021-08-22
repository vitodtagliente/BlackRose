import * as BlackRose from 'blackrose';
import { Image } from 'blackrose/asset';
import { SpriteComponent } from 'blackrose/components';
import { GameMode } from 'blackrose/game';
import { Color, Texture } from 'blackrose/graphics';
import { Quaternion, Vector3 } from 'blackrose/math';
import { Entity } from 'blackrose/scene';

class TestGameMode extends GameMode
{
    private _texture: Texture;
    private _entities: Array<Entity>;
    private _sprite: SpriteComponent;
    private _animationIndex: number = 0;
    private _animationTimer: number = 0;

    private readonly _animationTime: number = 100;

    public constructor()
    {
        super();
        this._entities = [];
    }

    public init(): void 
    {
        const image: Image = Image.load("assets/cat.png", () =>
        {
            this._texture = app.context.createTexture(image);

            for (let i: number = 0; i < 1; ++i)
            {
                const entity: Entity = app.world.spawn(new Entity("entity" + i), Vector3.zero(), Quaternion.identity());
                entity.transform.scale.set(0.15, 0.15, 1);
                this._sprite = entity.addComponent(new SpriteComponent(app));
                this._sprite.texture = this._texture;
                this._sprite.textureRect.width = 1 / 6;

                this._entities.push(entity);
            }
        });
    }

    public update(deltaTime: number): void 
    {
        this._animationTimer -= deltaTime;
        if (this._animationTimer <= 0)
        {
            this._animationIndex++;
            if (this._animationIndex >= 6)
            {
                this._animationIndex = 0;
            }
            this._animationTimer = this._animationTime;

            if (this._sprite)
            {
                this._sprite.textureRect.x = this._animationIndex * 1 / 6;
            }
        }
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