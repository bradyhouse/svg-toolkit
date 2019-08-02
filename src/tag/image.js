import Base from '../core/base';

/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) circle,
 * "<image>", tag.  For additional info,
 * see [MDN ... Image](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image).
 *
 */
export default class Image extends Base {

  config() {
    return {
      id: 'img1',
      width: '100%',
      height: '100%',
      xlinkHref: '',
      xmlns: Util.xmlNamespaces().xmlns,
      hook: null,
      docElementNS: null,
      autoBind: false,
      x: '0',
      y: '0',
      opacity: 1,
      children: [],
      onclick: null
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
   * Method used to append the docElement to
   * configured hook element.
   */
  bind() {
    if (this.hook && this.docElementNS) {
      this.hook.appendChild(this.docElementNS);
    }
  }

  /**
   * Method called by the constructor to create
   * and assign docElement based
   * on the properties exposed by the class.
   *
   * Note - if the autoBind flag is true,
   * then it ends by invoking bind method.
   */
  init() {
    this.docElementNS = document.createElementNS(this.xmlns, 'image');
    this.docElementNS.setAttribute('id', this.id);
    this.docElementNS.setAttribute('xlink:href', this.xlinkHref);
    this.docElementNS.setAttribute('width', this.width);
    this.docElementNS.setAttribute('height', this.height);
    this.docElementNS.setAttribute('x', this.x);
    this.docElementNS.setAttribute('y', this.y);
    this.docElementNS.setAttribute('opacity', this.opacity)
    if (this.onclick) {
      this.docElementNS.setAttribute('onclick', this.onclick);
    }
    if (this.children && this.children.length) {
      this.children.map((child) => {
        child.parent = this;
        if (child.docElementNS) {
          this.docElementNS.appendChild(child.docElementNS);
        }
      });
    }

    if (this.autoBind) {
      this.bind();
    }
  }

}
