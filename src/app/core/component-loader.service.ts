import {
  Injectable,
  NgModuleFactoryLoader,
  Injector,
  NgModuleFactory,
  Type,
  Compiler
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  private componentRegistry = {
    'app-user-list': {
      modulePath: () =>
        import('../users/users.module').then(m => m.UsersModule),
      moduleRef: null
    }
  };

  constructor(private compiler: Compiler, private injector: Injector) {}

  loadComponent(componentTag: string): Promise<HTMLElement> {
    const cmpRegistryEntry = this.componentRegistry[componentTag];
    if (!cmpRegistryEntry) {
      throw new Error(
        `Unrecognized component "${componentTag}". Make sure it is registered in the component registry`
      );
    }

    if (cmpRegistryEntry.moduleRef) {
      return new Promise(resolve => {
        const componentInstance = document.createElement(componentTag);
        resolve(componentInstance);
      });
    } else {
      const path = cmpRegistryEntry.modulePath;

      return new Promise((resolve, reject) => {
        (path() as Promise<NgModuleFactory<any> | Type<any>>)
          .then(elementModuleOrFactory => {
            if (elementModuleOrFactory instanceof NgModuleFactory) {
              // if ViewEngine
              return elementModuleOrFactory;
            } else {
              try {
                // if Ivy
                return this.compiler.compileModuleAsync(elementModuleOrFactory);
              } catch (err) {
                throw err;
              }
            }
          })
          .then(moduleFactory => {
            const moduleRef = moduleFactory.create(this.injector).instance;
            cmpRegistryEntry.moduleRef = moduleRef;

            // instantiate the component
            const componentInstance = document.createElement(componentTag);
            resolve(componentInstance);
          })
          .catch(err => {
            console.error('error loading module', err);
            reject(err);
          });
      });
    }
  }
}
