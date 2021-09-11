import * as BlackRose from 'blackrose';
import * as BlackRoseEditor from 'blackrose-editor';
import { SpriteAnimation, SpriteAnimator } from 'blackrose/animation';
import { Image } from 'blackrose/asset';
import { SpriteRenderer } from 'blackrose/components';
import { GameMode } from 'blackrose/game';
import { Color, Texture, TextureRect } from 'blackrose/graphics';
import { Quaternion, random, Rect, Vector3 } from 'blackrose/math';
import { CameraClippingPlanes, Component, Entity, OrtographicCamera } from 'blackrose/scene';
import { Application } from 'blackrose/application';
import { KeyCode } from 'blackrose/input';

class PlayerComponent extends Component
{
    private _speed: number = .005;

    public constructor(app: Application)
    {
        super(app);
    }

    public update(deltaTime: number): void 
    {
        let h: number = 0;
        if (app.keyboard.isKeysDown(KeyCode.ArrowLeft)) h = -1;
        else if (app.keyboard.isKeysDown(KeyCode.ArrowRight)) h = 1;

        this.transform.position.x += h * this._speed * deltaTime;

        if (app.keyboard.isKeyPressed(KeyCode.D))
        {
            app.world.destroy(this.owner);
        }

        if (app.keyboard.isKeyPressed(KeyCode.J))
        {
            // test
        }

        if (app.keyboard.isKeyPressed(KeyCode.C))
        {
            app.world.spawn(new Entity("verylargenameforanentity"), Vector3.zero(), Quaternion.identity());
        }
    }
}

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

            // camera
            {
                const w: number = app.canvas.width / 2 / 32;
                const h: number = app.canvas.height / 2 / 32;
                const camera: OrtographicCamera = app.world.spawn(
                    new OrtographicCamera(
                        "camera",
                        new Rect(-w, -h, w, h),
                        // new Rect(-1, -1, 1, 1),
                        new CameraClippingPlanes()
                    ),
                    Vector3.zero(),
                    Quaternion.identity()
                );
                app.camera = camera;
            }

            {
                app.canvas.onResize.on(() =>
                {
                    const w: number = app.canvas.width / 2 / 32;
                    const h: number = app.canvas.height / 2 / 32;
                    (app.camera as OrtographicCamera).viewport.set(-w, -h, w, h);
                    app.camera.computeViewMatrix();
                    app.camera.compute();
                });
            }

            // player 
            {
                const entity: Entity = app.world.spawn(new Entity("player"), Vector3.zero(), Quaternion.identity());
                const sprite = entity.addComponent(new SpriteRenderer(app));
                sprite.texture = this._texture;
                const size: number = 1 / 11;
                sprite.textureRect.set(size * 9, size * 10, size, size);

                entity.addComponent(new PlayerComponent(app));
            }

            // blocks
            for (let i: number = 0; i < 10; ++i)
            {
                const entity: Entity = app.world.spawn(new Entity("block" + i), Vector3.zero(), Quaternion.identity());
                entity.transform.position.set(i * 2, -2, 0);
                const sprite = entity.addComponent(new SpriteRenderer(app));
                sprite.texture = this._texture;
                const size: number = 1 / 11;
                sprite.textureRect.set(size * 1, 0, size, size);
            }
        });
    }
}

let app: BlackRose.Application.Application;
let editor: BlackRoseEditor.Editor;

window.onload = () =>
{
    app = new BlackRose.Application.Application('game', BlackRose.Graphics.API.WebGL);
    app.canvas.fullscreen();
    app.run(new TestGameMode());

    editor = new BlackRoseEditor.Editor();
    editor.open(app);
}