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
            | username     | password   |
            | Mamadou      | Mamadou    |
            | Benteke0565  | comeonbrod |
            | ImpossibleIs | Nothing    |

    Scenario Outline: Create an account with an incorrect username (Error Flow)

        When a new user attempts to create an account with username "<username>" and password "<password>"
        Then the user will receive an invalid status code "400"
        Then the error message is error '<error>'

        Examples:
            | username | password      | error                                                |
            | a        | iloverawsteak | "username" length must be at least 3 characters long |
            | $        | iamalegend    | "username" length must be at least 3 characters long |
            | cd       | icanthost     | "username" length must be at least 3 characters long |



    Scenario Outline: Create an account with an incorrect password (Error Flow)

        When a new user attempts to create an account with username "<username>" and password "<password>"
        Then the user will receive an invalid status code "400"
        Then the error message is error '<error>'

        Examples:
            | username   | password | error                                                |
            | afasfsafas | dada     | "password" length must be at least 6 characters long |
            | $asffddff  | vfvfg    | "password" length must be at least 6 characters long |
            | cdsdasddd  | a        | "password" length must be at least 6 characters long |





    Scenario Outline: Create an account with an existing username (Error Flow)

        When a new user attempts to create an account with username "<username>" and password "<password>"
        Then the user will receive an invalid status code "400"
        Then the error message is error '<error>'

        Examples:
            | username     | password   | error                  |
            | GordonRamsay | Mamadou    | Student already exists |
            | KeanuReeves  | comeonbrod | Student already exists |
            | OprahWinfrey | Nothing    | Student already exists |
