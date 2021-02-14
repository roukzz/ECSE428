Feature: Delete a task of an existing student

  As a student
  I want to be able to delete a task
  So that I can remove task I do not need anymore

  Background:
    Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
    Given the following user with username "GordonRamsay" and password "iloverawsteak" is logged in in the system
    Then the user with the username "GordonRamsay" has a task with title "assignment1" and description "Do!"
    Then the user with the username "GordonRamsay" has a task with title "lab5-2" and description "Urgent!!"
    Then the user with the username "GordonRamsay" has a task with title "review" and description "Easy"

  Scenario Outline: The user successfully delete the task (Normal Flow)
    When  user with username "<username>" delete the task with title "<title>"
    Then  user should receive a confirmation that the operation was successful with a status code of "200"

    Examples:
      | username     | title       |
      | GordonRamsay | assignment1 |
      | GordonRamsay | lab5-2      |
      | GordonRamsay | review      |


  Scenario Outline: The user does not successfully delete task because the task does not exist (Error Flow)
    When  user with username "<username>" delete the task with title "<title>"
    Then  user should receive a confirmation that the operation was not successful with a status code of "400"

    Examples:
      | username     | title        |
      | GordonRamsay | NonExistant1 |
      | GordonRamsay | NonExistant2 |
      | GordonRamsay | NonExistant3 |

  Scenario Outline: The user does not successfully delete task because he is not logged in (Error Flow)
    Given the user with username "<username>" is not currently logged in
    When  user with username "<username>" delete the task with title "<title>"
    Then  user should receive a confirmation that the operation was not successful with a status code of "400"

    Examples:
      | username     | title       |
      | GordonRamsay | assignment1 |
      | GordonRamsay | lab5-2      |
      | GordonRamsay | review      |

