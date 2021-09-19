import * as BlackRose from "blackrose";
import { Color, Renderer } from "blackrose/graphics";

export default class Path extends BlackRose.Scene.Entity
{
    public color: Color;
    private _steps: Array<BlackRose.Math.Vector3>;

    public constructor(name?: string, color: Color = Color.red())
    {
        super(name);
        this._steps = [];
        this.color = color;
    }

    public get steps(): Array<BlackRose.Math.Vector3> { return this._steps; }

    public render(renderer: Renderer): void
    {
        super.render(renderer);

        for (let i: number = 0; i < this.steps.length - 1; ++i)
        {
            renderer.gizmos.line(this._steps[i], this._steps[i + 1], this.color);
            if (i == 0)
            {
                renderer.gizmos.circle(this._steps[i], .2, this.color);
            }
            else if (i == this._steps.length - 2)
            {
                renderer.gizmos.circle(this._steps[i + 1], .2, this.color);
            }
        }
    }

    public push(position: BlackRose.Math.Vector3): void 
    {
        this._steps.push(position);
    }

    public static findOrRandom(world: BlackRose.Scene.World, name: string): Path 
    {
        const paths: Array<Path> = world.findEntities(Path);
        if (paths.length == 0)
            return null;

        for (const path of paths)
        {
            if (path.name == name)
                return path;
        }

        const index: number = Math.floor(BlackRose.Math.random(0, paths.length));
        return paths[index];
    }
}