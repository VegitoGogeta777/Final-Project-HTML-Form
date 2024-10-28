Title: Raw Material Management

Description:

It is a Project that is done in both HTML and JavaScript. It is a Form where the entered details are stored in the "JsonPowerDB" Database. A peculiar feature about this project is the buttons used in the form. The Form has 9 Buttons namely 'New', 'Save', 'Edit', 'Change', 'Reset', 'First', 'Previous', 'Next', 'Last'. The 'New' and 'Edit' buttons are enabled at default, while all the other buttons are disabled. If a new record needs to be inserted, the 'New' button needs to be pushed, if an already existing data needs to be updated, the 'Edit' button needs to be pushed. The 'Save' button is enabled when 'New' button is pushed and the 'Change' button is enabled when the 'Edit' button is pushed to submit changes in both the scenarios. the buttons namely , 'First', 'Previous', 'Next', 'Last' are used to naviagte through records in the database. The 'First' button and 'Previous' button is enabled at default and when during Navigation and it works as such.

There 4 such Pages named for the above functions named "Item Inventory Management" , "Inward Page" , "Outward Page" , "Item Report Page" ( where Item report Page only navigates through the records.

There is a Video Demonstration for the project

Benefits of using JsonPowerDB: Using JsonPowerDB (JPDB) in the above project offers several advantages, including its schema-free nature, which allows flexibility in storing student data without predefined structures. The built-in REST APIs simplify database interactions, making it easy to connect your frontend directly to the database with minimal code. This enables quick operations like inserting, updating, or retrieving student records in real-time with high performance.

Additionally, JPDB provides primary key support, ensuring unique identification of records, and works seamlessly with JSON, reducing the need for data transformation. Its low setup requirements, security through connection tokens, and scalability make it an ideal choice for lightweight applications, offering both speed and convenience for real-time data management.

Release History: Raw Material Management

Here’s the build history, with version numbers and a realistic timeline over a one-week period, including the final video demonstration and GitHub upload:

**Project: Raw Material Management System - Build History**

**Version 1.0 - Initial Build (Day 1)**
- **Date**: October 20, 2024
- **Files Involved**: `index.html`, `indexa.js`
- **Features Added**:
  - Basic setup for the data entry form using HTML and Bootstrap for styling.
  - Form fields for capturing raw material data: ID, Name, Unit of Measurement, and Quantity.
  - JavaScript validation to ensure completeness of data.
  - Initial form reset and setup functions.

**Version 1.1 - Enhanced Raw Material Data Entry with Database Connectivity (Day 2-3)**
- **Date**: October 21-22, 2024
- **Files Involved**: `index1.html`, `indexb.js`
- **Features Added**:
  - Integrated `Login2Xplore` API with `JsonPowerDB` for database connectivity.
  - CRUD operations implemented using the `PUT`, `GET`, and `UPDATE` requests.
  - Enhanced validation for all fields before saving.
  - Reset button to clear form fields and manage button states effectively.
  - Improved user experience with control over form states post-operation.

**Version 1.2 - Navigation and Sequential Data Retrieval (Day 4-5)**
- **Date**: October 23-24, 2024
- **Files Involved**: `index2.html`, `indexc.js`
- **Features Added**:
  - Added `Next`, `Previous`, `First`, and `Last` navigation buttons for sequential data retrieval.
  - Local storage integration to track record positions (first, last, and current record numbers).
  - Updated `showData` function for seamless navigation with real-time data updates.
  - Enhanced form reset and disabling features for smooth data handling and user flow.

**Version 1.3 - Item Report Form with Additional Data Retrieval (Day 6)**
- **Date**: October 25, 2024
- **Files Involved**: `index3.html`, `indexd.js`
- **Features Added**:
  - Implemented an Item Report Form for comprehensive data reporting.
  - Advanced navigation tracking for `First` and `Last` records, with accurate button disabling.
  - `editData` and `changeData` functions for editing and updating records in the database.
  - Polished form state management, ensuring proper control over data entry, editing, and navigation functionalities.

**Version 1.4 - Video Demonstration and GitHub Upload (Day 7)**
- **Date**: October 26, 2024
- **Finalization**:
  - Recorded a video demonstration of the project, showcasing data entry, navigation, editing, and reporting features.
  - Uploaded the final project code, with detailed documentation, to GitHub for public access and version control.
  - Added README file on GitHub with project details, setup instructions, and a link to the video demonstration.

Completion Time: 1 Week

Project Status: Completed
