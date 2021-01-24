Feature: Delete a task from a course

    As a student
    I want to be able to delete a task from a course
    So that I can remove task I do not need anymore

    Background:
        Given The application is running
        And   the following courses with tasks exist:
            | course   | title       | deadline            |
            | ECSE 429 | assignment1 | 2021-12-20 14:00:00 |
            | ECSE 420 | lab5-2      | 2021-09-20 14:00:00 |
            | COMP 360 | review      | 2021-08-20 14:00:00 |

    Scenario Outline: The user successfully delete a task from a course with content and with location  (Normal Flow)
        
        Given A task exists for each course
        When  I select a task with title <title> and deadline <deadline>
        And   I delete the task <title> from the <course> course
        Then  I should receive a confirmation that my operation was successful
        And   Task <title> should not be in the <course> course
        And   <course> course should not contain task <title>
        And   <course> course should contain 0 tasks

        Examples:
            | course   | title | deadline |
            | ECSE 429 |       |          |
            | ECSE 420 |       |          |
            | COMP 360 |       |          |


    Scenario Outline: The user successfully delete a task from a course without content and without location that already contains some tasks (Alternative Flow)
        
        Given  The following tasks exist for their respective courses:
            | course   | title       | deadline            |
            | ECSE 429 | assignment1 | 2021-12-20 14:00:00 |
            | COMP 360 | lab5-2      | 2021-09-20 14:00:00 |
            | COMP 360 | review      | 2021-08-20 14:00:00 |
        When  I select a task with title <title> and deadline <deadline>
        And   I delete the task with title <title> from the <course> course
        Then  I should receive a confirmation that my operation was successful
        And   Task <title> should not be in the <course> course
        And   <course> course should not contain task "<title>"
        And   <course> course should contain <course_task_count> tasks

        Examples:
            | course   | title  | course_task_count | deadline            |
            | ECSE 429 |        | 0                 |                     |
            | COMP 360 | lab5-2 | 1                 | 2021-09-20 14:00:00 |

    Scenario Outline: The user attempts to delete a task from a given course when the course doesn't exist  (Error Flow)
        
        Given The following tasks exist for their respective courses:
            | course   | tilte       | deadline            |
            | ECSE 429 | assignment1 | 2021-12-20 14:00:00 |
            | COMP 360 | lab5-2      | 2021-09-20 14:00:00 |
            | COMP 360 | review      | 2021-08-20 14:00:00 |

        When  I selete a task with title <title> and deadline <deadline>
        And   I delete the task with title <title> from the <course> course
        Then  I should receive an error informing me that the requested resource was not found
        And   Task <title> should be in the <course> course
        And   Course <course> should exist in the system

        Examples:
            | course   | tilte       | deadline            |
            | ECSE 202 | assignment1 | 2021-12-20 14:00:00 |
            | GEOG 420 | lab5-2      | 2021-09-20 14:00:00 |
            | ATOC 360 | review      | 2021-08-20 14:00:00 |