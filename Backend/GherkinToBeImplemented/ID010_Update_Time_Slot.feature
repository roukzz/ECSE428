Feature: Update a Time Slot

As a user of a mySchedule
I want to update a time slot
So that I can organize my schedule based on an upcoming task

  Background: 
    Given the application is running
      And the following users are registered in the system:
  
      | username      | password    | 
      | Caillou       | qxt54237568 | 
      | BobTheBuilder | kgw12403952 | 
  
      And the following tasks are registered in the system:
  
      | taskid | description  | 
      | 001    | Assignment 1 | 
      | 002    | Assignment 2 | 
      | 003    | Interview    | 

     And the following timeslots are registered in the system:

      | slotid | start                | end                  | loc      | description    | taskid | 
      | 001    | 2021-02-11 15:00 EST | 2021-02-11 16:00 EST | Home     | Work on part 1 | 001    | 
      | 002    | 2021-02-12 15:00 EST | 2021-02-12 16:00 EST | Home     | Work on part 2 | 001    | 
      | 003    | 2021-02-16 10:00 EST | 2021-02-16 11:00 EST | Montreal | Interview      | 003    | 
  
  Scenario Outline: Update a time slot (Normal Flow)
  
    Given user <username> is logged on to the application
     When user requests to update a time slot for slot <slotid> with start time <start>, end time <end>, location <loc>, description <description>, taskid <taskid>
      And the user confirms the request
     Then a time slot is updated with <start>, <end>, <loc>, <description> and <taskid> 
  
    Examples: 
  
      | slotid | start                | end                  | loc      | description    | taskid | 
      | 001    | 2021-02-11 13:00 EST | 2021-02-11 16:00 EST | Montreal | Work on part 1 | 001    | 
      | 002    | 2021-02-10 15:00 EST | 2021-02-15 16:00 EST | Home     | Work on part 2 | 001    | 
      | 003    | 2021-01-16 10:00 EST | 2021-02-16 11:00 EST | Montreal | Interview      | 003    | 
  
  Scenario Outline: User does not wish to update a time slot anymore (Alternative Flow)
  
    Given user <username> is logged on to the application
     When user requests to update a time slot for slot <slotid> with start time <start>, end time <end>, location <loc>, description <description>, taskid <taskid>
      And user does not confirm the request
     Then the concerned time slot is not updated
  
  Scenario Outline: Create a time slot for an invalid task (Error Flow)
  
    Given user <username> is logged on to the application
     When user requests to update a time slot for slot <slotid> with start time <start>, end time <end>, location <loc>, description <description>, taskid <taskid>
     Then the system throws an "Task Not Found" error
  
  
