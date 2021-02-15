Feature: Create a reminder

    As a user of MySchedule
    I would like to be able to create a reminder
    So that I can stay on top of my deadlines

    Background:
        Given The application is running
        And   that the user is registered
        And   that the user is logged in

    Scenario Outline: The user succesfully creates a reminder (Normal Flow)
        When the user attempts to create this reminder:
            | rem_title | rem_id | rem_content     | rem_start_time | rem_end_time | date       |
            | dinner    | r_1    | dinner with cto | 16:00:00       | 17:00:00     | 2021-03-04 |
        Then the reminder will be created
        Then the user will be notifed of the success

    Scenario Outline: The user creates a reminder for a date that has already passed (Error Flow)
        When the user attempts to create this reminder:
            | rem_title | rem_id | rem_content     | rem_start_time | rem_end_time | date       |
            | dinner    | r_1    | dinner with cto | 16:00:00       | 17:00:00     | 2001-03-04 |
        Then the reminder will be not created
        And the user will be notified of the failure

    Scenario Outline: The user creates a reminder where the end-time is after the start-time (Error Flow)
        When the user attempts to create this reminder
            | rem_title | rem_id | rem_content     | rem_start_time | rem_end_time | date       |
            | dinner    | r_1    | dinner with cto | 16:00:00       | 08:00:00     | 2001-03-04 |
        Then the reminder will be not created
        And the user will be notified of the failure
