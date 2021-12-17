Application for Sample Management of Microbiology lab

Entity of this app:
** WorkSheet > Samples > Paramaters (Method Assignment Sample)

User management:
** Base on Asp.net Core policy based authentication
** Users are divided by 4 departments: Sample receiving, Lab, Manager and Report.
** Each department has 2 "kinds of" role: Header and Staff

Main process:
    //from here WS refer to WorkSheet
    
** Sample receive ==> Create WorkSheet => Lab process => Enter result => result approve
    => export report => email to customer
