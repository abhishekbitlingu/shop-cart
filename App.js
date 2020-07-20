/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { LogBox } from 'react-native';
import RNFS from 'react-native-fs';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import RootNavigator from './src/navigation/RootNavigator';
import configureStore from './src/redux/Store';
import { FileDummyData, FileEncodingOptions, FileNames } from './src/Utility/Constants';
import { RootSiblingParent } from 'react-native-root-siblings'

LogBox.ignoreAllLogs(true)
const store = configureStore();

const App = () => {
  React.useEffect(() => {
    const createUserJsonFile = async () => {
      const userFilePath = RNFS.DocumentDirectoryPath + '/' + FileNames.user_file_name;
      RNFS.exists(userFilePath)
        .then((flag) => {
          if (!flag) {
            RNFS.writeFile(userFilePath,
              JSON.stringify(FileDummyData.userFile),
              FileEncodingOptions.utf8)
              .then((success) => {
                console.log('USER FILE WRITTEN!');
              })
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    const createCollectionJsonFile = async () => {
      const collectionFilePath = RNFS.DocumentDirectoryPath + '/' + + FileNames.collection_file_name;
      RNFS.exists(collectionFilePath)
        .then((flag) => {
          if (!flag) {
            RNFS.writeFile(collectionFilePath,
              FileDummyData.collectionFile,
              FileEncodingOptions.utf8)
              .then((success) => {
                console.log('COLLECTION FILE WRITTEN!');
              })
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    createUserJsonFile();
    createCollectionJsonFile();
  }, [])
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </RootSiblingParent>

  );
};

export default App;
