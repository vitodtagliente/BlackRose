import * as BlackRose from 'blackrose';
import { Application } from 'blackrose/application';
import { Color } from 'blackrose/graphics';
import { CanvasContext } from 'blackrose/graphics/canvas';
import { Transform, Vector3 } from 'blackrose/math';
import { Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.canvas.onResize = () =>
{
    app.context.clear(Color.green);
    console.log('resize');
};
app.renderer.clear(Color.cyan);
app.run();

class BallComponent extends Component
{
    private _context: CanvasContext;
    private readonly _radius = 30;
    private readonly _color: Color;

    public constructor(app: Application)
    {
        super(app);
        this._context = app.context as CanvasContext;
        this._color = Color.red;
    }

    public _init(): void 
    {
        console.log("initializing the ball");
    }

    public update(deltaTime: number): void 
    {
        const position: Vector3 = this.owner.transform.position;
        this._context.context.beginPath();
        this._context.context.arc(position.x, position.y, this._radius, 0, 2 * Math.PI, false);
        this._context.context.fillStyle = this._color.name;
        this._context.context.fill();
    }
}

const ball: Entity = app.world.spawn(new Entity("ball"), new Transform);
ball.addComponent(new BallComponent(app));