Feature: Delete a Time Slot

As a user of a mySchedule
I want to delete a time slot
So that I can remove unnecessary information on my schedule

  Background:
    Given user with email "calliou@mail.mcgill.ca" and password "password" is logged in
      And the user has got a task with title "Task Title" and description "Task Description"
      And the task has a slot with start time "2021-02-11 15:00 EST", end time "2021-02-11 16:00 EST", location "Home" and description "Work on part 1"

  Scenario Outline: Delete a time slot (Normal Flow)

    When user requests to delete a time slot for the task
    Then a time slot is deleted from the task and the task has "0" time slots

  Scenario Outline: Delete an invalid time slot (Error Flow)

    When user requests to delete an invalid time slot that does not belong to the task
    Then the system throws "Timeslot does not exist" error