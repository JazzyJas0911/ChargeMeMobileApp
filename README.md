# ChargeMe Mobile Application Simulation

## A Little Information About This Mobile Application
ChargeMe is a mobile application that is designed to help friends, family, and acquaintances make the experience of splitting a bill easier, quicker, and more efficient. With features such as making payments and bill split, users can choose how they want to split a bill and divide the total bill amount between each user rather than making multiple individual transactions. The goal is to make the transaction process faster and more efficient. For example, the user can scan receipts or their debit cards. This will allow the application to read the text and save the data to the database rather than making the users manually input all of the information. By having the item names and prices uploaded to the application database instantly, the inconveniences of splitting bills are eliminated; therefore, making this whole process go by seamlessly.

The main objective in developing the ChargeMe App is to solve the issue of the strenuous process of splitting an invoice, bill, or an order with others. By creating a service that will make splitting complicated bills with parties easier, it will also improve the efficiency of restaurant eating and trip planning as well. By instantly record invoice data and document debt on others, the app allows users to save hours of valuable time and ensures that their experience will be a lot more convenient.

## Getting Started with React Native Application Development

1. Run this command to locally package, serve, and publish projects with expo (does not matter if you run this command in the project directory):
```
$ npm install expo-cli --global
```
2. Install all of the elements of React Native:
```
$ npm install react-native-elements --save
```
3. Install node-modules folder:
```
$ npm install
```
4. Install dependencies:
```
$ npm install --save firebase
$ npm install react-navigation@2.6.2
$ npm i native-base@2.8.2  
$ npm install react-native-form-validator --save
$ npm install react-native-masked-text --save
$ npm install --save moment react-moment
$ npm i react-native-awesome-alerts --save
$ npm install react-native-circle-checkbox --save
$ npm install --save react-native-searchable-dropdown
$ npm install --save react-native-material-dropdown
$ npm i react-native-ui-stepper
$ npm install react-native-datepicker --save
$ npm install --save react-native-modal

$ npm install --save react-native-push-notification
$ react-native link react-native-push-notification
```
5. Fix errors within react-native-vector-icons
```
$ npm uninstall react-native-vector-icons --save
$ npm install react-native-vector-icons --save
```
6. Install expo on your iOS/Android device or use an Android emulator like GenyMotion or iOS Simulator in Xcode

#### Emulate in Xcode iOS simulator
i.
   - right click the Xcode icon
  - hover over "Open Developer Tool"
  - left click "Simulator"
  - allow iOS simulator to boot up

ii. cd into the project directory and run the following command in the folder:
```
$ expo run
```
iii. Go back to the simulator and allow Expo to be installed on the emulator

iv. The appliction will open and you may navigate through the pages
- [iOS Simulator Gestures](https://www.dummies.com/web-design-development/mobile-apps/how-to-make-gestures-on-the-ios-simulator/)
- [Android Emulator Gestures](https://docs.genymotion.com/latest/Content/03_Virtual_Devices/Interacting_with_virtual_devices/Multi_touch_simulation.htm)

[Expo Documentation](https://docs.expo.io/versions/latest/introduction/installation/)

#### Emulate on iOS
i. cd into the project directory and run the following command in the folder:
```
$ expo run
```
ii. Download the Expo Client App

iii. Set the QR code is on Tunnel or LAN
-   Tunnel seems to run faster for some iOS devices

iv. Scan QR code through QR code scanner or iOS camera

v. Open application through Expo Client

## Troubleshooting
### Error Running (OSX):
```
$ expo start
```
#### Error Message:
> Error installing or running app. Error: Command failed: osascript -e tell app "System Events" to count processes whose name is "Simulator"
> execution error: Not authorized to send Apple events to System Events

Go to:
> Settings -> Security & Privacy -> Privacy -> Automation -> Privacy tab
check the "System Events" checkbox
