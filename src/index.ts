import '@github/clipboard-copy-element';

import Alpine from 'alpinejs';
import Editor from './editor';

Alpine.data( 'editor', () => Editor.createAlpineData() );

Alpine.start();
