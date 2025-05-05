import { EventTracker, ICommand, ClickEventObserver, HomePageCommand, ExitPageCommand, MenuPageCommand, ContactPageCommand } from "../Conditionals/EventObserver"; //This is I think where the basic problem of the addEventListeners method comes from is the idea that we shouldn't in the component necessarilt need to know what the addEventListeners is doing that should be in an additional object to sort that so that we can just keep the StartPageEventListener class in this page or import a generic EventListener handler object???
import { IComponent, IComponentRemovable, IComponentEventListener, IComponentInteractive } from "../Conditionals/HTMLComponents";
import { PageState, PageStateManager } from "../Conditionals/PageState";
import { ScreenFactory, ScreenTemplate } from "../Conditionals/Screens";



export class StaticScreenFactory extends ScreenFactory {
    
    create(): ScreenTemplate {
        return new StaticScreen(this.stateManager, this.eventTracker);
    }
}




class StaticScreen extends ScreenTemplate {
    private homeTraverseComponent: IComponentEventListener;
    private menuTraverseComponent: IComponentEventListener;
    private contactTraverseComponent: IComponentEventListener;

    private backButton: IComponentEventListener;
    

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        super(stateManager, eventTracker);

        this.homeTraverseComponent = new HomeTraverseComponent(this.eventTracker);
        this.menuTraverseComponent = new MenuTraverseComponent(this.eventTracker);
        this.contactTraverseComponent = new ContactTraverseComponent(this.eventTracker);

        this.backButton = new BackButtonComponent(this.eventTracker);


        this.components = [this.homeTraverseComponent, this.menuTraverseComponent, this.contactTraverseComponent, this.backButton];
        this.componentsEvent = [this.homeTraverseComponent, this.menuTraverseComponent, this.contactTraverseComponent, this.backButton];
    }
}






export class HomeTraverseComponent implements IComponentEventListener {
    private homeTraverseButton: HTMLElement;

    private eventTracker: EventTracker;

    private clickEvent: ClickEventObserver;

    private triggerObserver: () => void;

    constructor(eventTracker: EventTracker) {
        this.homeTraverseButton = document.getElementById("home-button")!;
    
        this.eventTracker = eventTracker;

        this.clickEvent = new ClickEventObserver(this.eventTracker);
    
        this.triggerObserver = () => { this.clickEvent.triggerEvent(); }
    }



    addEventListeners(stateManager: PageStateManager): void {
        this.clickEvent.setEvent(new ExitPageCommand(stateManager));
        this.clickEvent.setEvent(new HomePageCommand(stateManager, this.eventTracker));

        this.homeTraverseButton.addEventListener("click", this.triggerObserver);
    }



    removeEventListeners(): void {
        this.homeTraverseButton.removeEventListener("click", this.triggerObserver);
    }

    render(): void {
        // document.body.appendChild(this.homeTraverseButton);
    }

    getHTML(): HTMLElement {
        return this.homeTraverseButton;
    }
}



export class MenuTraverseComponent implements IComponentEventListener {
    private menuTraverseButton: HTMLElement;

    private eventTracker: EventTracker;

    private clickEvent: ClickEventObserver;

    private triggerObserver: () => void;

    constructor(eventTracker: EventTracker) {
        this.menuTraverseButton = document.getElementById("menu-button")!;
        
    
        this.eventTracker = eventTracker;

        this.clickEvent = new ClickEventObserver(this.eventTracker);
    
        this.triggerObserver = () => { this.clickEvent.triggerEvent(); }
    }



    addEventListeners(stateManager: PageStateManager): void {
        this.clickEvent.setEvent(new ExitPageCommand(stateManager));
        this.clickEvent.setEvent(new MenuPageCommand(stateManager, this.eventTracker));

        this.menuTraverseButton.addEventListener("click", this.triggerObserver);
    }



    removeEventListeners(): void {
        this.menuTraverseButton.removeEventListener("click", this.triggerObserver);
    }

    render(): void {
        // document.body.appendChild(this.menuTraverseButton);
    }

    getHTML(): HTMLElement {
        return this.menuTraverseButton;
    }
}



export class ContactTraverseComponent implements IComponentEventListener {
    private contactTraverseButton: HTMLElement;

    private eventTracker: EventTracker;

    private clickEvent: ClickEventObserver;

    private triggerObserver: () => void;

    constructor(eventTracker: EventTracker) {
        this.contactTraverseButton = document.getElementById("contacts-button")!;
    
        this.eventTracker = eventTracker;

        this.clickEvent = new ClickEventObserver(this.eventTracker);
    
        this.triggerObserver = () => { this.clickEvent.triggerEvent(); }
    }



    addEventListeners(stateManager: PageStateManager): void {
        this.clickEvent.setEvent(new ExitPageCommand(stateManager));
        this.clickEvent.setEvent(new ContactPageCommand(stateManager, this.eventTracker));

        this.contactTraverseButton.addEventListener("click", this.triggerObserver);
    }



    removeEventListeners(): void {
        this.contactTraverseButton.removeEventListener("click", this.triggerObserver);
    }

    render(): void {
        // document.body.appendChild(this.contactTraverseButton);
    }

    getHTML(): HTMLElement {
        return this.contactTraverseButton;
    }
}


export class BackButtonComponent implements IComponentEventListener {
    private backButton: HTMLElement;

    private eventTracker: EventTracker;

    private triggerUndo: () => void;

    constructor(eventTracker: EventTracker) {
        this.backButton = document.getElementById("back-arrow-svg")!;

        this.eventTracker = eventTracker;

        this.triggerUndo = () => { this.eventTracker.undoEvent(); }
    }

    addEventListeners(stateManager: PageStateManager): void {
        this.backButton.addEventListener("click", this.triggerUndo);
    }

    removeEventListeners(): void {
        this.backButton.removeEventListener("click", this.triggerUndo);
    }

    render(): void {
        // document.body.appendChild(this.backButton);
    }

    getHTML(): HTMLElement {
        return this.backButton;
    }
}