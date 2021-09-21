import { Vector3 } from "blackrose/math";

export default class Wave
{
    public duration: number = 0;
    public perMinionSpawnDelay: number = 0;
    public numOfMinions: number = 0;
    public spawnPosition: Vector3 = Vector3.zero();
    public pathsToFollow: Array<string> = [];
}