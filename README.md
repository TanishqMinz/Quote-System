# Website-Quote-System

## Description

Gives a variety of website services and proceeding additional services based on them. Finally,gives a final quote based on the selected services. Made using Flask and React currently.

## Technologies Used

- Flask
- Flask-SQLAlchemy
- React
- Tailwind CSS

## Usage

1. Clone the repository:

    ```sh
    $ git clone https://github.com/TanishqMinz/website-quote-system
    ```

2. Run the following command in the root folder:

    ```sh
    $ npm install 
    ```

3. Navigate to server, add a Python virtual environment to the root directory (same level as `app.py`):

    - Create a new terminal, and navigate to the server folder there:

        ```sh
        $ cd server
        $ python -m venv venv
        ```

3. Activate the virtual environment:

    - On Windows:

        ```sh
        With powershell as administrator:
        
        > Set-ExecutionPolicy RemoteSigned
        > .\venv\Scripts\Activate.ps1
        > Set-ExecutionPolicy Restricted
        ```

    - On macOS/Linux:

        ```sh
        $ source venv/bin/activate
        ```

4. Install all the Python dependencies:

    ```sh
    $ python pip install -r requirements.txt
    ```

6. Initialize the database:

    ```sh
    $ python models.py
    ```
    
7. Run the script:

    ```sh
    $ python app.py
    ```

8. Back in the terminal in the root folder, run:

    ```sh
    $ npm run dev
    ```

8. Go to http://localhost:5173/
