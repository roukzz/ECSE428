Feature: Update a Task

    As a User of mySchedule
    I would like to change the details of a created task
    So that my calendar will always be up to date

    Background:
        Given that we have the following task in our database:
            | task_name | task_id | date       | start_time | end_time | description |
            | test      | task001 | 2021-02-14 | 10:00:00   | 16:00:00 | Test task   |

    Scenario Outline: Authenticated User Update Their Task (Normal Flow)

        Given that user "Test Subject" is logged into mySchedule
        When user "Test Subject" changes <task_name> of <test> to "Test"
        Then the task <test> becomes:
            | task_name | task_id | date       | start_time | end_time | description |
            | Test      | task001 | 2021-02-14 | 10:00:00   | 16:00:00 | Test task   |

    Scenario Outline: Authenticated User Update Task End Time to be Earlier than Task Start Time (Error Flow)

        Given that user "Test Subject" is logged into mySchedule
        When user "Test Subject" changes <end_time> of task <test> to "09:00:00"
        Then the task <test> is not updated
        And the system throws an "End Time cannot be before the Start Time" error

            | task_name | task_id | date       | start_time | end_time | description |
            | Test      | task001 | 2021-02-14 | 10:00:00   | 16:00:00 | Test task   |


    Scenario Outline: Authenticated User Update Task Date to an Invalid Date (Error Flow)

        Given that user "Test Subject" is logged into mySchedule
        When user "Test Subject" changes <date> of task <test> to "2021-02-30"
        Then the task <test> is not updated
        And the system throws an "Invalid Date" error

            | task_name | task_id | date       | start_time | end_time | description |
            | Test      | task001 | 2021-02-14 | 10:00:00   | 16:00:00 | Test task   |