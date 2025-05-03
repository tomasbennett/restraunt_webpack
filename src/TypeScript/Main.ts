import { IScroller, VideoScroller } from "./Utility/VideoScroller";
import { IViewBoxSet, ViewBox } from "./Utility/ViewBox";


const viewBox: IViewBoxSet = new ViewBox();
viewBox.setViewBox();


const videoScroller: IScroller = new VideoScroller();
videoScroller.itemRecursion();


