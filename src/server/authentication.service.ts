

import { User } from './../app/types/user.type';
export class AuthenticationService {
    private users = [{userName: 'member', password: process.env.BASIC_PASSWORD || 'start1'}];

    constructor() {

    }
    // blup

    public async authenticate(iUser: User) {
        const user = this.users.find(u => u.userName === iUser.username && u.password === iUser.password);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    }

    public basicAuth = async (req: any, res: any, next: any) => {
        // check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }
     
        // verify auth credentials
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        const user = await this.authenticate({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Authentication Credentials' });
        }
    
        // attach user to request object
        req.user = user
    
        next();
    }
}