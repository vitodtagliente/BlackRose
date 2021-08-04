import { API } from './api';
import * as Canvas from './canvas/canvas';
import Context from './context';

export default class ContextFactory
{
    public static get(canvas: HTMLCanvasElement, api: API): Context
    {
        switch (api)
        {
            case API.Canvas: return new Canvas.CanvasContext(canvas);
            case API.WebGL:
            default:
                return null;
        }
    }
}