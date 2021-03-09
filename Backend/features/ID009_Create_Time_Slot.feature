Feature: Create a Time Slot

As a user of a mySchedule
I want to create a time slot
So that I can organize my schedule based on an upcoming task

  Background:
    Given the user with email "caillou@mail.mcgill.ca" and password "qxt54237568" is logged in
      And the user creates a task with title "TaskTitle" and description "Task Description"

  Scenario Outline: Create a time slot (Normal Flow)

    When user requests to create a time slot for their task with start time "<start>", end time "<end>", and location "<location>"
    Then the task has a new timeslot with start time "<start>", end time "<end>" and location "<location>"

    Examples:
      | start                | end                  | location |
      | 2021-02-11 15:00 EST | 2021-02-11 16:00 EST | Home     |
      | 2021-02-12 15:00 EST | 2021-02-12 16:00 EST | Home     |
      | 2021-02-16 10:00 EST | 2021-02-16 11:00 EST | Montreal |

  Scenario Outline: Create a time slot for a non-existing task (Error Flow)

    When user requests to create a time slot for a non-existing task with start time "<start>", end time "<end>", and location "<location>"
    Then the system throws an "Class not found" error

    Examples:
      | start                | end                  | location |
      | 2021-02-11 15:00 EST | 2021-02-11 16:00 EST | Home     |
      | 2021-02-12 15:00 EST | 2021-02-12 16:00 EST | Home     |
      | 2021-02-16 10:00 EST | 2021-02-16 11:00 EST | Montreal |