Feature: Logout from an account

    As a mySchedule user with an account created
    I would like to logout from the mySchedule platform
    So that I can safely exit the application

    Background:
        Given users <username> and <username2> have existing accounts that are in good standing

    Scenario Outline: Valid User with correct username and password (Normal Flow)

        Given user <username> with password <password> is logged in
        When user <username> attempts to logout from the application 
        Then the user will be logged out 

        Examples:
            |username    |password      |
            |FitzJ       |qxt54237568   |
            |TremblayA   |kgw12403952   |
            |XuZ         |cbfdre3457    |
            |DesjardinsR |jtrqa21074    |
            |SmithJ      |ydgrr5d658458 |

    Scenario Outline: User attempts to login into another account (Alternate Flow)

        Given user <username> with password <password> is logged in
        When user <username2> attempts to login into the system from the same application with username <username2> and password <password2>
        Then user <username> is logged out of the application
        And the system is available to process the login request

        Examples:
            |username     |password       |username2	|password2    	|
            |FitzJ        |qxt54237568    |SmithK		|ydgr5d658458   |
            |TremblayA    |kgw124003952   |FitzJ	    |qxt54237568    |
            |XuZ          |cbfdre3457     |TremblayA	|kgw124003952   |
            |DesjardinsR  |jtrqa21074     |XuZ		    |cbfdre3457     |
            |SmithJ       |ydgrr5d658458  |DesjardinsR	|jtrqa21074     |
