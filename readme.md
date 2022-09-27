# Loading Classes at runtime (Browser) - non module-based JS
The code in `class-loader.js` will load a class with the name `<ClassName>.js`. I wrote this so that I don't include every class JS file using a script tag in the html page but rather allow the consuming JS file to load the class itself doing execution. 

## Using the code
Firstly, you must load the `class-loader.js` file in the file that holds your html code followed by any script that consumes classes. For example, the index.html file included the class-loader.js file followed by the logic.js file.  
  
The `class-loader.js` will add a `ClassLoader` object to the `window` global scope called `__CL`. The __CL object contains two properties: `extension` and `dir`. The `extension` property has a default string value `'.js'` because we are expecting to load a JS file. You can change it to `.ts` or other extensions by calling `__CL.extension = '.My-Extension` anywhere in the consumer scripts. This is seen in the `logic.js` file.   

The `dir` property is used to set where the files loaded are found. For example, the code given above has its classes in the `classes` folder. That is why we set the `__CL.dir` to `'./classes'` in the `logic.js`. The `dir` property can also be ***a url***. However, note that the loader loads the file found at `dir/ClassName.js`; The URL helps if you are loading files from a CDN.

## finally
Ensure that your code is wrapped in an `async function` - (loading files is async);
In the `logic.js`, you can see:
```
(async e => {

    await __require("Bar"); // throws exception
    await __include("Foo") // throws no exception

    let foo = new Foo();
    let bar = new Bar();

    // ... more code here

})();
```
> The code is wrapped in an anonymous async function that calls it self.  
In summary, the  `await __require("ClassName")` and `await __include("ClassName")` must be in an `async` function because they must be preceded by `await`.  

## Security
I didn't use the `eval` function which is slow and less secure, I used the `Function` constructor which is by magnitude faster and secure.

## Inspiration
> I am lazy ... hate unnecessary redundancy