import { EventTracker, ICommand, ClickEventObserver } from "../Conditionals/EventObserver"; //This is I think where the basic problem of the addEventListeners method comes from is the idea that we shouldn't in the component necessarilt need to know what the addEventListeners is doing that should be in an additional object to sort that so that we can just keep the StartPageEventListener class in this page or import a generic EventListener handler object???
import { IComponent, IComponentRemovable, IComponentEventListener, IComponentInteractive } from "../Conditionals/HTMLComponents";
import { PageState, PageStateManager } from "../Conditionals/PageState";
import { ScreenFactory, ScreenTemplate } from "../Conditionals/Screens";



export class HomeScreenFactory extends ScreenFactory {
    
    create(): ScreenTemplate {
        return new HomeScreen(this.stateManager, this.eventTracker);
    }
}




class HomeScreen extends ScreenTemplate {
    private homeTitleComponent: IComponentRemovable;

    private homeTitleFirstLine: IComponentRemovable;
    private homeTitleSecondLine: IComponentRemovable;


    private homeDescContainer: IComponentRemovable;

    private homeDescHorizontal: IComponentRemovable;
    private homeDesc: IComponentRemovable;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        super(stateManager, eventTracker);

        this.homeTitleComponent = new HomeTitleComponent();
        
        this.homeTitleFirstLine = new HomeTitleFirstComponent();
        this.homeTitleSecondLine = new HomeTitleSecondComponent();
        
        

        this.homeDescContainer = new HomeDescContainerComponent();

        this.homeDescHorizontal = new HomeDescHorizontalComponent();
        this.homeDesc = new HomeDescComponent();



        this.components = [this.homeTitleComponent, this.homeDescContainer, this.homeTitleFirstLine, this.homeTitleSecondLine, this.homeDescHorizontal, this.homeDesc];
        this.componentsRemovable = [this.homeTitleComponent, this.homeDescContainer, this.homeTitleFirstLine, this.homeTitleSecondLine, this.homeDescHorizontal, this.homeDesc];
    }
}




export class HomePage implements PageState {
    private screenFactory: ScreenFactory;
    private screenTemplate!: ScreenTemplate;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.screenFactory = new HomeScreenFactory(stateManager, eventTracker);
    }

    load(): void {
        this.screenTemplate = this.screenFactory.instantiate();
    }

    exit(): void {
        this.screenTemplate.remove();
    }
}



export class HomeTitleComponent implements IComponentRemovable {
    private homeTitleHeader: HTMLElement;

    constructor() {
        this.homeTitleHeader = document.createElement("h1");
        this.homeTitleHeader.id = "home-title";
        this.homeTitleHeader.classList.add("header-title");



    }

    render(): void {
        const content: HTMLElement = document.getElementById("content")!;
        content.appendChild(this.homeTitleHeader);
    }

    removeElem(): void {
        this.homeTitleHeader.remove();
    }

    getHTML(): HTMLElement {
        return this.homeTitleHeader;
    }
}



export class HomeDescContainerComponent implements IComponentRemovable {
    private homeDescContainer: HTMLElement;

    constructor() {
        this.homeDescContainer = document.createElement("div");
        this.homeDescContainer.id = "home-description-container";



    }

    render(): void {
        const content: HTMLElement = document.getElementById("content")!;
        content.appendChild(this.homeDescContainer);
    }

    removeElem(): void {
        this.homeDescContainer.remove();
    }

    getHTML(): HTMLElement {
        return this.homeDescContainer;
    }
}




export class HomeTitleFirstComponent implements IComponentRemovable {
    private homeTitleFirstComponent: HTMLElement;

    constructor() {
        this.homeTitleFirstComponent = document.createElement("span");
        this.homeTitleFirstComponent.id = "home-title-first-line";
        this.homeTitleFirstComponent.classList.add("title-first-line");
        this.homeTitleFirstComponent.textContent = "Webpack ";



    }

    render(): void {
        const homeTitle: HTMLElement = document.getElementById("home-title")!;
        homeTitle.appendChild(this.homeTitleFirstComponent);
    }

    removeElem(): void {
        this.homeTitleFirstComponent.remove();
    }

    getHTML(): HTMLElement {
        return this.homeTitleFirstComponent;
    }
}




export class HomeTitleSecondComponent implements IComponentRemovable {
    private homeTitleSecondComponent: HTMLElement;

    constructor() {
        this.homeTitleSecondComponent = document.createElement("span");
        this.homeTitleSecondComponent.id = "home-title-second-line";
        this.homeTitleSecondComponent.classList.add("title-second-line");
        this.homeTitleSecondComponent.textContent = "Restaurant";



    }

    render(): void {
        const homeTitle: HTMLElement = document.getElementById("home-title")!;
        homeTitle.appendChild(this.homeTitleSecondComponent);
    }

    removeElem(): void {
        this.homeTitleSecondComponent.remove();
    }

    getHTML(): HTMLElement {
        return this.homeTitleSecondComponent;
    }
}




export class HomeDescHorizontalComponent implements IComponentRemovable {
    private homeDescHorizontalComponent: HTMLElement;

    constructor() {
        this.homeDescHorizontalComponent = document.createElement("hr");

    }

    render(): void {
        const homeDesc: HTMLElement = document.getElementById("home-description-container")!;
        homeDesc.appendChild(this.homeDescHorizontalComponent);
    }

    removeElem(): void {
        this.homeDescHorizontalComponent.remove();
    }

    getHTML(): HTMLElement {
        return this.homeDescHorizontalComponent;
    }
}




export class HomeDescComponent implements IComponentRemovable {
    private homeDescComponent: HTMLElement;

    constructor() {
        this.homeDescComponent = document.createElement("p");
        this.homeDescComponent.id = "home-description";
        this.homeDescComponent.textContent = "Welcome to this template restraunt website created using webpack as a bundler and typescript to dynamically change the visible content on the page!";

    }

    render(): void {
        const homeDesc: HTMLElement = document.getElementById("home-description-container")!;
        homeDesc.appendChild(this.homeDescComponent);
    }

    removeElem(): void {
        this.homeDescComponent.remove();
    }

    getHTML(): HTMLElement {
        return this.homeDescComponent;
    }
}