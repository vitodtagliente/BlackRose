// a Serializable class has a no-arg constructor and an instance property
// named className
type Serializable = new () => { readonly className: string }

// store a registry of Serializable classes
const registry: Record<string, Serializable> = {};

// a decorator that adds classes to the registry
export default function serializable<T extends Serializable>(constructor: T)
{
  const name: string = (new constructor()).className;
  registry[name] = constructor;
  return constructor;
}

// a custom JSON parser... if the parsed value has a className property
// and is in the registry, create a new instance of the class and copy
// the properties of the value into the new instance.
function reviver(k: string, v: any): any 
{
  if ((typeof v === "object") && ("className" in v) && (v.className in registry)) 
  {
    return Object.assign(new registry[v.className](), v);
  }
  return v;
}

// use this to deserialize JSON instead of plain JSON.parse        
export function deserialize(json: string): Object
{
  return JSON.parse(json, reviver);
}