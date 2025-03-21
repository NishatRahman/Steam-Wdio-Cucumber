import BasePage from './BasePage';
import { Label } from "../framework/elements/Label";

class ItemPage extends BasePage {
    #gameName = new Label('#largeiteminfo_game_name', 'Game Name');
    #itemType = new Label('#largeiteminfo_item_type', 'Item Type');
    #descriptor = new Label('.descriptor', 'Descriptor');

    constructor() {
        super('.market_listing_iteminfo', 'Item Page');
    }

    async getGameName() {
        return await this.#gameName.getText();
    }

    async getItemType() {
        return await this.#itemType.getText();
    }

    async getDescriptor() {
        return await this.#descriptor.getText();
    }
}

export default new ItemPage();