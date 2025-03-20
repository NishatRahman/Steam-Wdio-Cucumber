import BasePage from './BasePage';
import { Label } from '../framework/elements/Label';

class HomePage extends BasePage {
    constructor() {
        super('.home_page_content', 'Steam Store Home Page');
    }

    get community() { return new Label('=COMMUNITY', 'Community'); }
    get market() { return new Label('=Market', 'Market'); }

    async openCommunityMarket() {
        await this.community.state().waitForDisplayed();
        await this.community.moveTo();
        await this.market.state().waitForClickable();
        await this.market.click();
    }
}

export default new HomePage();
