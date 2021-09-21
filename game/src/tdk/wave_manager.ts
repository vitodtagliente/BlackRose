import * as BlackRose from "blackrose";
import { Timer } from "blackrose/core";
import { World } from "blackrose/scene";
import { Wave } from ".";

export default class WaveManager extends BlackRose.Scene.Entity
{
    private _active: boolean;
    private _waves: Array<Wave>;
    private _waveIndex: number = 0
    private _timer: Timer;

    public constructor(name?: string)
    {
        super(name);
        this._active = false;
        this._waves = [];
        this._waveIndex = 0;
        this._timer = new Timer(0);
    }

    public get active(): boolean { return this._active; }
    public get waves(): Array<Wave> { return this._waves; }
    public get waveIndex(): number { return this._waveIndex; }
    public get currentWave(): Wave
    {
        if (this._waveIndex < this._waves.length)
            return this._waves[this._waveIndex];
        return null;
    }
    public get completed(): boolean { return this._waveIndex >= this._waves.length; }

    public push(wave: Wave): void 
    {
        this._waves.push(wave);
    }

    public update(world: World, deltaTime: number): void 
    {
        super.update(world, deltaTime);

        if (this._active && !this.completed)
        {
            this._timer.tick(deltaTime);
            if (this._timer.isExpired)
            {
                this._waveIndex++;
                const nextWave: Wave = this.currentWave;
                if (nextWave)
                {
                    this._timer.configure(nextWave.duration);
                    this._spawnWave(nextWave);
                }
            }
        }
    }

    public start(): void
    {
        this._active = true;
        this._waveIndex = 0;
        const firstWave: Wave = this.currentWave;
        if (firstWave)
        {
            this._timer.configure(firstWave.duration);
            this._spawnWave(firstWave);
        }
    }

    private _spawnWave(wave: Wave): void 
    {

    }
}