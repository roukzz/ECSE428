Feature: update a class

  As a user of mySchedule
  I want to change the details of a created class
  So that my calendar will always be up to date

  Background:
    Given that we have the following class in our database:
	    | class_title | class_id | start_time | end_time | description  | location
            | ECSE 429    | class001 | 18:00:00   | 21:00:00 | Test class 1 | Montreal

  Scenario Outline: Authenticated User Update Their Class title (Normal Flow)

    Given that user "Test Subject" is logged into mySchedule
    When user "Test Subject" changes <class_title> of <class_id> to "ECSE 428"
    Then the class <class_id> becomes:
	    | class_title | class_id | start_time | end_time | description  | location
            | ECSE 428    | class001 | 18:00:00   | 21:00:00 | Test class 1 | Montreal

  Scenario Outline: Authenticated User Update Their Class description (Alternative Flow)

    Given that user "Test Subject" is logged into mySchedule
    When user "Test Subject" changes <description> of <class_id> to "Software Validation"
    Then the class <class_id> becomes:
	    | class_title | class_id | start_time | end_time | description         | location
            | ECSE 429    | class001 | 18:00:00   | 21:00:00 | Software Validation | Montreal

  Scenario Outline: Authenticated user Update Class End Time to be Earlier than Class Start Time (Error Flow)

    Given that user "Test Subject" is logged into mySchedule
    When user "Test Subject" changes <end_time> of class <class_id> to "17:00:00"
    Then the class <class_id> is not updated
    And the system throws an "End Time cannot be before the Start Time" error

	    | class_title | class_id | start_time | end_time | description  | location
            | ECSE 429    | class001 | 18:00:00   | 21:00:00 | Test class 1 | Montreal

  Scenario Outline: Authenticated user Update Class Location to an Invalid Location (Error Flow)

    Given that user "Test Subject" is logged into mySchedule
    When user "Test Subject" changes <location> of class <class_id> to "NoSuchLocation"
    Then the class <class_id> is not updated
    And the system throws an "Invalid Location" error

	    | class_title | class_id | start_time | end_time | description  | location
            | ECSE 429    | class001 | 18:00:00   | 21:00:00 | Test class 1 | Montreal

  Scenario Outline: Authenticated user Update Class Title to an Existing Class Title (Error Flow)
    Given that we also have the following class in our database:
	    | class_title | class_id | start_time | end_time | description  | location
            | ECSE 420    | class002 | 16:00:00   | 18:00:00 | Test class 2 | Montreal
    And that user "Test Subject" is logged into mySchedule
    When user "Test Subject" changes <class_title> of class <class_id> to "ECSE 420"
    Then the class <class_id> is not updated
    And the system throws an "Duplicate Class Name" error

	    | class_title | class_id | start_time | end_time | description  | location
            | ECSE 429    | class001 | 18:00:00   | 21:00:00 | Test class 1 | Montreal
