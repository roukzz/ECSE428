Feature: Create an account

    As a new user of mySchedule
    I want to create an account
    So that I can start using my application

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the following users with username "KeanuReeves" and password "iamalegend" are registered in the system
        Given the following users with username "OprahWinfrey" and password "icanthost" are registered in the system

    Scenario Outline: Create an account of an existing user (Normal Flow)

        When a new user attempts to create an account with username "<username>" and password "<password>"
        Then the user will receive a success status code "200"

        Examples:
            | username     | password      | 
            | Mamadou      | Mamadou       | 
            | Benteke0565  | comeonbrod    |
            | ImpossibleIs | Nothing       |

    Scenario Outline: Create an account with an incorrect username (Error Flow)

        When a new user attempts to create an account with username "<username>" and password "<password>"
        Then the user will receive a success status code "400" with error message "<error>"

        Examples:
            | username     | password      | error |
            | a            | iloverawsteak | gg    | 
            | $            | iamalegend    | gg    |
            | cd           | icanthost     | gg    |



    Scenario Outline: Create an account with an existing username (Error Flow)

        When a new user attempts to create an account with username "<username>" and password "<password>"
        Then the user will receive a success status code "400" with error message "<error>"

        Examples:
            | username     | password      | error |
            | afasfsafas   | Mamadou       | gg    |
            | $asffddff    | comeonbrod    | gg    |
            | cdsdasddd    | Nothing       | gg    |





    Scenario Outline: Create an account with an existing username (Error Flow)

        When a new user attempts to create an account with username "<username>" and password "<password>"
        Then the user will receive a success status code "400" with error message "<error>"

        Examples:
            | username     | password      | error                 |    
            | GordonRamsay | Mamadou       | Student already exist |
            | KeanuReeves  | comeonbrod    | Student already exist |
            | OprahWinfrey | Nothing       | Student already exist |
