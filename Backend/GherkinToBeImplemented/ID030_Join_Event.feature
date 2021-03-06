Feature: Join an event

    As a User of mySchedule
    I would like to join an existing event
    So that  I can join an event

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the user with username "GordonRamsay" and password "iloverawsteak" is logged in
        Given that we have the following event with title "TechFair" and description "Winter TechFair" and date "2021-03-29T13:34:00.000" and I am username "GordonRamsay"
        Given that we have the following event with title "TechFairPast" and description "Winter TechFair Past" and date "2020-03-29T13:34:00.000" and I am username "GordonRamsay"


    Scenario Outline: Authenticated User join an event (Normal Flow)

        When user attempts to join an event with with title "<title>" and description "<description>" and date "<date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was successful with status code "200"
        Examples:
            | title    | description     | date                    | username     |
            | TechFair | Winter TechFair | 2021-03-29T13:34:00.000 | GordonRamsay |

    Scenario Outline: Authenticated User join a non-existing event(Error Flow)

        When user attempts to join an event with with title "<title>" and description "<description>" and date "<date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not successful with status code "400"
        Examples:
            | title        | description | date    | username     |
            | InvalidEvent | Invalid     | Invalid | GordonRamsay |

    Scenario Outline: Authenticated User join a past event(Error Flow)
        When user attempts to join an event with with title "<title>" and description "<description>" and date "<date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not successful with status code "400"
        Examples:
            | title        | description          | date                    | username     |
            | TechFairPast | Winter TechFair Past | 2020-03-29T13:34:00.000 | GordonRamsay |  |

    Scenario Outline: Non-authenticated user joins an event (Error Flow)
        Given user with username "<username>" is logged out
        When user attempts to join an event with with title "<title>" and description "<description>" and date "<date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not successful with status code "400"
        Examples:
            | title    | description     | date                    | username     |
            | TechFair | Winter TechFair | 2021-03-29T13:34:00.000 | GordonRamsay |