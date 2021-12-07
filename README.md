# Reactolator

A calculator app made with React.

Table of contents

1. About
2. Hidden features
3. Hurdles during development
4. Development Choices
5. Other

## About

This project was a challenge from Frontend Mentor. They gave me the design files and these user stories:

- See the size of the elements adjust based on their device's screen size
- Perform mathematical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

I added another personal user story which was to only use React. This means no third party extensions, libraries or packages outside React. This also means no Redux.  
For state management, I used the good ol' state pipeline. As the Context API can be too slow for people who type too fast on the calculator.  
Reference: https://github.com/facebook/react/issues/14110#issuecomment-448074060, quote of sebmarkbage (Sebastian Markbage), React Team.

## Hidden Features

There are two hidden features that I would like to point out.

### Keyboard Functionality

The first one is that you can use your Keyboard and the buttons will animate as you type on it. The buttons use keys and not keycodes. This makes it more cross-compatible for other keyboard languages than English and Norwegian. I coded the asterisk (\*) button to work the same way as the "x" button, so that those who don't use the Latin Alphabet will be able to use the keyboard as well.
![Keyboard Layout image](/screenshots/keyboard-layout.png?raw=true "Keyboard hotkeys for most languages that use the Latin alphabet")
<sub>Red are numbers. Blue are operators. Green is the decimal button. Yellow is the DEL, = and RESET buttons.</sub>

### Change theme automatically if the user changes the device theme

The second one is that that the theme will change with the device theme as long as the user never touched the "switch theme" button.

```jsx
const mql = window.matchMedia("(prefers-color-scheme: dark)");

function changeThemeToDevice(e) {
  if (e.matches) {
    setTheme("dark");
  } else if (!e.matches) {
    setTheme("light");
  }
}

useEffect(() => {
  if (!localStorage.getItem("theme")) {
    mql.addEventListener("change", changeThemeToDevice);
  }
  return () => {
    mql.removeEventListener("change", changeThemeToDevice);
  };
}, [mql]);
```

This is done with the "change" event listener, which will be active if the user has no "theme" object in their localStorage. This is one step above the user stories.  
If you want to test this. You will have to clear the localStorage of Reactolator first and then reload it before playing around with your device theme.

## Hurdles during development

No one is perfect. Especially not me. Sometimes the smallest problems can take hours to resolve. Some embarrassing ones are:

- Using a function in useEffect before calling it.
- Not properly removing event listeners (caused bugs with that "hidden feature" of mine).
- And trying to have the calculation logic in the Display component which is a sibling of the Keyboard component (this doesn't work because I use state pipelines).

### Enter keys writes focused elements

The biggest hurdle by far was a problem when using both the mouse and the keyboard on the calculator. A weird problem occurred where if the user clicked on a button and then used the keyboard after, then the enter keys would write that key which was clicked. It makes absolutely no sense, but after a good philosophical walk, I figured that it has something to do with focus and blur, something I didn't see because I had unset those CSS rules.

```jsx
if ("activeElement" in document) document.activeElement.blur();
```

I fixed this quickly by adding the code above which will run after each keyboard keypress.

### Becoming overwhelmed

It is normal to become overwhelmed. Sometimes this is such a big hurdle that it can cause procrastination.  
What overwhelmed me during this project was to figure out how to deal with both the state pipeline and the calculation function. Instead of having all the planning inside my head, I wrote it out on a [FigJam file](https://www.figma.com/file/AsdXLM9VHS3JiSANRDBVuW/ractolator-planning?node-id=0%3A1). This made me see things more clearly so that I could carry on with coding.
![The FigJam plan](/screenshots/figjam-plan.png?raw=true "No one needs all this in their head. Just write it out!")
<sub>The plan doesn't have to be perfect, the goal is to not be overwhelmed anymore.</sub>

There were more problems of course. But they were far easier to get past than the ones I mentioned.

## Development Choices

### Animated Buttons

Design files more than often only show how the site should look without animations. They don't always show how the animations should look, and this one is not an exception.  
In a real world case, I would obviously discuss with the designers to see what their idea is first.  
Anyhow, when I first started to work with the CSS, It was not quite obvious to me that the shadows were supposed to be removed and the button to be translated downward to simulate the button being pushed down. I actually got inspired by [this CodePen by Web Programming UNPAS](https://codepen.io/webprogrammingunpas/pen/wpNKdP), although I made mine more snappy for keyboard users.

### Theme Switch

As far as I know, there are two ways to go about this toggle/switch/button. The first one is to make it so that when the user clicks below the number, the slider will go to that number. The other is to make the knob on the switch just go to the right or left and then start over at the beginning, each time it is clicked.  
I decided to go for the latter because that will make it easier for mobile users.

### An extra line of text on Display

I decided to make the calculations be shown in an extra line above the result number. This is inspired by the official Windows 10 Calculator.  
The reason for why I did this is to make bigger calculations easier to see.
![Improved Display](/screenshots/calculator-display.png?raw=true "My improved display compared to the original")<sub>Left is the original design. Middle is Windows 10's official calculator. Right is my tweak to the design.</sub>

## Other

Found a problem with the code or want to ask a question? Please don't hesitate to create an issue or contact me.
