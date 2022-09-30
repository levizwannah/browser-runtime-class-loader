/**
 * Loads a class
 */
class ClassLoader{
    /**
     * The Directory or URL in which all JS files are located
     */
    dir = ".";

    /**
     * The extension of the files
     */
    extension = ".js";

    /**
     * The version of the files. It will be appended as ?v=1.0 for example
     * This enable fresh reloading if necessary
     */
    version = "1.0.0";

    /**
     * 
     * @param {string} dir Directory from which the file should be loaded
     * @param {string} extension the extension of the file .js by default
     */
    constructor(dir = ".", extension = ".js"){
        this.dir = dir;
        this.extension = extension;
    }

    /**
     * 
     * @param {string} className script name without the .js.
     */
    async require(className){

        if(window[className]) return;

        let response = await fetch(`${this.dir}/${className}${this.extension}?v=${this.version}`);

        let jsCode = await response.text();
        window[className] = Function( `return (${jsCode})`)();
    }

    async include(className){
        try{await this.require(className);} catch(e) {}
    }



}

var __CL = new ClassLoader();

/**
 * Includes a class.
 * @param {string} className name of script to include with out the .js extension. 
 * This will throw an exception when the class file is not found.
 */
async function __require(className){
    return await __CL.require(className);
}

/**
 * Will throw no exception when a class is not found
 * @param {string} className 
 * @returns 
 */
async function __include(className){
    return await __CL.include(className);
}
