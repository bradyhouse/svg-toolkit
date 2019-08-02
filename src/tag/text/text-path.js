
/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) text path,
 * "<textpath>", tag.  This tag
 * is used to add text blocks on
 * screen.
 */
export default class TextPath {

    config() {
        return {
            id: 'textpath1',
            link: null,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            cursor: null,
            text: '&nbsp;'
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

    get text() {
        return this._text;
    }

    get cursor() {
        return this._cursor;
    }

    get link() {
        return this._link;
    }

    init() {
        var docElement = document.createElementNS(this.xmlns, 'textPath'),
            textNode = this.text ? document.createTextNode(this.text) : null;

        if (this.id) {
            docElement.setAttribute('id', this.id);
        }

        if (this.cursor) {
            style += ' cursor: ' + this.cursor + ';'
        }

        if (this.link) {
            docElement.setAttributeNS(Util.xmlNamespaces().xmlnsXLink, 'href', this.link);
        }

        if (textNode) {
            docElement.appendChild(textNode);
        }

        this._docElementNS = docElement;

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
