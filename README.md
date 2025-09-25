# Flashcard App

## Overview
The Flashcard App is a simple web application designed to help users learn and memorize information using flashcards. Users can navigate through a series of flashcards, each containing a question or prompt on one side and the answer on the other. The app includes features for adding new flashcards and flipping them to reveal hidden content with a smooth transition effect.

## Project Structure
```
flashCard-pwa
├── src
│   ├── index.html        # HTML structure for the flashcard application
│   ├── app.js           # JavaScript logic for handling flashcard functionality
│   ├── sw.js            # Service worker for caching and offline capabilities
│   ├── style.css        # CSS styles for the application
│   └── manifest.json    # Web app manifest for metadata
├── package.json         # npm configuration file
└── README.md            # Documentation for the project
```

## Features
- Display a series of flashcards with a question and answer format.
- Flip flashcards to reveal answers with a smooth transition effect.
- Add new flashcards to the collection.
- Offline capabilities through service worker caching.

## Getting Started
To set up the Flashcard App locally, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd flashCard-pwa
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   You can open `src/index.html` in your web browser to view the application.

## Usage
- Click on the flashcard to flip it and reveal the answer.
- Use the "Next" button to navigate through the flashcards.
- Click "Add Card" to create a new flashcard.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.