import * as dat from 'dat.gui';
import Section from './section';

export default class Inspector
{
    private _context: dat.GUI;
    private _sections: Map<string, Section>;

    public constructor()
    {
        this._context = new dat.GUI();
        this._sections = new Map<string, Section>();
        this.addSection('engine');
    }

    public get context(): dat.GUI { return this._context; }
    public get engine(): Section { return this.findSection('engine'); }

    public addSection(name: string): Section 
    {
        const section: Section = new Section(this.context.addFolder(name));
        this._sections.set(name, section);
        return section;
    }

    public findSection(name: string): Section
    {
        return this._sections.get(name);
    }
}