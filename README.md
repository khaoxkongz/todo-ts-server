# Express TODO API

A simple Express.js server with RESTful APIs for User authentication and TODO management.

## API Endpoints

### /todo

- `POST /todo`: Create a new TODO
- `GET /todo`: Get all TODOs
- `GET /todo/:id`: Get a single TODO by ID
- `POST /todo/update/:id`: Update a single TODO by ID
- `DELETE /todo`: Delete all TODOs
- `DELETE /todo/:id`: Delete a single TODO by ID

### /user

- `POST /user/register`: Register a new user (duplicate username not allowed)
- `POST /user/login`: Log in as an existing user

## Usage

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm build && npm start`
4. The server will be running at `http://localhost:8000`

## Implementation Details

- User data is stored in-memory using a `Map` data structure
- TODO data is stored in-memory using a `Map` data structure
- TODO IDs are assigned using a simple counter
- Error handling and input validation are implemented for each endpoint

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
