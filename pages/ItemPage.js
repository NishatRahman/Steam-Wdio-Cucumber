import BasePage from './BasePage';
import { Label } from "../framework/elements/Label";

class ItemPage extends BasePage {
    constructor() {
        super('.market_listing_iteminfo', 'Item Page');
    }

    get gameName() {
        return new Label('#largeiteminfo_game_name', 'Game Name');
    }

    get itemType() {
        return new Label('#largeiteminfo_item_type', 'Item Type');
    }

    get descriptor() {
        return new Label('.descriptor', 'Descriptor');
    }

    async getGameName() {
        return await this.gameName.getText();
    }

    async getItemType() {
        return await this.itemType.getText();
    }

    async getDescriptor() {
        return await this.descriptor.getText();
    }
}

export default new ItemPage();
