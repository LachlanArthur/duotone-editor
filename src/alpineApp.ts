export interface AlpineApp<
  Class,
  Refs extends Record<string, HTMLElement> = Record<string, HTMLElement>
  > {
  $el: HTMLElement
  $root: HTMLElement
  $refs: Refs
  $data: { [ P in keyof Class ]: Class[ P ] }
  $watch<Prop extends keyof Class>( property: Prop, listener: <Value extends Class[ Prop ]>( value?: Value, oldValue?: Value ) => void ): void
  $nextTick( callback: () => void ): void
  $dispatch( event: string, detail?: any ): void
  $id( id: string, key?: string | number ): string
}

export abstract class AlpineApp<Class, Refs> { }

export function createFlatObjectFromClass<T, O extends { [P in keyof T]: T[P] }>( classObject: ( new ( ...args: any ) => T ), ...constructorArgs: any ): O {
  const instance = classObject.prototype.__proto__ ? createFlatObjectFromClass( classObject.prototype.__proto__.constructor ) : {};

  Object.defineProperties( instance, Object.getOwnPropertyDescriptors( classObject.prototype ) );
  Object.defineProperties( instance, Object.getOwnPropertyDescriptors( new classObject( ...constructorArgs ) ) );

  return instance as O;
}
