Feature: Unjoin an Event

    As a User of mySchedule
    I would like to unjoin an existing event
    So that  I can no longer be part of that event

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the user with username "GordonRamsay" and password "iloverawsteak" is logged in
        Given user has  joined an event with name "TechFair", start time "2021-03-29T13:34:00.000Z", end time "2021-05-29T13:34:00.000Z", location "Home ", description "Winter TechFair"
        Given user has an event with name "TechFairPast", start time "2021-03-29T13:34:00.000Z", end time "2021-05-29T13:34:00.000Z", location "Home ", description "Winter TechFair Past"
        Given user has an event with name "TechFairNotJoined", start time "2021-03-29T13:34:00.000Z", end time "2021-05-29T13:34:00.000Z", location "Home ", description "Winter Techfair Unjoin"



    Scenario Outline: Authenticated User unjoin an event (Normal Flow)

        When user attempts to unjoin an event with with title "<title>" and description "<description>" and date "<date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was successful with status code "200"
        Examples:
            | title    | description     | date                    | username     |
            | TechFair | Winter TechFair | 2021-03-29T13:34:00.000 | GordonRamsay |

    Scenario Outline: Authenticated User unjoin a non-existing event(Error Flow)

        When user attempts to unjoin an event with with title "<title>" and description "<description>" and date "<date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not successful with status code "400"
        Examples:
            | title        | description | date    | username     |
            | InvalidEvent | Invalid     | Invalid | GordonRamsay |

    Scenario Outline: Authenticated User unjoin a past event(Error Flow)
        When user attempts to unjoin an event with with title "<title>" and description "<description>" and date "<date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not successful with status code "400"
        Examples:
            | title        | description          | date                    | username     |
            | TechFairPast | Winter TechFair Past | 2020-03-29T13:34:00.000 | GordonRamsay |



    Scenario Outline: Authenticated User unjoin an event that he is not currently part of the event(Error Flow)
        When user attempts to unjoin an event with with title "<title>" and description "<description>" and date "<date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not successful with status code "400"
        Examples:
            | title             | description            | date                    | username     |
            | TechFairNotJoined | Winter TechFair Unjoin | 2020-03-29T13:34:00.000 | GordonRamsay |
