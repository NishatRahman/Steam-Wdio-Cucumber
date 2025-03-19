import BasePage from './BasePage';

class ItemPage extends BasePage {
    constructor() {
        super($('.market_listing_iteminfo'), 'Item Page');
    }

    get itemTitle() {
        return $('h1#largeiteminfo_item_name');
    }

    get gameName() {
        return $('#largeiteminfo_game_name');
    }

    get itemType() {
        return $('#largeiteminfo_item_type');
    }

    get descriptor() {
        return $('.descriptor');
    }

    async validateItemInfo(gameName, itemType, descriptor) {
        expect(await this.gameName.getText()).toContain(gameName);
        expect(await this.itemType.getText()).toContain(itemType);
        expect(await this.descriptor.getText()).toContain(descriptor);
    }
}

export default new ItemPage();
