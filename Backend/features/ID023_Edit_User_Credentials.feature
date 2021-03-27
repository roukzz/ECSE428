Feature: Edit User Credentials

    As a user
    I want to edit my user credentials
    So that I can change my password in the case of a leak

    Background:
        Given the following user "caillou", "caillou@mail.mcgill.ca" and password "qxt54237568" is registered in the system
          And the user is logged in

    Scenario Outline: The user successfully updates their password and email (Normal Flow)
        Given the user wants to update their password to "QXT54237568" and their email to "caillou2@mail.mcgill.ca"
        Then the system updates the credentials and returns a "Your info has been updated" message
    
    Scenario Outline: The user tries to update their credentials with invalid values (Error Flow)
        Given the user wants to update their password to "QXT" and their email to "caillou2@mail.mcgill.ca"
        Then the system does not update the credentials due to '"newPassword" length must be at least 6 characters long' error
