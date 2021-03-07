Feature: create a class

  As a user of mySchedule
  I want to create a class for a course name
  So that I can remember it.

  Background:
    Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
    Given the user with an username "GordonRamsay" and password "iloverawsteak" is logged in

  Scenario Outline: The user successfully adds a class ot its profile  (Normal Flow)

    When the user attemps to create a class with title "<title>", description "<description>", startTime "<startTime>" and endTime "<endTime>" and I am username "<username>"
    Then  the current user should receive a confirmation that the operation was successful with status code "200"

    Examples:
      | title    | description    | startTime               | endTime                 | username     |
      | ECSE 429 | 429Description | 2021-03-29T13:34:00.000 | 2021-05-29T13:34:00.000 | GordonRamsay |
      | ECSE 420 | 420Description | 2021-03-29T13:34:00.000 | 2021-05-29T13:34:00.000 | GordonRamsay |
      | COMP 360 | 360Description | 2021-03-29T13:34:00.000 | 2021-05-29T13:34:00.000 | GordonRamsay |


  Scenario Outline: The user creates a class with endTime before startTime (Error Flow)

    When the user attemps to create a class with title "<title>", description "<description>", startTime "<startTime>" and endTime "<endTime>" and I am username "<username>"
    Then  the current user should receive a confirmation that the operation was not successful with status code "400"

    Examples:
      | title    | description    | startTime               | endTime                 | username     |
      | ECSE 429 | 429Description | 2021-03-29T13:34:00.000 | 2021-01-29T13:34:00.000 | GordonRamsay |


  Scenario Outline: The user creates a class when he is not logged in(Error Flow)

    Given the user with username "<username>" logs out from his account
    When the user attemps to create a class with title "<title>", description "<description>", startTime "<startTime>" and endTime "<endTime>" and I am username "<username>"
    Then  the current user should receive a confirmation that the operation was not successful with status code "400"

    Examples:
      | title    | description    | startTime               | endTime                 | username     |
      | ECSE 429 | 429Description | 2021-03-29T13:34:00.000 | 2021-05-29T13:34:00.000 | GordonRamsay |