Feature: Add New User

As a mySchedule user with an account created
I would like to login into the mySchedule platform
So that I can use the features of the platform and see my courses

Scenario Outline: User with correct username and password (Normal Flow)

Given user <username> with password <password>
When user <username> attempts to login into the system with username <username> and password <password>
Then the user will have access to his courses and the different features

| username   | password     |
|FitzJ       |qxt54237568   |
|TremblayA   |kgw12403952   |
|XuZ         |cbfdre3457    |
|DesjardinsR |jtrqa21074    |
|SmithJ      |ydgrr5d658458 |

Scenario Outline: User attempts to log in with Invalid Credentials (Error Flow)

Given user <username> with password <password>
When user <username> attempts to login into the system with username <attemptedUsername> and password <attemptedPassword>
Then an "Invalid username or password" message is displayed
And the system is informed of the invalid log in attempt


| username    | password      |attemptedUsername| attemptedPassword     |
|FitzJ        |qxt54237568    |FitzJ		|qzt54237568            |
|TremblayA    |kgw124003952   |TremblyA	        |kgw12403952            |
|XuZ          |cbfdre3457     |XuZ		|cbfdre345              |
|DesjardinsR  |jtrqa21074     |DesjardinsR	|Jtraqa21074            |
|SmithJ       |ydgrr5d658458  |SmithK	   	|ydgr5d658458           |

Scenario Outline: User attempts to log in with Invalid Password 3 times in a row (Error Flow)

Given user <username> with password <password>
Given user <username> has failed to log in over 3 times in a row
When user <username> attempts to login into the system with username <attemptedUsername> and password <attemptedPassword>
Then an "Invalid username or password" message is displayed
And the system is informed of the invalid log in attempt
And the user will not be able to attempt to log in for 5 minutes

| username    | password      |attemptedUsername| attemptedPassword     |
|FitzJ        |qxt54237568    |FitzJ		|qzt54237568            |
|TremblayA    |kgw124003952   |TremblyA	        |kgw12403952            |
|XuZ          |cbfdre3457     |XuZ		|cbfdre345              |
|DesjardinsR  |jtrqa21074     |DesjardinsR	|Jtraqa21074            |
|SmithJ       |ydgrr5d658458  |SmithK	   	|ydgr5d658458           |

Scenario Outline: User attempts to log in with empty username or password (Error Flow)

Given user <username> with password <password>
When user <username> attempts to login into the system with username <attemptedUsername> and password <attemptedPassword>
Then a "Username or password is empty" message is displayed

| username    | password      |attemptedUsername| attemptedPassword     |
|FitzJ        |qxt54237568    |FitzJ		|	                |
|TremblayA    |kgw124003952   |		        |kgw12403952            |
|XuZ          |cbfdre3457     | 		|	                |
|DesjardinsR  |jtrqa21074     |DesjardinsR	|	                |
|SmithJ       |ydgrr5d658458  |		   	|ydgr5d658458           |
