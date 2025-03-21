Feature: Steam Community Market item search

  Scenario: Search for Dota 2 items with selected filters
    Given I open the Steam Store main page
    When I navigate to the Community Market
    Then I should see that community market page is opened
    When I click on "Show advanced options"
    Then I should see a window with advanced options
    When I select the game "Dota 2"
    And I select the hero "Phantom Assassin"
    And I select the rarity "Rare"
    And I click the "Search" button
    Then I should see a table with results
    And the "Showing results for" tag should display correct filters "Dota 2", "Rare" and "Phantom Assassin"
    When I click on the first item in the list
    Then I should be taken to the item page with the correct info for selected filters "Dota 2", "Rare" and "Phantom Assassin"
