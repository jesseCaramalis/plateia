# Plateia
Plateia is a fullstack social media application with users, posts, friends and more. I built this app out as a way to practice my skills in React, using industry standards for project structure and code formatting.
## Live site: https://plateia-front.onrender.com/
You can create your own account or login with:
  - Email: jessec@gmail.com
  - PW: Password1
  
Sometimes I'm fiddling with parts of the project, so Plateia might be down from time to time.

Demo:


https://user-images.githubusercontent.com/101160675/212224597-861704a2-6247-431e-884a-3b4865878f05.mp4


## How It's Made:
**Tech used:** HTML, CSS, JavaScript, Node.js, Express, React, React-Redux + Toolkit

The backend is built in Node.js using Express and MongoDB. File uploads are stored locally using multer, whereas user and post information is stored on the database. JWT with helmet for HTML headers are used in authentication, with bcrypt for password hashing.

The frontend is built with React, using Redux, Redux Toolkit and Persist for state management. This combination is frequently used in real world production of React applications. Material UI was used for all theming and UI components.
Best practices such as scenes components for different pages, functional components and incorporating all CSS in the JSX were used to best represent a production application. The finished product is maintainable and scalable, with comments highlighting various design decision and reasoning behind.

## Lessons Learned

- Persistent state management in React.
- Working with MUI and utilising more components than previous projects, as well as themes.
- Interfacing React with the Express server, particularly using JWT for authentication, and first use of headers. 
- Sending the correctly formatted data to the frontend, and being careful not to expose sensitive data to the client.

## What's next?

The project currently stands as a proof of concept for the components and widgets I've made, and how they come together as a basic framework for the site.
My next additions will be comments and post deletion, integrating with cloudinary for file uploads instead of local storage, and eventual deployment. My contributions to Plateia have slowed down, as I've had an idea for [another project](https://github.com/jesseCaramalis/lookout) working through this one.
