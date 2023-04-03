# React application: Todo-list "Gradient"

Application Todo-list "Gradient" is developed using JavaScript, ReactJS, Firebase, React Router, and CSS.
My project demonstrates my familiarity with modern web development technologies such as ReactJS, Firebase, and React Router.
- I followed best practices for structuring a React application, such as using separate files for each UI component and keeping their CSS styles close to improve maintainability and reduce redundancy.
- I implemented global state management using the Context API, which shows my ability to design and implement complex data structures and manage data flow in a React application.
- Additionally, my project integrates with Firebase for authentication and database functionality, demonstrating my ability to work with external APIs and services.
- I paid attention to detail in terms of UI design and functionality, such as the ability to switch between light and dark themes, and the use of custom React hooks to extract and reuse logic.
- Overall, my project showcases my skills and understanding of modern web development technologies and best practices, which can help me stand out to potential employers.

## Architecture
**src** folder
- **Components** folder contains all dynamic React Components required to build a web page, according to best practices, separate files are created for each UI component and have their own folder to keep their CSS styles close in order to quickly find and update styles. Each component was designed to correspond to KISS and DRY principles so that it is easy to debug, maintain, extend and reuse them wherever needed to avoid redundancy.
- **UI** folder contains React Components with no data-specific logic implementation. It holds UI Components which return static JSX and may be used in any other component to improve visuals.
- **Context** folder hold functionality to pass data through the component tree without having to pass props down manually at every level. Therefore, for the latest functionality, there are three types of data that is required globally: 
  - **Authorization Context** - to pass data for user authorization such as user email and password, registration, password reset and logout information.
  - **Theme Context** - to pass data required to define whether to use dark or light theme colour for styling.
  - **Todo Context** - to pass data with TODO List items.
- **hooks** folder keeps functionality with custom React hooks separated in order to provide easy access to reusable functions with extracted component logic.
  - **useTodoCRUD.js** file contains logic to retrieve, process and update data.
  - **pages** folder currently contains PrivateRoute.js which is used as a wrapper for any React Component which can be displayed for authorized users only.
- **firebase.js** file contains the initialization of the Firebase Realtime Database and Firebase Authorization functionality. API keys are exposed, however, it is impossible to use them from any other domain.
