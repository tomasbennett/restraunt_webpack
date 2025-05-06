import { EventTracker, ICommand, ClickEventObserver } from "../Conditionals/EventObserver"; //This is I think where the basic problem of the addEventListeners method comes from is the idea that we shouldn't in the component necessarilt need to know what the addEventListeners is doing that should be in an additional object to sort that so that we can just keep the StartPageEventListener class in this page or import a generic EventListener handler object???
import { IComponent, IComponentRemovable, IComponentEventListener, IComponentInteractive } from "../Conditionals/HTMLComponents";
import { PageState, PageStateManager } from "../Conditionals/PageState";
import { ScreenFactory, ScreenTemplate } from "../Conditionals/Screens";

import { HomeTraverseComponent, MenuTraverseComponent } from "./StaticEventButtons";


export class ContactScreenFactory extends ScreenFactory {
    
    create(): ScreenTemplate {
        return new ContactScreen(this.stateManager, this.eventTracker);
    }
}




class ContactScreen extends ScreenTemplate {
    private contactComponent: IComponentRemovable;
    private contactContainerComponent: IComponentRemovable;

    private homeTraverseButton: IComponentEventListener;
    private menuTraverseButton: IComponentEventListener;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        super(stateManager, eventTracker);

        this.contactComponent = new ContactTitleComponent();
        this.contactContainerComponent = new ContactContainerComponent();

        this.homeTraverseButton = new HomeTraverseComponent(this.eventTracker);
        this.menuTraverseButton = new MenuTraverseComponent(this.eventTracker);

        this.components = [this.contactComponent, this.contactContainerComponent];
        this.componentsEvent = [this.homeTraverseButton, this.menuTraverseButton]
        this.componentsRemovable = [this.contactComponent, this.contactContainerComponent];
    }
}




export class ContactPage implements PageState {
    private screenFactory: ScreenFactory;
    private screenTemplate!: ScreenTemplate;

    private contactButton: HTMLElement;
    private content: HTMLElement;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.screenFactory = new ContactScreenFactory(stateManager, eventTracker);
    
        this.contactButton = document.getElementById("contacts-button")!;
        this.content = document.getElementById("content")!;
    }

    load(): void {
        this.contactButton.classList.add("current-page");
        this.content.classList.add("contact-page");

        this.screenTemplate = this.screenFactory.instantiate();
    }

    exit(): void {
        this.contactButton.classList.remove("current-page");
        this.content.classList.remove("contact-page");
        

        this.screenTemplate.remove();
        this.screenTemplate.removeEventListeners();
    }
}



export class ContactTitleComponent implements IComponentRemovable {
    private contactButton: HTMLElement;

    constructor() {
        this.contactButton = document.getElementById("contact-page-header")!;
    }

    render(): void {
        this.contactButton.style.display = "flex";
    }

    removeElem(): void {
        this.contactButton.style.display = "none";
    }

    getHTML(): HTMLElement {
        return this.contactButton;
    }
}


export class ContactContainerComponent implements IComponentRemovable {
    private contactButton: HTMLElement;

    constructor() {
        this.contactButton = document.getElementById("contact-container")!;
    }

    render(): void {
        this.contactButton.style.display = "grid";
    }

    removeElem(): void {
        this.contactButton.style.display = "none";
    }

    getHTML(): HTMLElement {
        return this.contactButton;
    }
}