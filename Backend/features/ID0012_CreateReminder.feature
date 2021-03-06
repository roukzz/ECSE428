Feature: Create a reminder

    As a user of MySchedule
    I would like to be able to create a reminder
    So that I can stay on top of my deadlines

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the user with username "GordonRamsay" and password "iloverawsteak" is logged in

    Scenario Outline: The user succesfully creates a reminder (Normal Flow)
        When the user attempts to create a reminder with rem_title "<rem_title>" and rem_content "<rem_content>" and rem_date "<rem_date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was very successful with status code "200"
        Examples:
            | rem_title | rem_content     | rem_date                | username     |
            | dinner    | dinner with cto | 2021-03-29T13:34:00.000 | GordonRamsay |

    Scenario Outline: The user creates a reminder for a date that has already passed (Error Flow)
        When the user attempts to create a reminder with rem_title "<rem_title>" and rem_content "<rem_content>" and rem_date "<rem_date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not very successful with status code "400"
        Examples:
            | rem_title | rem_content     | rem_date                | username     |
            | dinner    | dinner with cto | 2020-03-29T13:34:00.000 | GordonRamsay |


    Scenario Outline: The user creates a reminder when he is not logged in(Error Flow)
        Given user with username "<username>" is currently not logged in
        When the user attempts to create a reminder with rem_title "<rem_title>" and rem_content "<rem_content>" and rem_date "<rem_date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not very successful with status code "400"
        Examples:
            | rem_title | rem_content     | rem_date                | username     |
            | dinner    | dinner with cto | 2021-03-29T13:34:00.000 | GordonRamsay |


