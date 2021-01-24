Feature: create a Task into a course

  As a student
  I add a task to a course
  So that I can remember it.

  Background:
    Given The application is running
    And   the following courses exist:
      | course    |
      | ECSE 429  |
      | ECSE 420  |
      | COMP 360  |

  Scenario Outline: The user successfully adds a task to a course without content and without location  (Normal Flow)

    Given No tasks exist for each course
    When  I create a task with title <title> and deadline <deadline>
    And   I add the task <title> to the <course> course
    Then  I should receive a confirmation that my operation was successful
    And   Task <title> should be in the <course> course
    And   <course> course should contain task <title>
    And   <course> course should contain 1 tasks

    Examples:
    | course    | tilte       | deadline            |
    | ECSE 429  | assignment1 | 2021-12-20 14:00:00 |
    | ECSE 420  | lab5-2      | 2021-09-20 14:00:00 |
    | COMP 360  | review      | 2021-08-20 14:00:00 |


  Scenario Outline: The user successfully adds a task to a course without content and without location that already contains some tasks (Alternative Flow)

    Given  The following tasks exist for their respective courses:
    | course    | tilte       | deadline            |
    | ECSE 429  | assignment1 | 2021-12-20 14:00:00 |
    | COMP 360  | lab5-2      | 2021-09-20 14:00:00 |
    | COMP 360  | review      | 2021-08-20 14:00:00 |
    When  I create a task with title <title> and deadline <deadline>
    And   I add the task with title <title> to the <course> course
    Then  I should receive a confirmation that my operation was successful
    And   Task <title> should be in the <course> course
    And   <course> course should contain task <title>
    And   <course> course should contain <course_task_count> tasks

    Examples:
      | course    | title         | course_task_count | deadline            |
      | ECSE 429  | review final  |        2          | 2021-12-21 14:00:00 |
      | COMP 360  | assignment 1  |        3          | 2021-09-25 14:00:00 |

  Scenario Outline: The user attempts to add a task to a given course when the course doesn't exist  (Error Flow)
  
    Given The following tasks exist for their respective courses:
    | course    | tilte       | deadline            |
    | ECSE 429  | assignment1 | 2021-12-20 14:00:00 |
    | ECSE 420  | lab5-2      | 2021-09-20 14:00:00 |
    | COMP 360  | review      | 2021-08-20 14:00:00 |

    When  I create a task with title <title> and deadline <deadline>
    And   I add the task with title <title> to the <course> course
    Then  I should receive an error informing me that the requested resource was not found
    And   Task <title> should not be in the <course> course
    And   Course <course> should not exist in the system

    Examples:
    | course    | tilte       | deadline            |
    | ECSE 202  | assignment1 | 2021-12-20 14:00:00 |
    | GEOG 420  | lab5-2      | 2021-09-20 14:00:00 |
    | ATOC 360  | review      | 2021-08-20 14:00:00 |
