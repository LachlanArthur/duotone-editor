import './index.css';
import '@github/clipboard-copy-element';

import Alpine from 'alpinejs';
import { createFlatObjectFromClass } from './alpineApp';
import CopyButton from './copyButton';
import Editor from './editor';

Alpine.data( 'editor', () => createFlatObjectFromClass( Editor ) );
Alpine.data( 'copyButton', () => createFlatObjectFromClass( CopyButton ) );

Alpine.start();
