/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) text,
 * "<text>", tag.  This tag
 * is used to add text blocks on
 * screen. For additional info
 * refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text).
 */
export default class Text {

    /**
     * Static config method. Object returned defines the default properties of the class. This
     * also defines the properties that may be passed to the class constructor.
     *
     * @returns {{id: string, x: number, y: number, xmlns: string, hook: null, autoBind: boolean, text: string, onMouseOver: string, onMouseOut: string, onMouseDown: string, onClick: string}}
     */
    config() {
        return {
            id: 'text1',
            x: 0,
            y: 0,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            cursor: null,
            text: null,
            style: null,
            fontFamily: null,
            fontSize: null,
            children: [],
            onMouseOver: null,
            onMouseOut: null,
            onMouseDown: null,
            onClick: null,
            textAlign: 'start'
        }
    }

     /**
     * Class constructor.
     *
     * @param config
     */
    constructor(config) {
        super();
        if (config) {
        this.apply(this, config, this.config());
        }
        this.init();
    }

    /**
     * Document element object.  This property is populated
     * during init using the document.createElementNS()
     * method.
     *
     * @returns {object}
     */
    get docElementNS() {
        return this._docElementNS;
    }

    get id() {
        return this._id;
    }

    get xmlns() {
        return this._xmlns;
    }

    get hook() {
        return this._hook;
    }

    get autoBind() {
        return this._autoBind;
    }

    get onMouseOut() {
        return this._onMouseOut;
    }

    get onMouseDown() {
        return this._onMouseDown;
    }

    get onMouseOver() {
        return this._onMouseOver;
    }

    get onClick() {
        return this._onClick;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get text() {
        return this._text;
    }

    get fontSize() {
        return this._fontSize;
    }

    get fontFamily() {
        return this._fontFamily;
    }

    /**
     * Getter used to access the optional "style" tag attribute.
     * @returns {*}
     */
    get style() {
        return this._style;
    }

    get cursor() {
        return this._cursor;
    }

    get textAlign() {
        return this._textAlign;
    }

    /**
     * Getter for children objects.
     * @returns {*}
     */
    get children() {
        return this._children;
    }

    init() {
        var docElement = document.createElementNS(this.xmlns, 'text'),
            textNode = this.text ? document.createTextNode(this.text) : null,
            style = 'text-anchor: ' + this.textAlign + ';';

        if (this.id) {
            docElement.setAttribute('id', this.id);
        }

        if (this.onMouseOut) {
            docElement.setAttribute('onmouseout', this.onMouseOut);
        }

        if (this.onMouseDown) {
            docElement.setAttribute('onmousedown', this.onMouseDown);
        }

        if (this.onMouseOver) {
            docElement.setAttribute('onmouseover', this.onMouseOver);
        }

        if (this.onClick) {
            docElement.setAttribute('onclick', this.onClick);
        }

        if (this.cursor) {
            style += ' cursor: ' + this.cursor + ';'
        }

        if (this.style) {
            style += ' ' + this.style;
        }


        docElement.setAttribute('style', style);
        docElement.setAttribute('x', this.x);
        docElement.setAttribute('y', this.y);

        if(this.fontFamily) {
            docElement.setAttribute('font-family', this.fontFamily);
        } else {
            docElement.setAttribute('font-family', "arial");
        }

        if (this.fontSize) {
            docElement.setAttribute('font-size', this.fontSize);
        } else {
            docElement.setAttribute('font-size', '12');
        }


        if (textNode) {
            docElement.appendChild(textNode);
        }

        this._docElementNS = docElement;

        if (this.children.length > 0) {
            for (var i=0 ; i < this.children.length; i++) {
                var child = this.children[i];
                if (child.docElementNS) {
                    this.docElementNS.appendChild(child.docElementNS);
                }
            }
        }

        if (this.autoBind) {
            this.bind();
        }
    }

    bind() {
        if (this.hook) {
            this.hook.appendChild(this.docElementNS);
        }
    }

}
