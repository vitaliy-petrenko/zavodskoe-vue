import WebFontLoader from 'webfontloader';
//common styles
import '../less/base.less';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500&subset=cyrillic-ext']
  }
});
