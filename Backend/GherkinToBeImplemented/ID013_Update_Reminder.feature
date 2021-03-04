Feature: Update a Reminder

    As a User of mySchedule
    I would like to modify a reminder’s information
    So that my reminders will always be up to date

    Background:
        Given that we have the following reminder in our database:
            | rem_title | rem_id  | rem_content     | rem_start_time | rem_end_time |date      |
            | dinner    | r_1     | dinner with cto |    16:00:00    |   17:00:00   |2021-03-04|

    Scenario Outline: Authenticated User Modify Their Reminder (Normal Flow)

        Given that user is logged into mySchedule
        When user changes <rem_content> of <r_1> to "dinner with ceo"
        Then the reminder <r_1> becomes:

            | rem_title  | rem_id  | rem_content     | rem_start_time | rem_end_time |date      |
            | dinner     | r_1     | dinner with ceo |    16:00:00    |   17:00:00   |2021-03-04|

    Scenario Outline: Authenticated User Modify Reminder Date to an Invalid Date (Error Flow)

        Given that user is logged into mySchedule
        When user changes <date> of reminder <r_1> to "2019-02-30"
        Then the reminder <r_1> is not updated
        And the system throws an "Invalid Date" error

            | rem_title | rem_id  | rem_content     | rem_start_time | rem_end_time |date      |
            | dinner    | r_1     | dinner with cto |    16:00:00    |   17:00:00   |2021-03-04|


Scenario Outline: Authenticated User Modify Reminder End Time to be Earlier than Reminder Start Time (Error Flow)

        Given that user is logged into mySchedule
        When user changes <rem_end_time> of reminder <r_1> to "09:00:00"
        Then the reminder <r_1> is not updated
        And the system throws an "End Time cannot be before the Start Time" error
           
            | rem_title | rem_id  | rem_content     | rem_start_time | rem_end_time |date      |
            | dinner    | r_1     | dinner with cto |    16:00:00    |   17:00:00   |2021-03-04|


