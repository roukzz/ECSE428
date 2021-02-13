Feature: Log In

  As a user of mySchedule
  I would like to login into the mySchedule platform
  So that I can use the features of the platform and see my courses

  Scenario Outline: User with correct email and password (Normal Flow)

    Given user with email "<email>" with password "<password>"
    When user attempts to login into the system with email "<email>" and password "<password>"
    Then the user will receive a status code "200"

    Examples:
      | email                            | password      |
      | jason.fitz@mail.mcgill.ca        | qxt54237568   |
      | alphonse.tremblay@mail.mcgill.ca | kgw12403952   |
      | zao.xu@mail.mcgill.ca            | cbfdre3457    |
      | raphael.desjardins@gmail.com     | jtrqa21074    |
      | john.smith@outlook.com           | ydgrr5d658458 |

  Scenario Outline: User attempts to log in with Invalid Password (Error Flow)

    Given user with email "<email>" with password "<password>"
    When user attempts to login into the system with email "<attemptedEmail>" and password "<attemptedPassword>"
    Then an error for password "Invalid password" message is displayed

    Examples:
      | email                            | password      | attemptedEmail                   | attemptedPassword |
      | jason.fitz@mail.mcgill.ca        | qxt54237568   | jason.fitz@mail.mcgill.ca        | qzt54237568       |
      | alphonse.tremblay@mail.mcgill.ca | kgw124003952  | alphonse.tremblay@mail.mcgill.ca | kgw12403952       |
      | zao.xu@mail.mcgill.ca            | cbfdre3457    | zao.xu@mail.mcgill.ca            | cbfdre345         |
      | raphael.desjardins@gmail.com     | jtrqa21074    | raphael.desjardins@gmail.com     | Jtraqa21074       |
      | john.smith@outlook.com           | ydgrr5d658458 | john.smith@outlook.com           | ydgr5d658458      |

  Scenario Outline: User attempts to log in with Invalid Email (Error Flow)

    Given user with email "<email>" with password "<password>"
    When user attempts to login into the system with email "<attemptedEmail>" and password "<attemptedPassword>"
    Then an error for email "Invalid username" message is displayed

    Examples:
      | email                            | password      | attemptedEmail                 | attemptedPassword |
      | jason.fitz@mail.mcgill.ca        | qxt54237568   | jason.fitz@mal.mcgill.ca       | qxt54237568       |
      | alphonse.tremblay@mail.mcgill.ca | kgw124003952  | alphons.trembly@mail.mcgill.ca | kgw124003952      |
      | zao.xu@mail.mcgill.ca            | cbfdre3457    | zao.xu@mail.mcgll.ca           | cbfdre3457        |
      | raphael.desjardins@gmail.com     | jtrqa21074    | raphael.desjardins@gmil.com    | jtrqa21074        |
      | john.smith@outlook.com           | ydgrr5d658458 | john.smith@outlok.com          | ydgrr5d658458     |

  Scenario Outline: User attempts to log in with unaccepted password (Error Flow)

    Given user with email "<email>" with password "<password>"
    When user attempts to login into the system with email "<attemptedEmail>" and password "<attemptedPassword>"
    Then a password validation error "\"password\" length must be at least 6 characters long" message is displayed

    Examples:
      | email                            | password      | attemptedEmail                   | attemptedPassword |
      | jason.fitz@mail.mcgill.ca        | qxt54237568   | jason.fitz@mail.mcgill.ca        | a                 |
      | alphonse.tremblay@mail.mcgill.ca | kgw124003952  | alphonse.tremblay@mail.mcgill.ca | k                 |
      | zao.xu@mail.mcgill.ca            | cbfdre3457    | zao.xu@mail.mcgill.ca            | b                 |
      | raphael.desjardins@gmail.com     | jtrqa21074    | raphael.desjardins@gmail.com     | c                 |
      | john.smith@outlook.com           | ydgrr5d658458 | john.smith@outlook.com           | y                 |

  Scenario Outline: User attempts to log in with unaccepted username (Error Flow)

    Given user with email "<email>" with password "<password>"
    When user attempts to login into the system with email "<attemptedEmail>" and password "<attemptedPassword>"
    Then an email validation error "\"username\" length must be at least 3 characters long" message is displayed

    Examples:
      | email                            | password      | attemptedEmail | attemptedPassword |
      | jason.fitz@mail.mcgill.ca        | qxt54237568   | jf             | qxt54237568       |
      | alphonse.tremblay@mail.mcgill.ca | kgw12403952   | at             | kgw12403952       |
      | zao.xu@mail.mcgill.ca            | cbfdre3457    | zx             | cbfdre3457        |
      | raphael.desjardins@gmail.com     | jtrqa21074    | rd             | jtrqa21074        |
      | john.smith@outlook.com           | ydgrr5d658458 | js             | ydgrr5d658458     |