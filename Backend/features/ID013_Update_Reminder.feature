Feature: Update a Reminder

    As a User of mySchedule
    I would like to modify a reminder’s information
    So that my reminders will always be up to date

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the user with username "GordonRamsay" and password "iloverawsteak" is logged in
        Given that we have the following reminder with rem_title "dinner" and rem_content "dinner with ceo" and rem_date "2021-03-29T13:34:00.000" and I am username "GordonRamsay"

    Scenario Outline: Authenticated User Modify Their Reminder (Normal Flow)

        When user changes reminder to new reminder with rem_title "<rem_title>" and rem_content "<rem_content>" and rem_date "<rem_date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was very successful with status code "200"
        Examples:
            | rem_title | rem_content     | rem_date                | username     |
            | dinner    | dinner with ceo | 2021-03-29T13:34:00.000 | GordonRamsay |

    Scenario Outline: Authenticated User Modify Reminder Date to an Invalid Date (Error Flow)

        When user changes reminder to new reminder with rem_title "<rem_title>" and rem_content "<rem_content>" and rem_date "<rem_date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not very successful with status code "400"
        Examples:
            | rem_title | rem_content     | rem_date     | username     |
            | dinner    | dinner with cto | Invalid Date | GordonRamsay |


    Scenario Outline: Authenticated User Modify Reminder End Time to be Earlier than Reminder Start Time (Error Flow)

        When user changes reminder to new reminder with rem_title "<rem_title>" and rem_content "<rem_content>" and rem_date "<rem_date>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not very successful with status code "400"
        Examples:
            | rem_title | rem_content     | rem_date                | username     |
            | dinner    | dinner with ceo | 2020-03-29T13:34:00.000 | GordonRamsay |

