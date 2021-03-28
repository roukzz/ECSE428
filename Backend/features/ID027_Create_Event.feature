Feature: Create an Event

  As a user of a mySchedule
  I want to create an Event
  So that I can organize my schedule based on events

  Background:
    Given the application is running
    Given the following users with username "Caillou" and password "qxt54237568" are registered in the system
    Given the following users with username "BobTheBuilder" and password "kgw12403952" are registered in the system


  Scenario Outline: Create an event (Normal Flow)

    Given the user with an username "Caillou" and password "qxt54237568" is logged in
    When user creates an event with name "<eventName>", start time "<start>", end time "<end>", location "<loc>", description "<description>"
    Then an event is created with  "<eventName>", "<start>", "<end>", "<loc>" and "<description>"

    Examples:

      | eventName    | start                    | end                      | loc      | description    |
      | Myevent      | 2021-03-29T13:34:00.000Z | 2021-05-29T13:34:00.000Z | Home     | Work on part 1 |
      | AnotherEvent | 2022-03-29T13:34:00.000Z | 2023-03-29T13:34:00.000Z | Home     | Work on part 2 |
      | ThirdEvenet  | 2021-03-25T13:34:00.000Z | 2021-03-26T13:34:00.000Z | Montreal | Interview      |

  Scenario Outline: User does not wish to create an event anymore (Alternative Flow)

    Given the user with an username "Caillou" and password "qxt54237568" is logged in
    When user wants to create an event with name "<eventName>", start time "<start>", end time "<end>", location "<loc>", description "<description>"
    And user does not confirm the request
    Then no event is created

  Scenario Outline: Create an event with an end time before the start time (Error Flow)

    Given the user with an username "Caillou" and password "qxt54237568" is logged in
    When user creates an event with name "<eventName>", start time "<start>", end time "<end>", location "<loc>", description "<description>"
    Then the system throws an "Start of event cannot be after end of event" error
    And no event is created

    Examples:

      | eventName    | start                    | end                      | loc      | description    |
      | Myevent      | 2021-03-25T13:34:00.000Z | 2021-03-24T13:34:00.000Z | Home     | Work on part 1 |
      | AnotherEvent | 2021-04-25T13:34:00.000Z | 2021-03-25T13:34:00.000Z | Home     | Work on part 2 |
      | ThirdEvenet  | 2022-03-25T13:34:00.000Z | 2021-03-26T13:34:00.000Z | Montreal | Interview      |