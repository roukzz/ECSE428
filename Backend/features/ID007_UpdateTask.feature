Feature: Update a Task

  As a User of mySchedule
  I would like to change the details of a created task
  So that my calendar will always be up to date

  Background:
    Given The application is running
    And   that the user is registered
    And   that the user is logged in
    And that we have the following task in our database:
      | title       | description |
      | assignment1 | Do!         |
      | lab5-2      | Urgent!!    |
      | review      | easy        |

  Scenario Outline: The user successfully updated the title and description task (Normal Flow)
    When  I select a task with title <title>
    And   I change the title of task <title> to <new_title>
    And   I change the description of task <title> to <new_description>
    Then  I should receive a confirmation that my operation was successful

    Examples:
      | title       | new_title   | new_description |
      | assignment1 | assignment2 | Do it now!      |
      | lab5-2      | midterm     | Urgent          |
      | review      | project     | just question 1 |

  Scenario Outline: The user successfully updated the title for a task (Alternate Flow)

    When  I select a task with title <title>
    And   I change the title of task <title> to <new_title>
    Then  I should receive a confirmation that my operation was successful

    Examples:
      | title       | new_title   |
      | assignment1 | assignment2 |
      | lab5-2      | midterm     |
      | review      | project     |

  Scenario Outline: The user attempts to change the description for a task that doesn't exist (Error Flow)

    When  I change the description of task <title> to <new_description>
    Then  I should receive an error informing me that the requested resource was not found

    Examples:
      | title | new_description |
      | hmw1  | Do it now!      |
      | hmw5  | Urgent          |
      | final | just question 1 |
