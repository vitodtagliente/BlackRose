import * as BlackRose from "blackrose";

export default class Widget
{
    private _widget: HTMLDivElement;
    private _list: HTMLUListElement;

    public constructor()
    {
        this._widget = document.createElement("div") as HTMLDivElement;
        this._widget.id = "sceneview";
        this._widget.setAttribute("style", "position: absolute; top: 50px; left: 0px; width: 160px; background-color: black; color: white;");

        let title = document.createElement("p");
        title.appendChild(document.createTextNode("SceneView"));
        title.setAttribute("style", "border-bottom: 1px solid #2c2c2c; padding: 4px; margin: 0;");
        this._widget.appendChild(title);

        this._list = document.createElement("ul") as HTMLUListElement;
        this._list.setAttribute("style", "list-style-type: none; list-style: none; margin: 0; padding: 0; width: 100%; clear: both;");
        this._widget.appendChild(this._list);

        document.body.appendChild(this._widget);
    }

    public open(world: BlackRose.Scene.World)
    {
        world.onEntitySpawn.on((entity: BlackRose.Scene.Entity) =>
        {
            const li: HTMLLIElement = document.createElement("li") as HTMLLIElement;
            li.id = "sceneview-" + entity.id;
            li.setAttribute("style", "background: #1a1a1a; border-bottom: 1px solid #2c2c2c; padding: 2px 5px 2px 5px;");
            li.appendChild(document.createTextNode(entity.name));
            this._list.appendChild(li);
        });

        world.onEntityDestroy.on((entity: BlackRose.Scene.Entity) =>
        {
            const li: HTMLElement = document.getElementById("sceneview-" + entity.id);
            if (li)
            {
                li.remove();
            }
        });
    }
}