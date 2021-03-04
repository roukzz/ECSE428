Feature: Delete a class from profile

    As a user
    I want to be able to delete a class from my profile
    So that I can remove class that I do not need anymore

    Background:
        Given The application is running
        And   the following class exist:
            | title    |
            | ECSE 429 |
            | ECSE 420 |

    Scenario Outline: The user successfully delete one class from its profile  (Normal Flow)

        Given I want to delete a class with title <title>
        When  I select a class with title <title>
        And   I delete the class <title> from my profile
        Then  I should receive a confirmation that my operation was successful
        And   class <title> should not be in my profile
        And   my profile  should contain <class_counter> class

        Examples:
            | title    | class_counter |
            | ECSE 429 |      1        |
            | ECSE 420 |      0        |



    Scenario Outline: The user successfully delete two class from its profile (Alternative Flow)

        Given  I want to delete two classes at one time
        When  I select a class with title "ECSE 429" and class "ECSE420"
        And   I delete the class with title "ECSE 429" and class "ECSE420"
        Then  I should receive a confirmation that my operation was successful
        And   class "ECSE429" and class "ECSE 420" should not be in my profile
        And   my profile should contain 0 class


    Scenario Outline: The user attempts to delete a class that doesn't exist  (Error Flow)

        Given I want to delete a class with title <title>
        When  I select a class with title <title>
        And   I delete the class with title <title> from my profile
        Then  I should receive an error informing me that the requested resource was not found


        Examples:
            | title   |
            | ECSE 202 |
            | GEOG 560 |
            | ATOC 360 |
