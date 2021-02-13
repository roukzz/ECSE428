Feature: create a Task into a course

  As a user of mySchedule
  I want to create a task
  So that I can remember it.

  Background:
    Given The application is running
    And   that the user is registered
    And   that the user is logged in

  Scenario Outline: The user successfully adds a task with a description (Normal Flow)

    Given No tasks exist for me
    When  I create a task with title <title> and description <description>
    Then  I should receive a confirmation that my operation was successful
    And   I should have a task associated to me

    Examples:
      | title       | description                     |
      | assignment1 | Assignment for my Math Class    |
      | lab5-2      | Must attend this lab. Do PreLab |
      | review      | Review for the exam             |


  Scenario Outline: The user successfully adds a task with no description (Alternative Flow)

    Given No tasks exist for me
    When  I create a task with title <title> and description <description>
    Then  I should receive a confirmation that my operation was successful
    And   I should have a task associated to me
    Examples:
      | title       | description |
      | assignment1 |             |
      | lab5-2      |             |
      | review      |             |

  Scenario Outline: The user attempts to create a task with the same name as another task that was already created (Error Flow)

    Given I have a task named <title> with description <initialDescription> already created
    When  I create a task with title <title> and description <secondDescription>
    Then I should be notified that another task with the same name already exists

    Examples:
      | title       | initialDescription              | secondDescription |
      | assignment1 | Assignment for my Math Class    | ECSE assignemnt   |
      | lab5-2      | Must attend this lab. Do PreLab | circuits TODO     |
      | review      | Review for the exam             | Sleep well        |