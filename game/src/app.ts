import * as BlackRose from 'blackrose';

const engine: BlackRose.Engine = new BlackRose.Engine('mycanvas', BlackRose.Graphics.GraphicsApi.Canvas);
engine.device.resize(300, 100);
engine.device.context.clear("cyan");