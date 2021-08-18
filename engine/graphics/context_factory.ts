import { Canvas } from '../application';
import API from './api';
import { CanvasContext } from './canvas';
import Context from './context';
import { GLContext } from './webgl';

export default class ContextFactory
{
    public static get(canvas: Canvas, api: API): Context
    {
        switch (api)
        {
            case API.Canvas: return new CanvasContext(canvas);
            case API.WebGL: return new GLContext(canvas);
            default:
                return null;
        }
    }
}