import * as BlackRose from 'blackrose';
import { Color, Context } from 'blackrose/graphics';
import { CanvasContext } from 'blackrose/graphics/canvas';
import { Transform, Vector3 } from 'blackrose/math';
import { Component, Entity } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.context.clear("cyan");

class BallComponent extends Component
{
    private _context: Context;
    private readonly _radius = 6;
    private readonly _color: Color;

    public constructor(context: Context)
    {
        super();
        this._context = context;
        this._color = new Color(1, 0, 0, 0);
    }

    public _init(): void 
    {
        console.log("initializing the ball");
    }

    public update(deltaTime: number): void 
    {
        const ctx: CanvasContext = this._context as CanvasContext;
        const position: Vector3 = this.owner.transform.position;
        ctx.context.beginPath();
        ctx.context.arc(position.x, position.y, this._radius, 0, 2 * Math.PI, false);
        ctx.context.fillStyle = 'red';
        ctx.context.closePath();

        console.log(`drawing circle at position ${position.x}:${position.y}`);
    }
}

const ball: Entity = app.world.spawn(new Entity("ball"), new Transform);
ball.addComponent(new BallComponent(app.context));