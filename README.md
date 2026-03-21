# Calculator
This program is designed to perform a wide range of aritmetic calculations with a clean, intuitive interface. Users can enter numbers and choose from the 4 core arithmetic operations: addition, subtraction, multiplication, and division. The calculator supports both integer numbers as well as decimals, allowing for more versatile calculations to be made. 

Beyond basic functionality, the layout and visual design were inspired by the default Apple Calculator, featuring a modern, minimalist aesthetic with clearly defined buttons and a bold display. The interface was build using Java Swing, with custom colors, fonts, and button styling to closely match the smooth, polished feel of a real mobile calculator. 

What this project does:

This was a fully-deisigned scientific calculator that was built in java that performs core arithmetic operations, some of them including: addition, subtraction, multiplication, and division. The user can also add more numbers to the expression instead of just 2. If they want, there is decimals, parentheses, and chained expressions that the user can use to calculate. Some of the features that make this calculator unique is that based on what mode(dark or light), the user prefers, they can toggle between dark and light. The program also includes additional features such as percentage calculations, sign toggling(+/-), square root calculations, and a backspace key for correcting input. These enhancements make the calculator more practical and user-friendly, while also demonstrating thoughtful UI design and event-driven programming. I kept the design organized by keeping the buttons together and numbers, making it easy to navigate and use. 

Why this projact was made:

I wanted to build a program that would help me to practice java GUI development using swing. This app heavily relies on UI design, so being able to build an app that felt visually appealing was important to me. I also wanted to challenge myself with parsing and evaluating mathematical expressions, helping me debug situations that were difficult at times. The main leading reason behind the building of this app was to build a complete, interactive, and visually project that was successfully accomplished. 

How I made this project:

I started with the layout of this by setting up frames, panels, buttons, and labels. I first planned it out on paper how I wanted the layout of this project before I started with the UI design of the calculator. Using the grid layout was very useful because it helped me achieve a clear, organized and consistent grid to layout all the buttons. I wanted to mimic the Apple calculator so I customed the colors and fonts to make a similar aesthetic. Adding action listeners and event listeners helped me form the cause and effect relationship of what do I want the calculator to do when the user presses this button? Adding helper method helped me achieve the formatting for numbers, handling the backspace, and squaring expressions or numbers. I tested and refined my layout to ensure smooth interaction and code readability. I separated display text from the internal expression string to keep the UI formatting clean while maintaining accurate calculations. I created a custom evaluator to parse and compute expressions after discovering that modern Java versions removed the built-in JavaScript engine. When evaluating trigonometric functions, I first converted the inputs from degrees to radians to match Java's math library requirements. 

What I struggled with/learned:

As I ran tests, the result would often be error or it wouldn't print anything. This was the result from missing brackets, invalid expressions, or operator precedance. I had to debug the NullPointerException errors that were caused by the missing ScriptEngine and had to trace the messages back to the main cause of of the modern java versions. I had to fix many of the UI issues that were caused by layout incosistencies, missing brackets, or braces. When I created the custom math evaluator from scratch, I realized that the ScriptEngine was not available, which caused me to have to rewrite many of the methods inside of the constructor to match the layout and fix the main causing issues. 

This helped me learn:
 - how to parse and evaluate mathematical expressions manually using recursive descent parsing
 - debugging complex java errors and being able to trace code back and isolate code causing errors
 - designing UI layout that made the design look organized, clean, and polished
 - approaching a problem iteratively through building the design layout, adding logic, and then refining behavior
