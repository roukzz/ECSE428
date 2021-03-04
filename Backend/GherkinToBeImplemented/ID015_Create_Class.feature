Feature: create a class

  As a user of mySchedule
  I want to create a class for a course name
  So that I can remember it.

  Background:
    Given The application is running

  Scenario Outline: The user successfully adds a class ot its profile  (Normal Flow)

    Given No class exists in my profile
    When  I create a class with title <title>
    And   I add the class <title> to my profile
    Then  I should receive a confirmation that my operation was successful
    And   class <title> should be in my profile
    And   my profile should contain 1 class

    Examples:
      | title    |
      | ECSE 429 |
      | ECSE 420 |
      | COMP 360 |


  Scenario Outline: The user successfully adds a class to its profile where classes already exists (Alternative Flow)

    Given  The following classes exists in my profil:
      | title    |
      | ECSE 429 |
      | COMP 360 |
    When  I create a class with title <title>
    And   I add the class with title <title> to my profile
    Then  I should receive a confirmation that my operation was successful
    And   class <title> should be in my profile
    And   my profile should contain <course_count> classes

    Examples:
      | title     | course_count |
      | ECSE 202  | 3                 |
      | COMP 250  | 4                 |

  Scenario Outline: The user attempts to add a class with the same existing class title  (Error Flow)

    Given The following classes exist in my profile:
      | title   |
      | ECSE 429 |
      | ECSE 420 |


    When  I create a class with title <title>
    And   I add the class with title <title> my profile
    Then  I should receive an error informing me that the class title already exists
    And   class <title> should not be in my profile


    Examples:
      | title    |
      | ECSE 429 |
      | GEOG 420 |
