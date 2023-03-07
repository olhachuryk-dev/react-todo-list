# React application: Todo-list "Gradient"

Application Todo-list "Gradient" is developed using JavaScript, ReactJS, Firebase, React Router, CSS .

## Architecture
**src** folder
- **Components** folder contains all dynamic React Components required to build a web-page, according to best practices, separate files are created for each UI component and has its own folder to keep its CSS styles close in order to quickly find and update styles. Each component was designed to correspond KISS and DRY principles, so that it is easy to debug, maintain, extend and reuse them wherever needed to avoid redundancy.
- **UI** folder contains React Components with no data-specific logic implementation. It holds UI Components which return static JSX and may be used in any other component to improve visuals.
- **Context** folder hold functionality to pass data through the component tree without having to pass props down manually at every level. Therefore, for the latest functionality there are three types of data that is required globally: 
  - **Authorization Context** - to pass data for user authorization such as user email and password, registration, password reset and logout information.
  - **Theme Context** - to pass data required to define whether to use dark or light theme color for stylilng.
  - **Todo Context** - to pass data with TODO List items.
- **hooks** folder keeps functionality with custom React hooks separated in order to provide easy access to reusable functions with extracted component logic.
  - **useTodoCRUD.js** file contains logic to retrieve, process and update data.
  - **pages** folder currently contains PrivateRoute.js which is used as a wrapper for any React Component which can be displayed for authorized users only.
- **firebase.js** file contains initalization of Firebase Realtime Database and Firebase Authorizatoin functionality. API keys are exposed, however, it is impossible to use it from any other domain.
