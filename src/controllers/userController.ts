import { Request, Response } from 'express';

import User from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const addUserAction = async (req: Request, res: Response) => {
    const { firstname, lastname, email, age, interest} = req.body;

    console.log(firstname, lastname, email, age, interest); 

    const newUser = new User();
    newUser.name = { firstName: firstname, lastName: lastname };
    newUser.email = email;
    newUser.age = Number(age);
    newUser.interests = interest.split(',');
    try{
        await newUser.save();
        console.log('Usuário salvo com sucesso');
        res.redirect('/');
    } catch(e){
        console.log("Erro ao salvar usuário" + e);
    }
}

export const addAgeAction = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const result = await User.findById({ _id: id });

    if (result){
        result.age += 1;
        await result.save();
    }
    res.redirect('/');
}