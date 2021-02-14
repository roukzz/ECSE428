Feature: Update a Task

  As a User of mySchedule
  I would like to change the details of a created task
  So that my calendar will always be up to date

  Background:
  Background:
    Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
    Given the following users with username "GordonRamsay" and password "iloverawsteak" is logged in in the system
    Then the user with username "GordonRamsay" has a task with title "assignment1" and description "Do!"
    Then the user with username "GordonRamsay" has a task with title "lab5-2" and description "Urgent!!"
    Then the user with username "GordonRamsay" has a task with title "review" and description "Easy"


  Scenario Outline: The user successfully updated the title and description task (Normal Flow)
    When  user with username "<username>" change the task with title "<title>" to new_title "<new_title>" and I change the description to new_description "<new_description>"
    Then  I should receive a confirmation that my operation was successful with a status code of "200"

    Examples:
      | username     | title       | new_title   | new_description |
      | GordonRamsay | assignment1 | assignment2 | Do it now!      |
      | GordonRamsay | lab5-2      | midterm     | Urgent          |
      | GordonRamsay | review      | project     | just question 1 |

  Scenario Outline: The user successfully updated the title for a task (Alternate Flow)

    When  user with username "<username>" change the task with title "<title>" to new_title "<new_title>" and I change the description to new_description "<new_description>"
    Then  I should receive a confirmation that my operation was successful with a status code of "200"

    Examples:
      | username     | title       | new_title   | new_description |
      | GordonRamsay | assignment1 | assignment2 | Do!             |
      | GordonRamsay | lab5-2      | midterm     | Urgent!!        |
      | GordonRamsay | review      | project     | Easy            |

  Scenario Outline: The user successfully updated description for a task (Normal Flow)
    When  user with username "<username>" change the task with title "<title>" to new_title "<new_title>" and I change the description to new_description "<new_description>"
    Then  I should receive a confirmation that my operation was successful with a status code of "200"

    Examples:
      | username     | title       | new_title   | new_description |
      | GordonRamsay | assignment1 | assignment1 | Do it now!      |
      | GordonRamsay | lab5-2      | lab5-2      | Urgent          |
      | GordonRamsay | review      | review      | just question 1 |

  Scenario Outline: The user attempts to change the description for a task that doesn't exist (Error Flow)

    When  user with username "<username>" change the task with title "<title>" to new_title "<new_title>" and I change the description to new_description "<new_description>"
    Then  I should receive a confirmation that my operation was not successful with a status code of "400"

    Examples:
      | username     | title        | new_title   | new_description |
      | GordonRamsay | nonExistant1 | assignment1 | Do it now!      |
      | GordonRamsay | nonExistant2 | lab5-2      | Urgent          |
      | GordonRamsay | nonExistant3 | review      | just question 1 |

  Scenario Outline: The user does not successfully updated description for a task because he's not logged in (Error Flow)
    Given the user with username "<username>" is not logged in
    When  user with username "<username>" change the task with title "<title>" to new_title "<new_title>" and I change the description to new_description "<new_description>"
    Then  I should receive a confirmation that my operation was successful with a status code of "400"

    Examples:
      | username     | title       | new_title   | new_description |
      | GordonRamsay | assignment1 | assignment1 | Do it now!      |
      | GordonRamsay | lab5-2      | lab5-2      | Urgent          |
      | GordonRamsay | review      | review      | just question 1 |
