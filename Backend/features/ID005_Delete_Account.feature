Feature: Delete an account

    As a user of mySchedule
    I want to delete my account
    So that I can remove my personal information from the application when I am done using it

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the following users with username "KeanuReeves" and password "iamalegend" are registered in the system
        Given the following users with username "OprahWinfrey" and password "icanthost" are registered in the system

    Scenario Outline: Delete an account of an existing user (Normal Flow)

        Given user with an username "<username>" with a password "<password>" is logged in
        When user attempts to delete his account with username "<username>"
        Then the user will receive a success status code "200"

        Examples:
            | username     | password      |
            | GordonRamsay | iloverawsteak |
            | KeanuReeves  | iamalegend    |
            | OprahWinfrey | icanthost     |

    Scenario Outline: Delete an account of without being logged in (Error Flow)

        Given user with username "username" with password "password" is not logged in
        When user attempts to delete his account with username "username"
        Then the user will receive a status code "401"

        Examples:
            | username     | password   |
            | Keanu Reeves | iamalegend |
