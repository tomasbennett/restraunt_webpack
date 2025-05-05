import { EventTracker, ICommand, ClickEventObserver } from "../Conditionals/EventObserver"; //This is I think where the basic problem of the addEventListeners method comes from is the idea that we shouldn't in the component necessarilt need to know what the addEventListeners is doing that should be in an additional object to sort that so that we can just keep the StartPageEventListener class in this page or import a generic EventListener handler object???
import { IComponent, IComponentRemovable, IComponentEventListener, IComponentInteractive } from "../Conditionals/HTMLComponents";
import { PageState, PageStateManager } from "../Conditionals/PageState";
import { ScreenFactory, ScreenTemplate } from "../Conditionals/Screens";



export class ContactScreenFactory extends ScreenFactory {
    
    create(): ScreenTemplate {
        return new ContactScreen(this.stateManager, this.eventTracker);
    }
}




class ContactScreen extends ScreenTemplate {
    private contactComponent: IComponentRemovable;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        super(stateManager, eventTracker);

        this.contactComponent = new ContactComponent();

        this.components = [this.contactComponent];
        this.componentsRemovable = [this.contactComponent];
    }
}




export class ContactPage implements PageState {
    private screenFactory: ScreenFactory;
    private screenTemplate!: ScreenTemplate;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.screenFactory = new ContactScreenFactory(stateManager, eventTracker);
    }

    load(): void {
        this.screenTemplate = this.screenFactory.instantiate();
    }

    exit(): void {
        this.screenTemplate.remove();
    }
}



export class ContactComponent implements IComponentRemovable {
    private contactButton: HTMLDivElement;

    constructor() {
        this.contactButton = document.createElement("div");
        this.contactButton.textContent = "This is Contact Page!!!!xxxxxxxx";
    }

    render(): void {
        document.body.appendChild(this.contactButton);
    }

    removeElem(): void {
        this.contactButton.remove();
    }

    getHTML(): HTMLElement {
        return this.contactButton;
    }
}