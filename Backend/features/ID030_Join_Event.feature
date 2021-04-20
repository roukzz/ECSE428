Feature: Join Event

    As a user
    I want to join an event
    So that I can join an event created by other students

    Background:
        Given the following user "caillou", "caillou@mail.mcgill.ca" and password "qxt54237568" is registered in the system
          And the user is logged in
          And there is an event in the system with start time "2021-02-11 15:00 EST", end time "2021-02-11 16:00 EST", title "New Event", description "Awesome Event", location "Montreal"

    Scenario Outline: The user successfully joins an event (Normal Flow)
        Given the user asks to join the event "New Event"
        Then the user successfully joins the event
    
    Scenario Outline: The user tries to join an event but makes a spelling error in the event name (Error Flow)
        Given the user asks to join the event "New event"
        Then the user fails to join the event since the event does not exist