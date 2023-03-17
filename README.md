# React
## What is the difference between React and React Native?
React is a framework focused on web application development, while React Native is the React version for building mobile application.

## Is React a framework or library?  What is the difference?
Both libraries and frameworks are reusable code written by someone else. Their purpose is to help you solve common problems in easier, less verbose ways.The difference is that a framework will give you the blueprint to build an entire application, whereas a library will give you the solution to a particular problem inside your application. 

More technically, when you use a library, you are in charge of the flow of the application. You are choosing when and where to call the library. When you use a framework, the framework is in charge of the flow, and it will let you know when and where you can provide your input. The developer freedom on that matter will vary from framework to framework, some will be more opinionated, others less. 

Taking all this into consideration, we can definitely classify React as a framework. Moreover, it is considered less opinionated than other frameworks, such as Vue and Angular.

## What are the differences between HTML and JSX?  In a couple of sentences, compare and contrast HTML and JSX.
JSX is a syntax extension of JS; meaning that its developers have taken JS and added more functionality into it. With JSX, we build React components, the framework’s basic unit that returns a UI representation, which on its turn will generate the actual page HTML.

## What makes React attractive for our case?
- It makes creating dynamic web applications easier
- It improves performance due to the virtual DOM
- It is based on reusable components

# React concepts
## Components
Components are self-contained pieces of code that return a visual UI representation, which will then return the actual intended HTML rendered on the page. On the top layer of the application, we have the App component, followed by routers, then by other components. The components are always executed from the top down, in other words, from parent to children.

## Props
Props are key-value pairs of data that we can pass from one component to another. If the elements hold a parent-children relation, props can be passed from one to the other directly. If that is not the case, we just have to ensure to follow React's component tree structure to create the correct data flow.

## State
Component state is the data that we wish to persist inside a component. We can use React's hook useState to set and update state values.

# MERN
## What are a few alternate tech stacks?
- MEAN stack (MongoDB, Express, Angular, Node)
- MEVN (MongoDB, Express, Vue, Node)

## Why is MERN a good choice for full development?
MERN follows the traditional three-tier architectural pattern, including the front-end display tier (React.js), application tier (Express.js and Node.js), and database tier (MongoDB). Using the MERN stack allows developers to use JavaScript only. Express, React and Node  are all JS-based, while MongoDB stores data in JSON, which is easily convertible to JS objects. This high synergy between the four technologies eliminates a few barriers and leverages readability, testing, maintenance, and more. 

## MERN template examples
https://github.com/shashank23p/MERN-CoreUI-Admin
- For building an Admin Dashboard
- Refresh JWT Token login implementation

https://github.com/belferink1996/MERN-template
- Server setup with basic authentication
- Client ready to communicate with the backend
