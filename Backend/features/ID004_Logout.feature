Feature: Logout from an account

    As a user of mySchedule
    I would like to logout from the mySchedule platform
    So that I can safely exit the application

    Background:
        Given user <email> has an existing account that is in good standing
        Given user <email2> has an existing account that is in good standing

    Scenario Outline: Valid User with correct username and password (Normal Flow)

        Given user with email <email> with password <password>
        When user <email> attempts to logout from the application
        Then the user will be logged out

        Examples:
            | email                            | password      |
            | jason.fitz@mail.mcgill.ca        | qxt54237568   |
            | alphonse.tremblay@mail.mcgill.ca | kgw12403952   |
            | zao.xu@mail.mcgill.ca            | cbfdre3457    |
            | raphael.desjardins@gmail.com     | jtrqa21074    |
            | john.smith@outlook.com           | ydgrr5d658458 |

    Scenario Outline: User attempts to login into another account (Alternate Flow)

        Given user with email <email> with password <password>
        When user <email2> attempts to login into the system from the same application with username <email2> and password <password2>
        Then user <email> is logged out of the application
        And the system is available to process the login request

        Examples:
            | email                            | password      | email2                           | password2     |
            | jason.fitz@mail.mcgill.ca        | qxt54237568   | alphonse.tremblay@mail.mcgill.ca | kgw12403952   |
            | alphonse.tremblay@mail.mcgill.ca | kgw12403952   | zao.xu@mail.mcgill.ca            | cbfdre3457    |
            | zao.xu@mail.mcgill.ca            | cbfdre3457    | raphael.desjardins@gmail.com     | jtrqa21074    |
            | raphael.desjardins@gmail.com     | jtrqa21074    | john.smith@outlook.com           | ydgrr5d658458 |
            | john.smith@outlook.com           | ydgrr5d658458 | jason.fitz@mail.mcgill.ca        | qxt54237568   |
