import { Given, When, Then } from '@cucumber/cucumber';
import homePage from '../pages/HomePage';
import marketPage from '../pages/MarketPage';
import searchResultPage from '../pages/SearchResultPage';
import itemPage from '../pages/ItemPage';

Given('I open the Steam Store main page', async () => {
    await homePage.isPageOpened();
});

When('I navigate to the Community Market', async () => {
    await homePage.openCommunityMarket();
});

Then('I should see that community market page is opened', async () => {
    await marketPage.isPageOpened();
})

When('I click on "Show advanced options"', async () => {
    await marketPage.openAdvancedOptions();
});

Then('I should see a window with advanced options', async () => {
    await marketPage.isSearchWindowOpened();
}) 

When('I select the game "Dota 2"', async () => {
    await marketPage.selectGame();
});

When('I select the hero {string}', async (hero) => {
    await marketPage.selectHero(hero);
});

When('I select the rarity {string}', async (rarity) => {
    await marketPage.selectRarity(rarity);
});

When('I click the "Search" button', async () => {
    await marketPage.clickSearchButton();
});

Then('I should see a table with results', async () => {
    await searchResultPage.isResultTableLoaded();
});

Then('the "Showing results for" tag should display correct filters', async () => {
    await searchResultPage.validateResultTags();
});

When('I click on the first item in the list', async () => {
    await searchResultPage.clickFirstItem();
});

Then('I should be taken to the item page with the correct info for selected filters {string}, {string} and {string}', async (game, rarity, hero) => {
    await itemPage.isPageOpened();
    await itemPage.validateItemInfo(game, rarity, hero);
});

When('I sort price by ascending order', async () => {
    await searchResultPage.sortByPriceAscending();
});

Then('prices are sorted in correct ascending order', async () => {
    await searchResultPage.isSortedAscending();
});

When('I sort price by descending order', async () => {
    await searchResultPage.sortByPriceDescending();
});

Then('prices are sorted in correct descending order', async () => {
    await searchResultPage.isSortedDescending();
});
