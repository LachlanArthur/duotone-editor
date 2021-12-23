import '@github/clipboard-copy-element';

import Alpine from 'alpinejs';
import { createFlatObjectFromClass } from './alpineApp';
import Editor from './editor';

Alpine.data( 'editor', () => createFlatObjectFromClass( Editor ) );

Alpine.start();
