Feature: Delete a class from profile

    As a user
    I want to be able to delete a class from my profile
    So that I can remove class that I do not need anymore


    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the user with an username "GordonRamsay" and password "iloverawsteak" is logged in
        Given that we have the following class with title "COMP251" and description "ALGO&DS" and startTime "2021-03-29T13:34:00.000" and endTime "2021-05-29T13:34:00.000" and I am username "GordonRamsay"


    Scenario Outline: The user successfully delete one class from its profile  (Normal Flow)

        When the user attemps to delete a class with title "<title>" and the user is "<username>"
        Then  the current user should receive a confirmation that the operation was successful with status code "200"

        Examples:
            | title   | username     |
            | COMP251 | GordonRamsay |


    Scenario Outline: The user attempts to delete a class that doesn't exist  (Error Flow)

        When the user attemps to delete a class with title "<title>" and the user is "<username>"
        Then  the current user should receive a confirmation that the operation was not successful with status code "400"

        Examples:
            | title    | username     |
            | ECSE 202 | GordonRamsay |
            | GEOG 560 | GordonRamsay |
            | ATOC 360 | GordonRamsay |
