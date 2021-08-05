import * as BlackRose from 'blackrose';

const app = new BlackRose.Application.Application('mycanvas', BlackRose.Graphics.API.Canvas);
app.canvas.fullscreen();
app.context.clear("cyan");