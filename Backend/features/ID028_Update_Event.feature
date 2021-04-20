Feature: Update an Event

  As a user of a mySchedule
  I want to Update an Event
  So that I can organize my schedule based on events

  Background:
    Given the application is running
    Given the following users with username "Caillou" and password "qxt54237568" are registered in the system
    Given the user with an username "Caillou" and password "qxt54237568" is logged in
    Given user has an event with name "Myevent", start time "2021-03-29T13:34:00.000Z", end time "2021-05-29T13:34:00.000Z", location "Home ", description " Work on part 1"
    Given user has an event with name "AnotherEvent", start time "2021-05-29T13:34:00.000Z", end time "2021-06-29T13:34:00.000Z", location "Home ", description " Work on part 2"
    Given user has an event with name "ThirdEvenet", start time "2023-03-29T13:34:00.000Z", end time "2024-05-29T13:34:00.000Z", location "Montreal ", description " Interview"



  Scenario Outline: Update an event (Normal Flow)

    Given the user with an username "Caillou" and password "qxt54237568" is logged in
    When user requests to update an event with oldName "<oldName>" and new name "<newEventName>", start time "<newStart>", end time "<newEnd>", location "<newLoc>", description "<newDescription>"
    And the user confirms the request
    Then an event is updated with "<newEventName>", "<newStart>", "<newEnd>", "<newLoc>" and "<newDescription>"

    Examples:

      | oldName      | newEventName | newStart                 | newEnd                   | newLoc | newDescription |
      | Myevent      | newEventA    | 2021-03-29T13:34:00.000Z | 2021-05-29T13:34:00.000Z | Tokyo  | Travel studies |
      | AnotherEvent | newEventB    | 2021-03-29T13:34:00.000Z | 2021-03-30T13:34:00.000Z | Office | Interview      |
      | ThirdEvenet  | newEventC    | 2020-02-29T13:34:00.000Z | 2021-03-29T13:34:00.000Z | Home   | Interview      |

  Scenario Outline: User does not wish to update an event anymore (Alternative Flow)

    When user wishes to update an event with old name "<oldName>" and new name "<newEventName>", start time "<newStart>", end time "<newEnd>", location "<newLoc>", description "<newDescription>"
    And user does not confirm the request
    Then the event is not updated

  Scenario Outline: Update an event with an end time before the start time (Error Flow)

    Given the user with an username "Caillou" and password "qxt54237568" is logged in
    When user requests to update an event with oldName "<oldName>" and new name "<newEventName>", start time "<newStart>", end time "<newEnd>", location "<newLoc>", description "<newDescription>"
    Then the system throws an "Start of an event cannot be after end of an event" error

    Examples:

      | oldName      | newEventName | newStart                 | newEnd                   | newLoc | newDescription |
      | Myevent      | newEventA    | 2021-03-29T13:34:00.000Z | 2021-02-29T13:34:00.000Z | Tokyo  | Travel studies |
      | AnotherEvent | newEventB    | 2025-03-29T13:34:00.000Z | 2021-03-30T13:34:00.000Z | Office | Interview      |
      | ThirdEvenet  | newEventC    | 2021-03-29T13:50:00.000Z | 2021-03-29T13:34:00.000Z | Home   | Interview      |