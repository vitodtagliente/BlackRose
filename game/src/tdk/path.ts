import * as BlackRose from "blackrose";

export default class Path extends BlackRose.Scene.Entity
{
    private _steps: Array<BlackRose.Math.Vector3>;

    public constructor(name?: string)
    {
        super(name);
        this._steps = [];
    }

    public get steps(): Array<BlackRose.Math.Vector3> { return this._steps; }
    
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