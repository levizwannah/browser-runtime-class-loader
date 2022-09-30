# Loading Classes at runtime (Browser) - non module-based JS
The code in `class-loader.js` will load a class with the name `<ClassName>.js`. I wrote this so that I don't include every class JS file using a script tag in the html page but rather allow the consuming JS file to load the class itself during execution. 

## Using the code
Firstly, you must load the `class-loader.js` file in the file that holds your html code followed by any script that consumes classes. For example, the index.html file included the class-loader.js file followed by the logic.js file.  
  
The `class-loader.js` will add a `ClassLoader` object to the `window` global scope called `__CL`. The __CL object has three properties: `extension`, `dir`, and `version`. The `extension` property has a default string value `'.js'` because we are expecting to load a JS file. You can change it to `.ts` or other extensions by calling `__CL.extension = '.My-Extension` anywhere in the consumer scripts. This is seen in the `logic.js` file.   

The `dir` property is used to set where the files loaded are found. For example, the code given above has its classes in the `classes` folder. That is why we set the `__CL.dir` to `'./classes'` in the `logic.js`. The `dir` property can also be ***a url***. However, note that the loader loads the file found at `dir/ClassName.js`; The URL helps if you are loading files from a CDN.

The `version` property is used to load a fresh file when the JS script is updated. This is because the browser caches the response for files like JS, hence if there is a change to the file, it won't be reflected. To override this, set the version of the `__CL` object. This will be appended as `?v=1.0` for example when fetching the JS file.

## finally
Ensure that your code is wrapped in an `async function` - (loading files is async);
In the `logic.js`, you can see:
```
(async e => {

    await __require("Bar"); // throws exception
    await __include("Foo") // throws no exception

    let foo = new Foo(); // locally scoped
    let bar = new Bar(); // locally scoped

    this.foo = new Foo(); // globally scoped
    this.bar = new Bar(); // globally scoped

    function hello(){} // local scope

    this.hello = () => {}; globally scoped function
    this.yes = function(){} globally scoped function
    // ... more code here

})();
```
> The code is wrapped in an anonymous async function that calls it self.  
In summary, the  `__require("ClassName")` and `__include("ClassName")` must be in an `async` function because they must be preceded by `await`.   

## NOTE (Global variables and Functions)
The `this` keyword in the anonymous function refers to the global `window` object. So, to make variables and functions globally scoped so that they can be accessed across multiple scripts, add them to the window object. for example, a variable declared like this, `let foo = new Foo()`, is only accessible inside the  anonymous function. To make the `foo` variable global, i.e it is accessible in html files and other JS files, add it to the window, like so `this.foo = new Foo()`.  
The same is true for functions, a function created like any of the below will be locally scoped.
```
function x(){
    // code
}

let y = () => {};

const z = function(){};
```

To make a function globally scoped, you must use the `this` keyword. For example, `this.x = function(){ // ... code }`

> However, a variable declared like `foo = new Foo()` without the `let` or `var` keyword is globally scoped. Use what works for you.  

> Another Plus is that, you get module behavior without actually using modules.

## JS functions in HTML files
See the below html code
```
<button onclick='doSomething()'>Click Me</button>
```
For `doSomething()` to actually be called, it must be in the window object. Therefore, ensure that `doSomething()` is globally scoped by following the instructions in the previous section.

## Security
I didn't use the `eval` function which is slow and less secure, I used the `Function` constructor which is by magnitude faster and secure.

## Inspiration
> I am lazy ... hate unnecessary redundancy
