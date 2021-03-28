Feature: Create Reminder with Priority Level

  As a user of a mySchedule
  I want to create a a priority level
  So that I can easily identify which reminder is more urgent


  Background:

      Given the following users with username "KeanuReeves" and password "iamalegend" are registered in the system
      Given username "KeanuReeves" and password "iamalegend" is logged in the system mySchedule

      Scenario Outline: The user succesfully creates a reminder with a priority Level (Normal Flow)
          When the user attempts to create a reminder with rem_title "<rem_title>" and rem_content "<rem_content>" and rem_date "<rem_date>" and priority_level "<priority_level>" and I am username "<username>"
          Then  I should receive a confirmation that my operation was very successful with status code "200" for create a reminder with priority level
          Examples:
              | rem_title | rem_content             | rem_date                | username     |  priority_level  |
              | dinner    | dinner with cto         | 2022-03-29T13:34:00.000 | KeanuReeves  |  HIGH            |
              | play      | soccem with the boys    | 2022-03-29T13:34:00.000 | KeanuReeves  |  Low             |
              | assignment | comp                   | 2022-03-29T13:34:00.000 | KeanuReeves  |  Medium          |


      Scenario Outline: The user attempts to create a reminder with priority level  when he is not logged in the mySchedule system (Error Flow)
        Given the user with username "KeanuReeves" is currently not logged in the system
        When the user attempts to create a reminder with rem_title "<rem_title>" and rem_content "<rem_content>" and rem_date "<rem_date>" and priority_level "<priority_level>" and I am username "<username>"
        Then  I should receive a confirmation that my operation was not successful with status code "400" for creation a reminder with priority level
        Examples:
        | rem_title             | rem_content             | rem_date                | username     | priority_level   |
        | doctor appointment    | saint justine           | 2023-03-29T13:34:00.000 | KeanuReeves  |  High            |
        | reminder 2            | content 2               | 2024-03-29T13:34:00.000 | KeanuReeves  |  Low             |
        | reminder 3            | content 3               | 2025-03-29T13:34:00.000 | KeanuReeves  |  Medium          |
