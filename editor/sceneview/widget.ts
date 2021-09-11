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

        let title = document.createElement("label");
        title.appendChild(document.createTextNode("SceneView"));
        title.setAttribute("style", "");
        this._widget.appendChild(title);

        this._list = document.createElement("ul") as HTMLUListElement;
        this._list.setAttribute("style", "list-style-type: none;");
        this._widget.appendChild(this._list);

        document.body.appendChild(this._widget);
    }

    public open(world: BlackRose.Scene.World)
    {
        world.onEntitySpawn.on((entity: BlackRose.Scene.Entity) =>
        {
            const li: HTMLLIElement = document.createElement("li") as HTMLLIElement;
            li.id = "sceneview-" + entity.id;
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