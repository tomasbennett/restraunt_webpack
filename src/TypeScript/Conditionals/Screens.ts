import { EventTracker, ICommand, ClickEventObserver } from "./EventObserver";
import { IComponent, IComponentRemovable, IComponentEventListener, IComponentInteractive } from "./HTMLComponents";
import { PageStateManager } from "./PageState";

export class ScreenTemplate {
    protected components: IComponent[] = [];
    protected componentsRemovable: IComponentRemovable[] = [];
    protected componentsEvent: IComponentEventListener[] = [];

    protected stateManager: PageStateManager;
    protected eventTracker: EventTracker;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.stateManager = stateManager;
        this.eventTracker = eventTracker;
    }

    screenComponents(): IComponent[] {
        return this.components;
    }

    screenComponentsRemovable(): IComponentRemovable[] {
        return this.componentsRemovable;
    }

    screenComponentsEvent(): IComponentEventListener[] {
        return this.componentsEvent;
    }

    render(): void {
        this.components.forEach((elem) => {elem.render()});
    }

    remove(): void {
        this.componentsRemovable.forEach((elem) => {elem.removeElem()});
    }

    addEventListeners(): void {
        this.componentsEvent.forEach((elem) => {elem.addEventListeners(this.stateManager)});
    }

    removeEventListeners(): void {
        this.componentsEvent.forEach((elem) => {elem.removeEventListeners()});
    }
}



export abstract class ScreenFactory {
    protected stateManager: PageStateManager;
    protected eventTracker: EventTracker;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.stateManager = stateManager;
        this.eventTracker = eventTracker;
    }

    instantiate(): ScreenTemplate {
        const screen: ScreenTemplate = this.create();
        screen.render();
        screen.addEventListeners();
        return screen;
    }

    abstract create(): ScreenTemplate;
}




