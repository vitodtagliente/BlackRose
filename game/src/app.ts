import * as BlackRose from 'blackrose';
import { World } from 'blackrose/scene';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.context.clear("cyan");

let world: World = new World('test');