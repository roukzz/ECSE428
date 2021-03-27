Feature: Recover Password

    As a user of mySchedule
    I would like to recover my password
    So that I can change my password if I ever forget it

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system

    Scenario Outline: The user successfully receives a reset password email (Normal Flow)
        When  I request password reset with username "<username>" and email "<email>"
        Then  I should receive a confirmation that my operation of resetting password was successful with status code "200"

        Examples:
            | email              | username     |
            | example1@email.com | GordonRamsay |
            | example2@email.com | GordonRamsay |
            | example3@email.com | GordonRamsay |

    Scenario Outline: The user doesn't successfully receives a reset password email (Normal Flow)
        When  I request password reset with username "<username>" and email "<email>"
        Then  I should receive a confirmation that my operation of resetting password was not successful with status code "400"

        Examples:
            | email              | username      |
            | example1@email.com | GordonRamsay2 |
            | example2@email.com | GordonRamsay3 |
            | example3@email.com | GordonRamsay4 |