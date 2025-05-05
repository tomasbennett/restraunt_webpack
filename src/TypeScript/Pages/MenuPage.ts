import { EventTracker, ICommand, ClickEventObserver } from "../Conditionals/EventObserver"; //This is I think where the basic problem of the addEventListeners method comes from is the idea that we shouldn't in the component necessarilt need to know what the addEventListeners is doing that should be in an additional object to sort that so that we can just keep the StartPageEventListener class in this page or import a generic EventListener handler object???
import { IComponent, IComponentRemovable, IComponentEventListener, IComponentInteractive } from "../Conditionals/HTMLComponents";
import { PageState, PageStateManager } from "../Conditionals/PageState";
import { ScreenFactory, ScreenTemplate } from "../Conditionals/Screens";



export class MenuScreenFactory extends ScreenFactory {
    
    create(): ScreenTemplate {
        return new MenuScreen(this.stateManager, this.eventTracker);
    }
}




class MenuScreen extends ScreenTemplate {
    private menuComponent: IComponentRemovable;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        super(stateManager, eventTracker);

        this.menuComponent = new MenuComponent();

        this.components = [this.menuComponent];
        this.componentsRemovable = [this.menuComponent];
    }
}




export class MenuPage implements PageState {
    private screenFactory: ScreenFactory;
    private screenTemplate!: ScreenTemplate;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.screenFactory = new MenuScreenFactory(stateManager, eventTracker);
    }

    load(): void {
        this.screenTemplate = this.screenFactory.instantiate();
    }

    exit(): void {
        this.screenTemplate.remove();
    }
}



export class MenuComponent implements IComponentRemovable {
    private menuButton: HTMLDivElement;

    constructor() {
        this.menuButton = document.createElement("div");
        this.menuButton.textContent = "This is Menu Page!!!!xxxxxxxx";
    }

    render(): void {
        document.body.appendChild(this.menuButton);
    }

    removeElem(): void {
        this.menuButton.remove();
    }

    getHTML(): HTMLElement {
        return this.menuButton;
    }
}