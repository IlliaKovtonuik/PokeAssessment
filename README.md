# PokeDexAssessment

## Changelog
- Fixed rendering on the Skins screen, elements are now aligned.
- Added sorting on the Moves screen for a better UI experience.
- Slightly reworked rendering on the About page, combining DOM components with React Native elements.
- Added KeyboardAvoidingView for improved interaction with search and keyboard.
- Extracted server requests into separate hooks.
- Created a context to pass data to components instead of using props.
- Replaced Grid with Grid 2.0
- Fixed the search field; it is now fully clickable.


## Get started
1. Clone project

   ```bash
      git clone https://github.com/E3lleyyaa/PokeDexAssessment.git
      ```
2. Enter folder
   ```bash
      cd PokeDexAssessment
      ```
3. Install dependencies

   ```bash
   npm install
   ```

4. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
