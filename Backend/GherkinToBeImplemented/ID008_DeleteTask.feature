Feature: Delete a task of an existing student

    As a student
    I want to be able to delete a task
    So that I can remove task I do not need anymore

    Background:
        Given The application is running
        And the user is registered
        And the user is logged in

    Scenario Outline: The user successfully delete a task (Normal Flow)

        Given the following tasks exists:
            | title       |    description   |
            | assignment1 | task description |
        When  the user attempts to delete the task with title <title>
        Then  the user will receive a success status code "200"

        Examples:
            | title       |
            | assignment1 |

    Scenario Outline: The user successfully delete a task from a course without description (Alternative Flow)

        Given the following tasks exists:
            | title       | description  |
            | assignment2 |              |
        When  the user attempts to delete the task with title <title>
        Then  the user will receive a success status code "200"

        Examples:
            | title       |
            | assignment2 |

    Scenario Outline: The user attempts to delete a task that doesn't exist (Error Flow)

        Given  The following task exists:
            | title       | description  |
            | assignment3 |              |

        When  the user attempts to delete the task with title <title>
        Then  he user will receive a failure status code 

        Examples:
                |    title    |
                | assignment  |
