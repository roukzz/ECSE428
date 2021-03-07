Feature: Update a Time Slot

As a user of a mySchedule
I want to update a time slot
So that I can organize my schedule based on an upcoming task

  Background:
    Given user with username "caillou@mail.mcgill.ca" and password "qxt54237568" is logged in
      And the user has a task with title "Task Title" and description "Task Description"
      And the task has a time slot with start time "2021-02-11 15:00 EST", end time "2021-02-11 16:00 EST", location "Home" and description "Work on part 1"

  Scenario Outline: Update a time slot (Normal Flow)

    When user requests to update their time slot with start time "<start>", end time "<end>", location "<loc>", and description "<description>"
    Then the time slot is updated to "<start>", "<end>", "<loc>", and "<description>"

    Examples:
      | start                | end                  | loc      | description    |
      | 2021-02-11 13:00 EST | 2021-02-11 16:00 EST | Montreal | Work on part 1 |
      | 2021-02-10 15:00 EST | 2021-02-15 16:00 EST | Home     | Work on part 2 |
      | 2021-01-16 10:00 EST | 2021-02-16 11:00 EST | Montreal | Interview      | 

  Scenario Outline: Create a time slot for an invalid task (Error Flow)

    When user requests to update a time slot for a non-existing task with start time "<start>", end time "<end>", location "<loc>", and description "<description>"
    Then the system throws "Task does not exist"
    
    Examples:
      | start                | end                  | loc      | description    |
      | 2021-02-11 13:00 EST | 2021-02-11 16:00 EST | Montreal | Work on part 1 |
      | 2021-02-10 15:00 EST | 2021-02-15 16:00 EST | Home     | Work on part 2 |
      | 2021-01-16 10:00 EST | 2021-02-16 11:00 EST | Montreal | Interview      | 
