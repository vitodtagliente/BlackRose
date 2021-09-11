import *  as BlackRose from "blackrose";
import * as SceneView from "./sceneview";

export default class Editor
{
    private _app: BlackRose.Application.Application;
    private _sceneView: SceneView.Widget;

    public constructor()
    {
        this._sceneView = new SceneView.Widget();
    }

    public open(app: BlackRose.Application.Application): void 
    {
        this._app = app;
        this._sceneView.open(app.world);
    }
}