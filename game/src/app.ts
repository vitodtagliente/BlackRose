import * as BlackRose from 'blackrose';
import { SpriteAnimation, SpriteAnimator } from 'blackrose/animation';
import { Image } from 'blackrose/asset';
import { SpriteRenderer } from 'blackrose/components';
import { GameMode } from 'blackrose/game';
import { Color, Texture, TextureRect } from 'blackrose/graphics';
import { Quaternion, random, Rect, Vector3 } from 'blackrose/math';
import { CameraClippingPlanes, Component, Entity, OrtographicCamera } from 'blackrose/scene';
import * as Editor from 'blackrose-editor';
import { Application } from 'blackrose/application';
import { KeyCode } from 'blackrose/input';

class PlayerComponent extends Component
{
    private _speed: number = .001;

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
                const camera: OrtographicCamera = app.world.spawn(
                    new OrtographicCamera(
                        "camera",
                        new Rect(-1, -1, 1, 1),
                        new CameraClippingPlanes()
                    ),
                    Vector3.zero(),
                    Quaternion.identity()
                );
                app.camera = camera;
            }

            // player 
            {
                const entity: Entity = app.world.spawn(new Entity("player"), Vector3.zero(), Quaternion.identity());
                const sprite = entity.addComponent(new SpriteRenderer(app));
                entity.transform.scale.set(64 / app.canvas.width, 64 / app.canvas.height, 1);
                sprite.texture = this._texture;
                const size: number = 1 / 11;
                sprite.textureRect.set(size * 9, size * 10, size, size);

                entity.addComponent(new PlayerComponent(app));
            }

            // blocks
            for (let i: number = 0; i < 10; ++i)
            {
                const entity: Entity = app.world.spawn(new Entity("block" + i), Vector3.zero(), Quaternion.identity());
                entity.transform.position.set(i * 128 / app.canvas.width, -128 / app.canvas.height, 0);
                entity.transform.scale.set(64 / app.canvas.width, 64 / app.canvas.height, 1);
                const sprite = entity.addComponent(new SpriteRenderer(app));
                sprite.texture = this._texture;
                const size: number = 1 / 11;
                sprite.textureRect.set(size * 1, 0, size, size);
            }
        });
    }
}

const editor: Editor.Editor = new Editor.Editor();
editor.startup();

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.WebGL);
app.canvas.fullscreen();
app.run(new TestGameMode());