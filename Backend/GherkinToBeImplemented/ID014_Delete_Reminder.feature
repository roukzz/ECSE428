Feature: Delete a reminder of an existing student

    As a student
    I want to be able to delete a reminder
    So that I can remove a reminder I do not need anymore

    Background:
        Given The application is running
        And the user is registered
        And the user is logged in

    Scenario Outline: The user successfully deletes a reminder (Normal Flow)

        Given the following reminder exists:
            | rem_title | rem_id  | rem_content     | rem_start_time | rem_end_time |date      |
            | dinner    | r_1     | dinner with cto |    16:00:00    |   17:00:00   |2021-03-04|
        When  the user attempts to delete the reminder with title <dinner>
        Then  the user will receive a success status code "200"

        Examples:
            | rem_title |
            | dinner    |


    Scenario Outline: The user successfully delete a reminder without a content (Alternative Flow)

        Given the following reminder exists:
            | rem_title | rem_id  | rem_content     | rem_start_time | rem_end_time |date      |
            | dinner2   | r_2     |                 |    16:00:00    |   17:00:00   |2021-03-05|
        When  the user attempts to delete the reminder with title <dinner2>
        Then  the user will receive a success status code "200"

        Examples:
            | rem_title|
            | dinner2  |

    Scenario Outline: The user attempts to delete a reminder that doesn't exist (Error Flow)

        Given  The following reminder exists:
            | rem_title | rem_id  | rem_content     | rem_start_time | rem_end_time |date      |
            | dinner3   | r_3     | dinner with ceo |    16:00:00    |   17:00:00   |2021-03-06|

        When  the user attempts to delete the reminder with title <dinner>
        Then  the user will receive a failure status code

        Examples:
            |  rem_title  |
            |    dinner   |
