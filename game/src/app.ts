import * as BlackRose from 'blackrose';
import { Transform } from 'blackrose/math';
import { Entity, World } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.context.clear("cyan");

let world: World = new World('test');
const ball: Entity = world.spawn(new Entity("ball"), new Transform);