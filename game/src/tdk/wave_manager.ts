import * as BlackRose from "blackrose";
import { Application } from "blackrose/application";
import { AssetLibrary, AssetType, Image, Prefab } from "blackrose/asset";
import { SpriteRenderer } from "blackrose/components";
import { delay, serializable, Timer } from "blackrose/core";
import { Quaternion, Vector3 } from "blackrose/math";
import { World } from "blackrose/scene";
import { Minion, Wave } from ".";

@serializable
export default class WaveManager extends BlackRose.Scene.Entity
{
    private _active: boolean;
    private _waves: Array<Wave>;
    private _waveIndex: number = 0
    private _timer: Timer;

    public constructor(name?: string)
    {
        super();
        this._active = false;
        this._waves = [];
        this._waveIndex = -1;
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
    }

    private async _spawnWave(wave: Wave): Promise<void> 
    {
        console.log("spawning wave " + this.waveIndex);
        for (let i: number = 0; i < wave.numOfMinions; ++i)
        {
            if (wave.prefab == null) continue;

            let position: Vector3 = Vector3.zero();
            wave.spawnPosition.copy(position);
            Application.main.world.spawn(
                Minion.parse(wave.prefab.raw) as Minion,
                position,
                Quaternion.identity()
            );

            await delay(wave.perMinionSpawnDelay);
        }
    }
}