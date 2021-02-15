Feature: create a Task into a course

  As a user of mySchedule
  I want to create a task
  So that I can remember it.

  Background:
    Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
    Given the following users with username "GordonRamsay" and password "iloverawsteak" is logged in

  Scenario Outline: The user successfully adds a task with a description (Normal Flow)

    When  I create a task with title "<title>" and description "<description>" and I am username "<username>"
    Then  I should receive a confirmation that my operation was successful with status code "200"

    Examples:
      | title       | description                     | username     |
      | assignment1 | Assignment for my Math Class    | GordonRamsay |
      | lab5-2      | Must attend this lab. Do PreLab | GordonRamsay |
      | review      | Review for the exam             | GordonRamsay |


  Scenario Outline: The user successfully adds a task with no description (Alternative Flow)

    When  I create a task with title "<title>" and description "<description>" and I am username "<username>"
    Then  I should receive a confirmation that my operation was successful with status code "200"

    Examples:
      | title       | description | username     |
      | assignment1 |             | GordonRamsay |
      | lab5-2      |             | GordonRamsay |
      | review      |             | GordonRamsay |

  Scenario Outline: The user successfully adds a task with no title (Alternative Flow)

    When  I create a task with title "<title>" and description "<description>" and I am username "<username>"
    Then  I should receive a confirmation that my operation was successful with status code "200"

    Examples:
      | title | description                     | username     |
      |       | Assignment for my Math Class    | GordonRamsay |
      |       | Must attend this lab. Do PreLab | GordonRamsay |
      |       | Review for the exam             | GordonRamsay |

  Scenario Outline: The user doesn't successfully adds a task with a description because he is logged out (Error flow)

    Given user with username "<username>" is not logged in
    When  I create a task with title "<title>" and description "<description>" and I am username "<username>"
    Then  I should receive a confirmation that my operation was not successful with status code "400"

    Examples:
      | title       | description                     | username     |
      | assignment1 | Assignment for my Math Class    | GordonRamsay |
      | lab5-2      | Must attend this lab. Do PreLab | GordonRamsay |
      | review      | Review for the exam             | GordonRamsay |



