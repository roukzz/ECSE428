Feature: Delete an account

As a user of mySchedule
I want to delete my account
So that I can remove my personal information from the application when I am done using it

Scenario: Delete an account (Normal Flow)

Given user <Gordon Ramsay> with user id <GR001> is logged on to the application

| name          | id    | email                        | password      | type         | school | schoolID  |
| Gordon Ramsay | GR001 | gordon.ramsay@mail.mcgill.ca | iloverawsteak | partner      | McGill | 260802075 |
| Keanu Reeves  | KR001 | keanu.reeves@mail.mcgill.ca  | iamalegend    | non-partner  | null   | null      |

When user requests to delete his account
Then user is logged out of the application
And his account and information are deleted from the system

| name          | id    | email                        | password      | type         | school | schoolID  |
| Keanu Reeves  | KR001 | keanu.reeves@mail.mcgill.ca  | iamalegend    | non-partner  | null   | null      |

Scenario: Invalid account (Error Flow)

Given <Gordon Ramsay> with user id <GR001> is not registered in the system
When <Gordon Ramsay> requests to delete his account
Then the account is not deleted
And the system indicates a "account not found" error