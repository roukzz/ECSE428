Feature: Register as a New User(Non-Partner-University Student)

    As a nonPartnerUniversityStudent 
    I want to register as a new user
    So that I can start using mySchedule application

    Background:
        Given a mySchedule system exists
        Given the following users exist in the system:
            | name           |         email            |     password     | school | studentID |
            | max ba         |existing@hotmail.com      |qxt54237568       |null    |null       |
            | bal wa         |existing2@hotmail.com     |kgw124003952      |null    |null       |

    Scenario Outline: Registering with a valid email and a valid password

        Given a name <name>, email <email> with password <password>, school <school> and studentID <studentID>
        When user with corresponding email <email> attempts to register as a Non-Partner-University with email <email> and password<password>
        Then the user will be successfully registered in the system
        Then the number of users will be incremented by one in the system

        | name           |         email           |     password     | school | studentID |
        | mad ba         |okhello@hotmail.com      |qxt54237568       |null    |null       |
        | baql wa        |myCourses@gmail.com      |kgw124003952      |null    |null       |
        | masx ba        |password@hotmail.com     |cbfdre3457        |null    |null       |
        | baxl wa        |ronald@yahoo.fr          |jtrqa21074        |null    |null       |
        | bazl wa        |mySchedule@yahoo.com     |ydgrr5d658458     |null    |null       |

    Scenario Outline: Registering with an invalid email OR invalid password

        Given email <email> with password <password>
        When user with corresponding email <email> attempts to register as a Non-Partner-University with email <email> , password <password>, name <name>, school <school> and studentID <studentID>
        Then an error message <errorMessage> shall be raised
        Then the number of users remain the same in the system

        | name           |         email           |     password     | school | studentID|  errorMessage                                     |
        | fxa dd         |okmine@hotmail.com       |qxt54237568       |null    |null      |"The password must be between 4 to 14 characters"  |
        | ffwqd wa       |existing@hotmail.com     |kgw124003952      |null    |null      |"The email already exists"                         |
        | asdq ba        |password                 |cbfdre3457        |null    |null      |"The email is incorrect"                           |
        | dfasd wa       |existing2@hotmail.com    |jtrqa21074        |null    |null      |"The email already exists"                         |
        | jie wa         |mySketching@yahoo.com    |ydgrr5d6584fewfwe |null    |null      |"The password must be between 4 to 14 characters"  |
        | klas wa        |こんにちは@hotmail.com    |fewf123123        |null    |null      |"The email must have alphanumeric characters"      |
        | fewas bwaa     |manger@hotmail.com       |الطعام            |null    |null      |"The password must have alphanumeric characters"   |
        |الطعام          |mdjiqdwdwdd@yahoo.com    |ydgrr5d65         |null    |null      |"The name must have alphanumeric characters"       |
        | mawo wa        |mySketching@yahoo.com    |ydgrr5d65         |mcgill |234123421  |"Must register as a non-partner university student"|





                                                 


