Feature: Log In

  As a user of mySchedule
  I would like to login into the mySchedule platform
  So that I can use the features of the platform and see my courses

  Scenario Outline: User with correct email and password (Normal Flow)

    Given user with email <email> with password <password>
    When user attempts to login into the system with email <email> and password <password>
    Then the user will have access to his courses and the different features

    Examples:
      | email                             | password     |
      | jason.fitz@mail.mcgill.ca         |qxt54237568   |
      | alphonse.tremblay@mail.mcgill.ca  |kgw12403952   |
      | zao.xu@mail.mcgill.ca             |cbfdre3457    |
      | raphael.desjardins@gmail.com      |jtrqa21074    |
      | john.smith@outlook.com            |ydgrr5d658458 |

  Scenario Outline: User attempts to log in with Invalid Credentials (Error Flow)

    Given user with email <email> with password <password>
    When user attempts to login into the system with email <attemptedEmail> and password <attemptedPassword>
    Then an "Invalid username or password" message is displayed
    And the system is informed of the invalid log in attempt

    Examples:
      | email                             | password      |  attemptedEmail                 | attemptedPassword      |
      | jason.fitz@mail.mcgill.ca         |qxt54237568    | jason.fitz@mail.mcgill.ca 		  | qzt54237568            |
      | alphonse.tremblay@mail.mcgill.ca  |kgw124003952   | alphonse.trembly@mail.mcgill.ca | kgw12403952            |
      | zao.xu@mail.mcgill.ca             |cbfdre3457     | zao.xu@mail.mcgill.ca       		| cbfdre345              |
      | raphael.desjardins@gmail.com      |jtrqa21074     | raphael.desjardins@gmail.com   	| Jtraqa21074            |
      | john.smith@outlook.com            |ydgrr5d658458  | john.smith@outlok.com	   	      | ydgr5d658458           |

  Scenario Outline: User attempts to log in with Invalid Password 3 times in a row (Error Flow)

    Given user with email <email> with password <password>
    Given user has failed to log in over 3 times in a row
    When user attempts to login into the system with email <attemptedEmail> and password <attemptedPassword>
    Then an "Invalid username or password" message is displayed
    And the system is informed of the invalid log in attempt
    And the user will not be able to attempt to log in for 5 minutes

    Examples:
      | email                             | password      |  attemptedEmail                 | attemptedPassword      |
      | jason.fitz@mail.mcgill.ca         |qxt54237568    | jason.fitz@mail.mcgill.ca 		  | qzt54237568            |
      | alphonse.tremblay@mail.mcgill.ca  |kgw124003952   | alphonse.trembly@mail.mcgill.ca | kgw12403952            |
      | zao.xu@mail.mcgill.ca             |cbfdre3457     | zao.xu@mail.mcgill.ca       		| cbfdre345              |
      | raphael.desjardins@gmail.com      |jtrqa21074     | raphael.desjardins@gmail.com   	| Jtraqa21074            |
      | john.smith@outlook.com            |ydgrr5d658458  | john.smith@outlok.com	   	      | ydgr5d658458           |

  Scenario Outline: User attempts to log in with empty username or password (Error Flow)

    Given user with email <email> with password <password>
    When user attempts to login into the system with email <attemptedEmail> and password <attemptedPassword>s
    Then a "Username or password is empty" message is displayed

    Examples:
      | email                             | password      |  attemptedEmail                 | attemptedPassword      |
      | jason.fitz@mail.mcgill.ca         |qxt54237568    | jason.fitz@mail.mcgill.ca 		  |                        |
      | alphonse.tremblay@mail.mcgill.ca  |kgw124003952   |                                 | kgw12403952            |
      | zao.xu@mail.mcgill.ca             |cbfdre3457     |                              		|                        |
      | raphael.desjardins@gmail.com      |jtrqa21074     | raphael.desjardins@gmail.com   	|                        |
      | john.smith@outlook.com            |ydgrr5d658458  |                     	   	      | ydgr5d658458           |
