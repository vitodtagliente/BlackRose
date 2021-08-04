import * as BlackRose from 'blackrose';

const engine: BlackRose.Engine = new BlackRose.Engine('mycanvas', BlackRose.Graphics.API.Canvas);
engine.device.resize(300, 100);
engine.device.fullscreen();
engine.device.context.clear("cyan");