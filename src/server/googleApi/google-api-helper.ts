const {google} = require('googleapis');

export class GoogleApiHelper {
    public googleDrive: any;

    public readonly rootFolder = '1Y9uRzpaVyJK8gKHci1lifSwY8SCvkg9J';
    private readonly scopes = ['https://www.googleapis.com/auth/drive'];
    private googleAuth: any;
    constructor() {
        // somehow we need other linefeeds then it is delivered from the .env
        const privateKey = process.env.GAPI_PRIVATE_KEY?.replace(/\\n/g, '\n');
        this.googleAuth = new google.auth.JWT(
            process.env.GAPI_CLIENT_EMAIL, null,
            privateKey, this.scopes,
        );
        this.googleDrive = google.drive({ version: "v3", auth: this.googleAuth });
    }
}