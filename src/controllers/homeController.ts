import { Request, Response } from 'express';

import User from '../models/User';

export const home = async (req: Request, res: Response) => {

    // await User.updateOne(
    //     { email: 'italo@gmail.com' },
    //     { age: 10000000000 }
    // );


    // await User.findOneAndDelete({ email: 'italo@gmail.com' });

    // let user = await User.findOne({ email: 'paulo@gmail.com' });
    // await user.remove();

    let users = await User.find({}).sort({ "name.firstName": 1 });

    res.render('pages/home', {
        users
    });
};