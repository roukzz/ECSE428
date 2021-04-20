Feature: Delete an Event

  As a user of a mySchedule
  I want to Delete an Event
  So that I can organize my schedule based on events

  Background:
  Given the application is running
  Given username "Caillou" and password "qxt54237568" is registered in the system
  Given the following users with username "BobTheBuilder" and password "kgw12403952" are registered in the system
  Given the user with an username "Caillou" and password "qxt54237568" is logged in
  Given user has an event with name "Myevent", start time "2021-03-29T13:34:00.000Z", end time "2021-05-29T13:34:00.000Z", location "Home ", description " Work on part 1"


  Scenario Outline: Delete an event (Normal Flow)

     When user requests to delete an event with eventid <eventid>
     And the user confirms the request
     Then the event is deleted with a confirmation message "Event has been deleted"

  Scenario Outline: User does not wish to delete an event anymore (Alternative Flow)

     When user wishes to delete an event with eventid <eventid>
     And user does not confirm the request
     Then the event is not deleted
  #
  Scenario Outline: User other than the event creator deletes the given event (Error Flow)
    Given the following user with username "BobTheBuilder" is currently not logged in the system
    When user requests to delete an event with eventid <eventid>
    Then I should receive a confirmation that my operation was not successful with status code "400" for delete an event
    And the event is not deleted
