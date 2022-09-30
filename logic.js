
__CL.dir = "./classes"; // set the directory or url where the JS file can be found
__CL.extension = ".js"; // set the extension of the loaded file


(async e => {

    // code in here

    await __require("Bar"); // throws exception when file is not found
    await __include("Foo") // throws no exception when file is not found

    this.foo = new Foo();
    this.bar = new Bar();


})();
