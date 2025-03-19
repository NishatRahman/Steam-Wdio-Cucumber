export default class BasePage {
    constructor(uniqueElement, pageName) {
        this.uniqueElement = uniqueElement;
        this.pageName = pageName;
    }

    async isPageOpened() {
        await expect(this.uniqueElement).toBeDisplayed();
    }
}
