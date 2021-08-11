import * as dat from 'dat.gui';
import { Color } from '../graphics';
import { Transform, Vector3 } from '../math';
import { Entity } from '../scene';

export default class Section
{
    private _context: dat.GUI;
    private _sections: Map<string, Section>;

    public constructor(context: dat.GUI)
    {
        this._context = context;
        this._sections = new Map<string, Section>();
    }

    public addSubSection(name: string): Section 
    {
        const section: Section = new Section(this._context.addFolder(name));
        this._sections.set(name, section);
        return section;
    }

    public findSubSection(name: string): Section
    {
        return this._sections.get(name);
    }

    public transform(name: string, transform: Transform): Section
    {
        this.vector3(`${name}-position`, transform.position);
        this.vector3(`${name}-rotation`, transform.rotation);
        this.vector3(`${name}-scale`, transform.scale);
        return this;
    }

    public vector3(name: string, vector: Vector3): Section 
    {
        this._context.add(vector, 'x').name(`${name}-x`);
        this._context.add(vector, 'y').name(`${name}-y`);
        this._context.add(vector, 'z').name(`${name}-z`);
        return this;
    }

    public color(name: string, color: Color): Section 
    {
        this._context.addColor(color, 'rgba').name(name);
        return this;
    }

    public entity(name: string, entity: Entity): Section 
    {
        this.addSubSection(name)
            .addSubSection('transform').transform(name, entity.transform);

        return this;
    }
}