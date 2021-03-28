Feature: Customize Schedule

    As a user of mySchedule
    I want to customize my preferences
    So that I can adapt the website to how I want it

    Background:
        Given the following users with username "GordonRamsay" and password "iloverawsteak" are registered in the system
        Given the user with an username "GordonRamsay" and password "iloverawsteak" is logged in

    Scenario Outline: The user successfully changes his preferences  (Normal Flow)

        When the user attemps to change is preferences to "<isNightMode>","<textSize>","<isColorBlind>", and "<Language>"
        Then  the current user should receive a confirmation that the operation was successful with status code "200"
        And the new preferences "<isNightMode>","<textSize>","<isColorBlind>", and "<Language>" shall be saved

        Examples:
            | isNightMode | textSize | isColorBlind | Language |
            | true        | Small    | true         | English  |
            | false       | Medium   | true         | French   |
            | false       | Large    | false        | Spanish  |


    Scenario Outline: The user changes the language to a non supported one (Alternate Flow)

        When the user attemps to change is preferences to "<isNightMode>","<textSize>","<isColorBlind>", and "<Language>"
        Then  the user shall be notified that the language is not supported, but their request was noted

        Examples:
            | isNightMode | textSize | isColorBlind | Language |
            | true        | Small    | true         | Lemerig  |
            | false       | Medium   | true         | Kaixana  |
            | false       | Large    | false        | Taushiro |


    Scenario Outline: The user changes the language to a non-recognizable language(Error Flow)

        When the user attemps to change is preferences to "<isNightMode>","<textSize>","<isColorBlind>", and "<Language>"
        Then  the user shall be notified that the requested language is not known.

        Examples:
            | isNightMode | textSize | isColorBlind | Language |
            | true        | Small    | true         | abc      |
            | false       | Medium   | true         | def      |
            | false       | Large    | false        | ghi      |