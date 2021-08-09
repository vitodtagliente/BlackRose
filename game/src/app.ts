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

    private goRight: boolean = true;

    public constructor(app: Application)
    {
        super(app);
        this._context = app.context as CanvasContext;
        this._color = Color.red;
    }

    public _init(): void 
    {
        this.owner.transform.position.y = this.app.canvas.height / 2 - this._radius;
        console.log("initializing the ball");
    }

    public update(deltaTime: number): void 
    {
        const speed: number = this.app.canvas.width / 180;
        if (this.goRight && this.owner.transform.position.x > this.app.canvas.width - this._radius / 2)
        {
            this.goRight = false;
        }
        else if (!this.goRight && this.owner.transform.position.x < this._radius / 2)
        {
            this.goRight = true;
        }

        this.owner.transform.position.y = this.app.canvas.height / 2 - this._radius;
        this.owner.transform.position.x += speed * (this.goRight ? 1 : -1);

        this.app.renderer.drawCircle(this.owner.transform.position, this._radius, this._color);

        // double buffering
        this.app.renderer.clear(Color.white);
    }
}

const ball: Entity = app.world.spawn(new Entity("ball"), new Transform);
ball.addComponent(new BallComponent(app));