import { IComponentEventListener } from "./HTMLComponents";
import { PageStateManager, PageState } from "./PageState";
import { ScreenFactory, ScreenTemplate } from "./Screens";


import { HomePage, HomeScreenFactory } from "../Pages/HomePage";
import { MenuPage } from "../Pages/MenuPage";
import { ContactPage } from "../Pages/ContactPage";
import { StaticScreenFactory } from "../Pages/StaticEventButtons";



export interface ICommand {
    execute(): void;
}

export class EventTracker {
    private eventList: ICommand[];

    private backArrow: HTMLElement;

    constructor() {
        this.eventList = [];

        this.backArrow = document.getElementById("back-arrow-svg")!;

    }

    addEvent(command: ICommand): void {
        this.eventList.push(command);
        command.execute();


        if (this.eventList.length == 3) {
            this.backArrow.classList.remove("non-active");
        }
       

    }

    undoEvent(): void {
        const eventListLength: number = this.eventList.length;
        
        let finalCommands: ICommand[];
        let finalPage: ICommand;
        let exitCommand: ICommand;

        if (eventListLength <= 1) {
            console.log("No more undoing these commands please!!!");
            
        } else if (eventListLength == 3) {
            finalCommands = this.eventList.splice(-2);
            finalPage = this.eventList[0];
            exitCommand = finalCommands[0];

            exitCommand.execute();
            finalPage.execute();

            this.backArrow.classList.add("non-active");

        } else {
            // if(this.eventList[eventListLength - 1].constructor == ExitPageCommand.constructor) {
            //     finalCommands = this.eventList.splice(-4);
            //     finalPage = finalCommands[1];
            //     exitCommand = finalCommands[0];

            // } else {
            //     finalCommands = this.eventList.splice(-2);
            //     finalPage = finalCommands[0];
            //     exitCommand = finalCommands[1];
            // }

            finalCommands = this.eventList.splice(-4);
            finalPage = finalCommands[1];
            exitCommand = finalCommands[0];

            this.addEvent(exitCommand);
            this.addEvent(finalPage);
        }
        

        // exitCommand.execute();
        // finalPage.execute();


    }
}





export class ClickEventObserver {
    private commands: ICommand[];

    private eventTracker: EventTracker;

    constructor(eventTracker: EventTracker) {
        this.commands = [];
        
        this.eventTracker = eventTracker;
    }

    setEvent(command: ICommand): void {
        this.commands.push(command);
    }

    triggerEvent(): void {
        if (this.commands.length > 0) {
            this.commands.forEach(command => this.eventTracker.addEvent(command));
        }
    }

    undo(): void {
        this.eventTracker.undoEvent();
    }
}



export class ExitPageCommand implements ICommand {
    private stateManager: PageStateManager;

    constructor(stateManager: PageStateManager) {
        this.stateManager = stateManager;
    }

    execute(): void {
        this.stateManager.exit();
    }
}


export class HomePageCommand implements ICommand {
    private stateManager: PageStateManager;
    private eventTracker: EventTracker;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.stateManager = stateManager;
        this.eventTracker = eventTracker;
    }

    execute(): void {
        this.stateManager.setState(new HomePage(this.stateManager, this.eventTracker));
        this.stateManager.load();
    }
}

export class MenuPageCommand implements ICommand {
    private stateManager: PageStateManager;
    private eventTracker: EventTracker;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.stateManager = stateManager;
        this.eventTracker = eventTracker;
    }

    execute(): void {
        this.stateManager.setState(new MenuPage(this.stateManager, this.eventTracker));
        this.stateManager.load();
    }
}

export class ContactPageCommand implements ICommand {
    private stateManager: PageStateManager;
    private eventTracker: EventTracker;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.stateManager = stateManager;
        this.eventTracker = eventTracker;
    }

    execute(): void {
        this.stateManager.setState(new ContactPage(this.stateManager, this.eventTracker));
        this.stateManager.load();
    }
}



export class RenderStaticPageCommand implements ICommand {
    private stateManager: PageStateManager;
    private eventTracker: EventTracker;

    private screenFactory!: ScreenFactory;
    private screenTemplate!: ScreenTemplate;

    constructor(stateManager: PageStateManager, eventTracker: EventTracker) {
        this.stateManager = stateManager;
        this.eventTracker = eventTracker;

        this.screenFactory = new StaticScreenFactory(this.stateManager, this.eventTracker);
    }

    execute(): void {
        this.screenTemplate = this.screenFactory.instantiate();
    }
}