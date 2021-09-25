import * as BlackRose from 'blackrose';
import { serializable } from 'blackrose/core';

@serializable
export default class Pawn extends BlackRose.Scene.Entity
{
    public constructor(name?: string)
    {
        super();
    }

    
}