import {
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react';
import { Alert } from 'react-native';
import { GroupEntity } from '../features/home/models/GroupEntity';
import { ExpenseEntity } from '../features/home/models/ExpenseEntity';
import { supabase } from '../utils/supabase';
import { useAuth } from './AuthContext';

interface ExpenseContextData{
    expense: ExpenseEntity[];
    isLoading: boolean;
    error: string | null;
    fetchExpenses: (groupId: string) => Promise<void>;
    createExpense: (groupId: string, totalAmount: number, description?: string, memberName?: string, category?: string) => Promise<void>;
    deleteExpense: (groupId: string) => Promise<void>;
}


//createContext
export const ExpenseContext = createContext<ExpenseContextData>({} as ExpenseContextData)

interface ExpenseProviderProps {
    children: ReactNode;
}
