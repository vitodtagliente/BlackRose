import Buffer, { BufferUsageMode } from "./buffer";

export default abstract class IndexBuffer extends Buffer
{
    public constructor(size: number, mode: BufferUsageMode)
    {
        super(size, mode);
    }
}