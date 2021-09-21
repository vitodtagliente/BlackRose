import * as BlackRose from 'blackrose';
import * as BlackRoseEditor from 'blackrose-editor';
import { SpriteAnimation, SpriteAnimator } from 'blackrose/animation';
import { Image } from 'blackrose/asset';
import { CameraController2D, SpriteRenderer } from 'blackrose/components';
import { GameMode } from 'blackrose/game';
import { Color, Texture, TextureRect } from 'blackrose/graphics';
import { Quaternion, random, Rect, Vector3 } from 'blackrose/math';
import { CameraClippingPlanes, Component, Entity, OrtographicCamera } from 'blackrose/scene';
import { Application } from 'blackrose/application';
import { KeyCode } from 'blackrose/input';
import { Minion, Path, Tower, Wave, WaveManager } from './tdk';

const renderSprites: boolean = true;

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
                camera.addComponent(new CameraController2D());
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

            // Paths
            const path: Path = app.world.spawn(new Path("path1"), Vector3.zero(), Quaternion.identity());
            for (let i: number = 0; i < 10; ++i)
            {
                const entity: Entity = app.world.spawn(new Entity("block" + i), Vector3.zero(), Quaternion.identity());
                entity.transform.position.set(i * 2, -2, 0);
                const sprite = entity.addComponent(new SpriteRenderer());
                sprite.texture = this._texture;
                const size: number = 1 / 11;
                sprite.textureRect.set(size * 1, 0, size, size);

                path.push(entity.transform.position);

                sprite.enabled = renderSprites;
            }

            // Minion 
            {
                const entity: Minion = app.world.spawn(new Minion("player"), Vector3.zero(), Quaternion.identity());
                const sprite = entity.addComponent(new SpriteRenderer());
                sprite.texture = this._texture;
                const size: number = 1 / 11;
                sprite.textureRect.set(size * 9, size * 10, size, size);

                sprite.enabled = renderSprites;
            }

            // Towers
            {
                app.world.spawn(new Tower("tower"), new Vector3(4, 0, 0), Quaternion.identity());
                app.world.spawn(new Tower("tower1"), new Vector3(12, -4, 0), Quaternion.identity()); 
            }

            // wave manager
            {
                const manager: WaveManager = app.world.spawn(new WaveManager("waveManager"), Vector3.zero(), Quaternion.identity());
                let wave: Wave = new Wave;
                {
                    wave.duration = 10;
                    wave.numOfMinions = 10;
                    wave.perMinionSpawnDelay = 500;
                }
                manager.push(wave);
                manager.push(wave);
                manager.push(wave);
                manager.start();
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