import { EventTracker, ICommand, ClickEventObserver } from "../Conditionals/EventObserver"; //This is I think where the basic problem of the addEventListeners method comes from is the idea that we shouldn't in the component necessarilt need to know what the addEventListeners is doing that should be in an additional object to sort that so that we can just keep the StartPageEventListener class in this page or import a generic EventListener handler object???
import { IComponent, IComponentRemovable, IComponentEventListener, IComponentInteractive } from "../Conditionals/HTMLComponents";
import { PageState, PageStateManager } from "../Conditionals/PageState";
import { ScreenFactory, ScreenTemplate } from "../Conditionals/Screens";

import { HomeTraverseComponent, ContactTraverseComponent } from "./StaticEventButtons";



export class MenuScreenFactory extends ScreenFactory {
    
    create(): ScreenTemplate {
        return new MenuScreen(this.stateManager, this.eventTracker);
    }
}




class MenuScreen extends ScreenTemplate {
    private menuComponent: IComponentRemovable;
    private menuItemsComponent: IComponentRemovable;

    private homeTraverseButton: IComponentEventListener;
    private contactTraverseButton: IComponentEventListener;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        super(stateManager, eventTracker);

        this.menuComponent = new MenuHeaderComponent();
        this.menuItemsComponent = new MenuItemsComponent();
        

        this.homeTraverseButton = new HomeTraverseComponent(this.eventTracker);
        this.contactTraverseButton = new ContactTraverseComponent(this.eventTracker);

        this.components = [this.menuComponent, this.menuItemsComponent];
        this.componentsEvent = [this.homeTraverseButton, this.contactTraverseButton];
        this.componentsRemovable = [this.menuComponent, this.menuItemsComponent];
    }
}




export class MenuPage implements PageState {
    private screenFactory: ScreenFactory;
    private screenTemplate!: ScreenTemplate;

    private menuButton: HTMLElement;
    private content: HTMLElement;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.screenFactory = new MenuScreenFactory(stateManager, eventTracker);
    
        this.menuButton = document.getElementById("menu-button")!;
        this.content = document.getElementById("content")!;
    }

    load(): void {
        this.menuButton.classList.add("current-page");
        this.content.classList.add("menu-page");

        this.screenTemplate = this.screenFactory.instantiate();
    }

    exit(): void {
        this.menuButton.classList.remove("current-page");
        this.content.classList.remove("menu-page");

        this.screenTemplate.remove();
        this.screenTemplate.removeEventListeners();
    }
}



export class MenuHeaderComponent implements IComponentRemovable {
    private menuButton: HTMLElement;

    constructor() {
        this.menuButton = document.getElementById("menu-header-container")!;
    }

    render(): void {
        this.menuButton.style.display = "flex";
    }

    removeElem(): void {
        this.menuButton.style.display = "none";
    }

    getHTML(): HTMLElement {
        return this.menuButton;
    }
}



export class MenuItemsComponent implements IComponentRemovable {
    private menuItemsComponent: HTMLElement;

    constructor() {
        this.menuItemsComponent = document.getElementById("menu-items-container")!;
    }

    render(): void {
        this.menuItemsComponent.style.display = "flex";
    }

    removeElem(): void {
        this.menuItemsComponent.style.display = "none";
    }

    getHTML(): HTMLElement {
        return this.menuItemsComponent;
    }
}