import SearchStrInDb from "../modules/search.js"
import SearchStrInDbAndChecker from "../modules/read-files-and-checker.js";

export default [
    {
        code: 1,
        run : SearchStrInDb,
        name:'Search in db'
    },
    {
        code: 2,
        run : SearchStrInDbAndChecker,
        name:'checker logns'
    },

    {
        code: 0,
        run : () => {
            console.log("bye bye");
            process.exit()
        },
        name:'exit'
    }
]