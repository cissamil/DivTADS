import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../../src/utils/supabase';

interface LoginEntity{
    email:string;
    password:string;
}

interface RegisterEntity{
    name:string;
    email:string;
    phone:string;
    password:string;
}

export class AuthService{

    private _isLoading: boolean = false;

    public get isLoading (){
        return this._isLoading;
    };

    public async signInWithEmail(email:string, password:string): Promise<void> {
        this._isLoading = true;

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) Alert.alert('Erro', error.message);
        
        this._isLoading= false
    }

    public async signUpWithEmail(email:string, password:string) : Promise<void>{

        this._isLoading = true;
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) Alert.alert('Erro', error.message);
        else Alert.alert('Sucesso', 'Conta criada! Você já pode entrar.');
        this._isLoading = false;
    }






}