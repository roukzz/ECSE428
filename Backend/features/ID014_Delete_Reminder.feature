Feature: Delete a reminder of an existing student

    As a student
    I want to be able to delete a reminder
    So that I can remove a reminder I do not need anymore

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the user with username "GordonRamsay" and password "iloverawsteak" is logged in


    Scenario Outline: The user successfully deletes a reminder (Normal Flow)

        Given that we have the following reminder with rem_title "dinner" and rem_content "dinner with ceo" and rem_date "2021-03-29T13:34:00.000" and I am username "GordonRamsay"
        When  the user "GordonRamsay" attempts to delete the reminder with title "dinner"
        Then  I should receive a confirmation that my operation was very successful with status code "200"



    Scenario Outline: The user successfully delete a reminder without a content (Alternative Flow)

        Given that we have the following reminder with rem_title "dinner2" and rem_content "" and rem_date "2021-03-29T13:34:00.000" and I am username "GordonRamsay"
        When  the user "GordonRamsay" attempts to delete the reminder with title "dinner2"
        Then  I should receive a confirmation that my operation was very successful with status code "200"



    Scenario Outline: The user attempts to delete a reminder that doesn't exist (Error Flow)

        Given that we have the following reminder with rem_title "dinner3" and rem_content "" and rem_date "2021-03-29T13:34:00.000" and I am username "GordonRamsay"
        When  the user "GordonRamsay" attempts to delete the reminder with title "HelloWorld"
        Then  I should receive a confirmation that my operation was not very successful with status code "400"
