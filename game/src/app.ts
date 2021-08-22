import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Audio, Image } from 'blackrose/asset';
import { SpriteComponent } from 'blackrose/components';
import { Section } from 'blackrose/debug';
import { Color, Texture, TextureRect } from 'blackrose/graphics';
import { KeyCode } from 'blackrose/input';
import { Matrix2, Matrix3, Quaternion, random, Transform, Vector2, Vector3 } from 'blackrose/math';
import { Camera, CameraClippingPlanes, Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.WebGL);
app.canvas.fullscreen();
app.run();

Color.white.copy(app.renderer.background);

let texture: Texture;
const image: Image = Image.load("assets/cat.png", () =>
{
    texture = app.context.createTexture(image);

    init();
});

function init()
{
    for (let i: number = 0; i < 1; ++i)
    {
        const entity: Entity = app.world.spawn(new Entity("entity" + i), Vector3.zero(), Quaternion.identity());
        entity.transform.scale.set(0.2, 0.2, 1);
        const sprite: SpriteComponent = entity.addComponent(new SpriteComponent(app));
        sprite.texture = texture;
        sprite.textureRect.width = 1 / 6;
    }
}

/*
let camera: Camera = app.world.spawn(new Camera("camera"), Vector3.zero(), Quaternion.identity());
camera.viewport.x = -1;
camera.viewport.y = -1;
camera.computeViewMatrix();
camera.transform.compute();
camera.compute();

app.context.camera = camera.matrix;
*/