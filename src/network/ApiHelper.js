// import { Platform } from "react-native";

import RNFS from 'react-native-fs'
import { FileNames, FileEncodingOptions } from '../Utility/Constants';

// Base url for mock json server.
// const API_BASE_ADDRESS =(Platform.OS === "ios") ? 'http://localhost:3000' : 'http://10.0.2.2:8081/';

export default class ApiHelper {
    static userFilePath = RNFS.DocumentDirectoryPath + '/' + FileNames.user_file_name;
    static collectionFilePath = RNFS.DocumentDirectoryPath + '/' + FileNames.collection_file_name;

    // This was done for mock json server
    /*
    static authenticateUser(userCredentials) {
        const uri = API_BASE_ADDRESS + "/users?email=" + userCredentials.email + "&password=" + userCredentials.password;
       return fetch(uri, {
           method: 'GET',
           headers: {
            "Content-Type": "application/json, multipart/form-data"
           },
        });
    }

    static createUser(userDetailsJSON) {
        const uri = API_BASE_ADDRESS + "/users";
       return fetch(uri, {
           method: 'POST',
           headers: {
            "Content-Type": "application/json"
           },
           body: userDetailsJSON,
        });
    }
    */

    static authenticateUser(userCredentials) {
        // read the file, check for any matching object with same email, then respond accordingly
        const promise = new Promise((resolve, reject) => {
            RNFS.readFile(ApiHelper.userFilePath, FileEncodingOptions.utf8)
                .then((rawUserData) => JSON.parse(rawUserData))
                .then((userArray) => {
                    if (userArray != null) {
                        if (userArray.length > 0) {
                            let userObj = userArray.find((user) => (user.email == userCredentials.email))
                            if (userObj != null && userObj != undefined) {
                                if (userObj.password == userCredentials.password) {
                                    setTimeout(() => {
                                        resolve(userObj)
                                    }, 4000)
                                } else {
                                    setTimeout(() => {
                                        reject(new Error("Invalid credentials"))
                                    }, 4000)
                                }
                            } else {
                                console.log("User did not register");
                                setTimeout(() => {
                                    reject(new Error("User with " + userCredentials.email + " not found"))
                                }, 4000)
                            }
                        } else {
                            console.log("userarray length is 0")
                            setTimeout(() => {
                                reject(new Error("User with " + userCredentials.email + " not found"))
                            }, 4000)
                        }
                    } else {
                        console.log("Userarray is undefined")
                        setTimeout(() => {
                            reject(new Error("User records not found"));
                        }, 4000)
                    }
                })
                .catch(e => {
                    reject(new Error("Network Request failed"));
                })

        })
        return promise;
    }

    static createUser(userDetailsJSON) {

        //first read the file --> this will give you a json array then you can insert the new user details
        // Finally rewrite the file.

        const promise = new Promise((resolve, reject) => {
            let newUserArray;
            RNFS.readFile(ApiHelper.userFilePath, FileEncodingOptions.utf8)
                .then((rawUserData) => JSON.parse(rawUserData))
                .then((userArray) => {
                    if (userArray != null) {
                        newUserArray = userArray
                        if (newUserArray.length > 0) {
                            let index = newUserArray.findIndex(user => user.email == userDetailsJSON.email)
                            if (index == -1) {
                                console.log("pushing userDetails to array as no such user exist")
                                newUserArray.push(userDetailsJSON)
                            } else {
                                console.log("Same user already exist")
                                setTimeout(() => {
                                    reject(new Error("User with " + userDetailsJSON.email + " already exist!"))
                                }, 4000)  
                            }
                        } else {
                            console.log("pushing userDetails to array as user count is 0")
                            newUserArray.push(userDetailsJSON)
                        }
                    } else {
                        console.log("Userarray was undefined")
                        setTimeout(() => {
                            reject(new Error("Something went wrong please try after sometime"));
                        }, 4000)
                    }
                })
                .then(() => RNFS.exists(ApiHelper.userFilePath))
                .then((flag) => {
                    if (flag) {
                        console.log("Deleting the existing user.json file")
                        RNFS.unlink(ApiHelper.userFilePath)
                    }
                })
                .then(() => RNFS.writeFile(ApiHelper.userFilePath, JSON.stringify(newUserArray), FileEncodingOptions.utf8))
                .then((success) => {
                    setTimeout(() => {
                        resolve(userDetailsJSON);
                    }, 4000)
                })
                .catch(e => {
                    reject(new Error("Network Request failed"));
                })
        })
        return promise;
    }
}