Feature: Delete a task of an existing student

    As a student
    I want to be able to delete a task
    So that I can remove task I do not need anymore

    Background:
        Given The application is running
        And the user is registered
        And the user is logged in
        And   the following tasks exist:
            | title       |
            | assignment1 |
            | lab5-2      |
            | review      |

    Scenario Outline: The user successfully delete a task (Normal Flow)

        Given The following tasks exist:
            | title       |
            | assignment1 |
            | lab5-2      |
            | review      |
        When  I select a task with title <title>
        And   I delete the task <title> from the student task list
        Then  I should receive a confirmation that my operation was successful
        And   Task <title> should not be in the task list
        And   The task list course should contain <course_task_count> tasks

        Examples:
            | title       | course_task_count |
            | assignment1 |         2         |
            | lab5-2      |         2         |
            | review      |         2         |

    Scenario Outline: The user successfully delete a task from a course without description (Alternative Flow)

        Given  The following tasks exist:
            | title       |
            | lab3        |
            | lab5        |
            | midterm     |
        When  I select a task that contains no description with title <title>
        And   I delete the task <title> from the student task list
        Then  I should receive a confirmation that my operation was successful
        And   Task <title> should not be in the task list
        And   The task list course should contain <course_task_count> tasks

        Examples:
            | title       | course_task_count |
            | assignment1 |         2         |
            | lab5-2      |         2         |
            | review      |         2         |

    Scenario Outline: The user attempts to delete a task that doesn't exist (Error Flow)

        Given  The following tasks exist:
            | title       |
            | lab3        |
            | lab5        |
            | midterm     |
        When  I remove the task <title> from the sutudent task list
        Then  I should receive an error informing me that the requested resource was not found
        And   Task <title> should not be under the student task lists
        And   The stuent task lists course to do list should contain <course_task_count> tasks

        Examples:
            | title       | course_task_count |
            | assignment1 |         3         |
            | lab5-2      |         3         |
            | review      |         3         |
