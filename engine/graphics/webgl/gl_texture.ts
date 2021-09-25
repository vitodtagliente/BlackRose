import { Image } from "../../asset";
import Texture from "../texture";

export default class GLTexture extends Texture
{
    private _id: WebGLTexture;
    private _context: WebGL2RenderingContext;

    public constructor(context: WebGL2RenderingContext, image: Image)
    {
        super(image);
        this._context = context;

        this._id = context.createTexture();

        // make unit 0 the active texture unit
        // (i.e, the unit all other texture commands will affect.)
        context.activeTexture(context.TEXTURE0 + 0);

        // Bind texture to 'texture unit '0' 2D bind point
        context.bindTexture(context.TEXTURE_2D, this._id);

        // Set the parameters so we don't need mips and so we're not filtering
        // and we don't repeat
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.REPEAT);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.REPEAT);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);

        // Upload the image into the texture.
        const mipLevel: number = 0;               // the largest mip
        const internalFormat: number = context.RGBA;   // format we want in the texture
        const srcFormat: number = context.RGBA;        // format of data we are supplying
        const srcType: number = context.UNSIGNED_BYTE  // type of data we are supplying
        context.texImage2D(context.TEXTURE_2D,
            mipLevel,
            internalFormat,
            srcFormat,
            srcType,
            image.data
        );
    }

    public bind(slot: number = 0): void
    {
        // make unit 0 the active texture unit
        // (i.e, the unit all other texture commands will affect.)
        this._context.activeTexture(this._context.TEXTURE0 + 0);
        // Bind texture to 'texture unit '0' 2D bind point
        this._context.bindTexture(this._context.TEXTURE_2D, this._id);
    }

    public free(): void
    {
        this._context.deleteTexture(this._id);
    }
}