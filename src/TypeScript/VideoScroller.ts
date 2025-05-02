export interface IScroller{
    itemRecursion(): void;

    updateItem(prevItem: HTMLVideoElement, currItem: HTMLVideoElement): void;
}



export class VideoScroller implements IScroller{
    private scrollableItems: HTMLVideoElement[];
    private itemsCount: number;

    private timeTransition: number;

    private index: number;



    constructor() {

        this.scrollableItems = Array.from(document.querySelectorAll(".video-background video"));
        this.itemsCount = this.scrollableItems.length;

        this.timeTransition = 10;

        this.index = this.itemsCount - 1;
    }
    



    itemRecursion(): void {

        setInterval(() => {
            
            if (this.index === 0) {
                this.updateItem(
                    this.scrollableItems[this.index],
                    this.scrollableItems[this.itemsCount - 1]
                );

                this.index = this.itemsCount - 1;

            } else {

                this.updateItem(
                    this.scrollableItems[this.index],
                    this.scrollableItems[this.index - 1]
                );

                this.index--;

            }

            // const prevIndex = (this.index === 0) ? this.itemsCount - 1 : this.index;
        
            // this.updateItem(
            //     this.scrollableItems[prevIndex],
            //     this.scrollableItems[this.index - 1]
            // );
        
            // this.index--;

        }, this.timeTransition * 1000);

    }


    updateItem(prevItem: HTMLVideoElement, currItem: HTMLVideoElement): void {
        prevItem.classList.remove("current-video");
        currItem.classList.add("current-video");
    }

}