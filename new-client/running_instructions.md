# Running the electron app in development

So to run the electron app while developing, you'll first run the command: 

	`npm run start`

This command will start the react app, then you'll run:

	`npm run electron-start`

The reason for this is before the electorn app is packaged, it's basically just loading
a react app page that is being served on the local machine. But after we've created an
installer and packaged the electron app it should run natively.