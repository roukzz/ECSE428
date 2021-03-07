Feature: update a class

  As a user of mySchedule
  I want to change the details of a created class
  So that my calendar will always be up to date

  Background:
    Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
    Given the user with an username "GordonRamsay" and password "iloverawsteak" is logged in
    Given that we have the following class with title "COMP251" and description "ALGO&DS" and startTime "2021-03-29T13:34:00.000" and endTime "2021-05-29T13:34:00.000" and I am username "GordonRamsay"

  Scenario Outline: Authenticated User Update Their Class title (Normal Flow)

    When the user attemps to update a class with old_title "<old_title>" to new title "<title>", description "<description>", startTime "<startTime>" and endTime "<endTime>" and I am username "<username>"
    Then  the current user should receive a confirmation that the operation was successful with status code "200"
    Examples:
      | old_title | title      | description | startTime               | endTime                 | username     |
      | COMP251   | COMP251-01 | ALGO&DS     | 2021-03-29T13:34:00.000 | 2021-05-29T13:34:00.000 | GordonRamsay |

  Scenario Outline: Authenticated User Update Their Class description (Alternative Flow)

    When the user attemps to update a class with old_title "<old_title>" to new title "<title>", description "<description>", startTime "<startTime>" and endTime "<endTime>" and I am username "<username>"
    Then  the current user should receive a confirmation that the operation was successful with status code "200"
    Examples:
      | old_title | title      | description | startTime               | endTime                 | username     |
      | COMP251   | COMP251-01 | ALGO&DS-DP  | 2021-03-29T13:34:00.000 | 2021-05-29T13:34:00.000 | GordonRamsay |

  Scenario Outline: Authenticated user Update Class End Time to be Earlier than Class Start Time (Error Flow)

    When the user attemps to update a class with old_title "<old_title>" to new title "<title>", description "<description>", startTime "<startTime>" and endTime "<endTime>" and I am username "<username>"
    Then  the current user should receive a confirmation that the operation was not successful with status code "400"
    Examples:
      | old_title | title      | description | startTime               | endTime                 | username     |
      | COMP251   | COMP251-01 | ALGO&DS     | 2021-09-29T13:34:00.000 | 2021-03-29T13:34:00.000 | GordonRamsay |

  Scenario Outline: The user updates a class when he is not logged in(Error Flow)

    Given the user with username "<username>" logs out from his account
    When the user attemps to update a class with old_title "<old_title>" to new title "<title>", description "<description>", startTime "<startTime>" and endTime "<endTime>" and I am username "<username>"
    Then  the current user should receive a confirmation that the operation was not successful with status code "400"

    Examples:
      | old_title | title   | description    | startTime               | endTime                 | username     |
      | COMP251   | COMP251 | 429Description | 2021-03-29T13:34:00.000 | 2021-05-29T13:34:00.000 | GordonRamsay |


