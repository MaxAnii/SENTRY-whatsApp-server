# SENTRY
Sentry is a nodeJS service that moderates content semantically on the social media platform, WhatsApp.

# Getting Started

To get started with Sentry, follow these steps:

1. **Clone the Repository**: Clone the Sentry repository to your local machine.

    ```bash
    git clone https://github.com/MaxAnii/SENTRY-whatsApp-server.git
    ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.

    ```bash
    cd SENTRY-whatsApp-server
    npm install
    ```

3. **Set Up Environment Variables**: Create a `.env` file in the root directory and configure environment variables such as database connection details and API keys.

    ```plaintext
   DIRECT_URL
   api_secret
    api_user
    ```
    Make sure that the `DIRECT_URL` is the db URL, which is the same in the [SENTRY](https://github.com/MaxAnii/sentry).
   
    `api_secret` & `api_user` are the keys from the [sigth engine](https://sightengine.com/).
4. **Configure SENTRY BOT**: Scan the QR code generated on the terminal, which will automate the your WhatsApp account and this account will act as SENTRY bot.
5. **Protect Group**: Add your automated SENTRY bot into the groups as an admin which you want to protect and configure the message tolerance level from the dashboard.

## Support

By [Ansar](https://github.com/MaxAnii) with ❤️.

Feel free to open an issue or use this as your project!
