Feature: Delete an account

    As a user of mySchedule
    I want to delete my account
    So that I can remove my personal information from the application when I am done using it

    Background:
        Given The application is running
        And the following users are registered in the system:

        | name          | id    | email                        | password      | type         | school | schoolID  | valid |
        | Gordon Ramsay | GR001 | gordon.ramsay@mail.mcgill.ca | iloverawsteak | partner      | McGill | 260802075 | true  |
        | Keanu Reeves  | KR001 | keanu.reeves@mail.mcgill.ca  | iamalegend    | non-partner  | null   | null      | true  |
        | Oprah Winfrey | OW001 | oprah.winfrey@mail.mcgill.ca | icanthost     | non-partner  | null   | null      | false |

    Scenario: Delete an account (Normal Flow)

        Given user <name> with user id <id> is logged on to the application
        When user requests to delete his account
        And user confirms the request
        Then user is logged out of the application
        And his account and information are deleted from the system

    Scenario: User does not wish to delete his account anymore (Alternative Flow)

        Given user <name> with user id <id> is logged on to the application
        When user requests to delete his account 
        And user does not confirm the request
        Then the account is not deleted

    Scenario: Invalid account (Error Flow)

        Given user <name> with user id <id> is not registered in the system
        When user requests to delete his account
        Then the account is not deleted
        And the system indicates a "account not found" error