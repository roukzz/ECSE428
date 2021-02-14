Feature: Delete a task of an existing student

    As a student
    I want to be able to delete a task
    So that I can remove task I do not need anymore

  Background:
    Given The application is running
    And   that the user is registered
    And   that the user is logged in
    And that we have the following task in our database:
      | title       | description |
      | assignment1 | Do!         |
      | lab5-2      | Urgent!!    |
      | review      | easy        |

  Scenario Outline: The user successfully deleted the title and description task (Normal Flow)
    When  I select a task with title <title>
    And   I delete the task with title <title>
    Then  I should receive a confirmation that my operation was successful

    Examples:
      | title       |
      | assignment1 |
      | lab5-2      |
      | review      |


  Scenario Outline: The user attempts to delete a task that doesn't exist (Error Flow)

    When  I delete thetask <title>
    Then  I should receive an error informing me that the requested resource was not found

    Examples:
      | title |
      | hmw1  |
      | hmw5  |
      | final |

