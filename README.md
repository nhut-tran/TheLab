## Application for Sample Management of Microbiology lab

Entity model of this app:

WorkSheets > Samples > Paramaters (Method Assignment Sample)

WorkSheet content infomation of group of samples of a customer. Base on worksheet lab will perform testing activiites.
Sample content infomation of sample like: paramater, method

User management:
** Base on Asp.net Core policy based authentication and authourization
** Users are divided by 4 departments: Sample receiving, Lab, Manager and Report.
\*\* Each department has 2 "kinds of" role: Header and Staff

1. Receiving department issue worksheet base on sample and customer info. Header is responsible for verify worksheet.
2. Worksheet after verified by Receiving department can be see Lab. Lab header is responsible for verifying worksheet and decide to accept or reject back to receiving deparment
3. Lab enter result. Lab header verify result
4. Lab manager verify

Main process (from here WS refer to WorkSheet)

\*\* Sample receive ==> Create WorkSheet => Lab process => Enter result => result approve
=> export report => email to customer

## Tech stack
+ Backend:
  - Asp.net core
  - EF core
  - PostgreSQL
+ Frontend:
  - React.js
  - Mobx
  - Styled component
