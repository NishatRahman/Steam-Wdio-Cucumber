import BasePage from './BasePage';

class HomePage extends BasePage {
    constructor() {
        super($('.home_page_content'), 'Steam Store Home Page');
    }

    get community() { return $('=COMMUNITY'); }
    get market() { return $('=Market'); }

    async openCommunityMarket() {
        await this.community.moveTo();
        await this.market.click();
    }
}

export default new HomePage();
