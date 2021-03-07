Feature: Delete a Time Slot

As a user of a mySchedule
I want to delete a time slot
So that I can remove unnecessary information on my schedule

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

	And the following slots are registered in the system:
	| slotid | start                | end                  | loc      | description    | taskid | 
      	| 001    | 2021-02-11 15:00 EST | 2021-02-11 16:00 EST | Home     | Work on part 1 | 001    | 
      	| 002    | 2021-02-12 15:00 EST | 2021-02-12 16:00 EST | Home     | Work on part 2 | 001    | 
      	| 003    | 2021-02-16 10:00 EST | 2021-02-16 11:00 EST | Montreal | Interview      | 003    | 
  
  Scenario Outline: Delete a time slot (Normal Flow)
  
    Given user <username> is logged on to the application
     When user requests to delete a time slot for task <taskid> with <slotid>
      And the user confirms the request
     Then a time slot <slotid> is deleted from <taskid>
  
  Scenario Outline: User does not wish to delete a time slot anymore (Alternative Flow)
  
    Given user <username> is logged on to the application
     When user requests to delete a time slot for task <taskid> with <slotid>
      And user does not confirm the request
     Then no time slot is deleted 
	And the slotid <slotid> still exists in the system
  
  Scenario Outline: Delete an invalid time slot (Error Flow)
  
    Given user <username> is logged on to the application
     When user requests to delete an invalid time slot <invalidslotid>
     Then the system throws an "Time Slot Not Found" error

	Exemple:
  
  	| invalidslotid | start                | end                  | loc      | description    | taskid | 
      	| 004   	| 2021-02-11 15:00 EST | 2021-02-11 16:00 EST | Home     | Work on part 1 | 001    | 
      	| 005    	| 2021-02-12 15:00 EST | 2021-02-12 16:00 EST | Home     | Work on part 2 | 001    | 
      	| 006   	| 2021-02-16 10:00 EST | 2021-02-16 11:00 EST | Montreal | Interview      | 003    | 
