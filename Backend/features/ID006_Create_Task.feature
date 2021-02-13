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
