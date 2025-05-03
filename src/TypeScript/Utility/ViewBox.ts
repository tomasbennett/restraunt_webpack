export interface IViewBoxSet {
    setViewBox(): void;
}


export class ViewBox implements IViewBoxSet{
    private svgElement: any;
    private topLayerGroup: any;

    constructor(){
        this.svgElement = document.getElementById("back-arrow-svg")!;
        this.topLayerGroup = document.getElementById("layer1")!;

    }

    setViewBox(): void {
        const bbox: any = this.topLayerGroup.getBBox();
        this.svgElement.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

    }


}