import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Audio, Image } from 'blackrose/asset';
import { Section } from 'blackrose/debug';
import { Color, Texture, TextureRect } from 'blackrose/graphics';
import { KeyCode } from 'blackrose/input';
import { Matrix2, Matrix3, Quaternion, random, Transform, Vector2, Vector3 } from 'blackrose/math';
import { Camera, CameraClippingPlanes, Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.WebGL);
app.canvas.fullscreen();
app.run();

Color.yellow.copy(app.renderer.background);

let roseTexture: Texture;
const roseImg: Image = Image.load("assets/rose.png", () =>
{
    console.log("Rose asset ready!");
    roseTexture = app.context.createTexture(roseImg);
});

let camera: Camera = app.world.spawn(new Camera("camera"), Vector3.zero(), Quaternion.identity());
camera.viewport.x = -1;
camera.viewport.y = -1;
camera.computeViewMatrix();
camera.transform.compute();
camera.compute();

app.context.camera = camera.matrix;

class RoseComponent extends Component
{
    private _sprites: Array<[Transform, TextureRect]> = [];

    public constructor(app: Application)
    {
        super(app);
    }

    public init(): void
    {
        //this.transform.position.set(random(-.8, .8), random(-.8, .8), 0);
        //this.transform.scale.set(random(.2, .5), random(.2, .5), 1);

        const randomTranform = () =>
        {
            let t: Transform = new Transform;
            t.position.set(random(-1, 1), random(-1, 1), 0);
            t.rotation.z = random(0, 360);
            t.scale.set(random(0.3, 0.5), random(0.3, 0.5), 0);
            t.compute();
            return t;
        };

        const randomTextRect = () => 
        {
            return new TextureRect(random(0, 0.5), random(0, 0.5), random(0, 1), random(0, 1));
        };

        for (let i = 0; i < 200; ++i)
        {
            this._sprites.push([
                randomTranform(), new TextureRect()
            ]);
        }
    }

    public update(deltaTime: number): void
    {
        this.app.renderer.drawSprite(roseTexture, this.transform, new TextureRect());

        const cameraSpeed: number = 0.05;
        if (app.keyboard.isKeysDown(KeyCode.ArrowLeft))
        {
            camera.transform.position.x -= cameraSpeed;
        }
        else if (app.keyboard.isKeysDown(KeyCode.ArrowRight))
        {
            camera.transform.position.x += cameraSpeed;
        }
        else if (app.keyboard.isKeysDown(KeyCode.ArrowUp))
        {
            camera.transform.position.y -= cameraSpeed;
        }
        else if (app.keyboard.isKeysDown(KeyCode.ArrowDown))
        {
            camera.transform.position.y += cameraSpeed;
        }

        camera.compute();
    }
}

for (let i: number = 0; i < 1; ++i)
{
    const rose: Entity = app.world.spawn(new Entity("rose"), Vector3.zero(), Quaternion.identity());
    rose.isStatic = true;
    rose.addComponent(new RoseComponent(app));
}