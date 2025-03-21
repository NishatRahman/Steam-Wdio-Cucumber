Feature: Steam Community Market Search and sort by price

  Scenario: Search for an item and verify sorting order
    Given I open the Steam Store main page
    When I navigate to the Community Market
    Then I should see that community market page is opened
    When I click on "Show advanced options"
    Then I should see a window with advanced options
    When I select the game "Dota 2"
    And I select the hero "Anti-Mage"
    And I select the rarity "Uncommon"
    And I click the "Search" button
    Then I should see a table with results
    And the "Showing results for" tag should display correct filters "Dota 2", "Uncommon" and "Anti-Mage"
    When I sort price by "ascending" order
    Then prices are sorted in correct "ascending" order
    When I sort price by "descending" order
    Then prices are sorted in correct "descending" order
