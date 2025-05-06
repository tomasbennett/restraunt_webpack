import { IScroller, VideoScroller } from "./Utility/VideoScroller";
import { IViewBoxSet, ViewBox } from "./Utility/ViewBox";

import { PageStateManager } from "./Conditionals/PageState";
import { EventTracker, ICommand, HomePageCommand, RenderStaticPageCommand } from "./Conditionals/EventObserver";  



const viewBox: IViewBoxSet = new ViewBox();
viewBox.setViewBox();


const videoScroller: IScroller = new VideoScroller();
videoScroller.itemRecursion();


// const pageStateManager: PageStateManager = new PageStateManager();

// const eventTracker: EventTracker = new EventTracker();

// const homePageCommand: ICommand = new HomePageCommand(pageStateManager, eventTracker);
// eventTracker.addEvent(homePageCommand);

// const staticPageCommand: ICommand = new RenderStaticPageCommand(pageStateManager, eventTracker);
// staticPageCommand.execute();


