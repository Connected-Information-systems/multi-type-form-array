import { ComponentFactoryResolver, Directive, Injector, Input, ViewContainerRef } from '@angular/core';
import { KeyValue } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { PortalInjector } from '@angular/cdk/portal';
import { MT_ELEMENT_FORM, MultiTypeElement } from '../types/multi-type-element/multi-type-element';

@Directive({
    selector: '[formArrayHost]',
})
export class FormArrayHostDirective {

    @Input()
    set multiTypeElement(multiTypeElement: KeyValue<AbstractControl, MultiTypeElement>) {
        this.constructComponent(multiTypeElement);
    }

    constructor(
        private _injector: Injector,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    private constructComponent(multiTypeElement: KeyValue<AbstractControl, MultiTypeElement>) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(multiTypeElement.value.componentType);
        const injector = this.getInjector(multiTypeElement);
        this.viewContainerRef.clear();
        const component = this.viewContainerRef.createComponent(componentFactory, 0, injector);
        component.changeDetectorRef.detectChanges();
    }

    private getInjector(multiTypeElement: KeyValue<AbstractControl, MultiTypeElement>): Injector {
        const injectionTokens = this.getInjectionTokens(multiTypeElement);
        return new PortalInjector(this._injector, injectionTokens);
    }

    private getInjectionTokens(multiTypeElement: KeyValue<AbstractControl, MultiTypeElement>): WeakMap<any, any> {
        return new WeakMap<any, any>([
            [ MT_ELEMENT_FORM, multiTypeElement.key ]
        ]);
    }
}
