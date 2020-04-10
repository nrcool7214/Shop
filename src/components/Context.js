import { createContext } from 'react';
import DB from '../db.json';

export const ContextTotal = createContext(null);

export const ContextCart = createContext([]);

export const ContextViewglasses = createContext(DB.Products.filter(el => el.type === 'view'));

export const ContextSunglasses = createContext(DB.Products.filter(el => el.type === 'sun'));