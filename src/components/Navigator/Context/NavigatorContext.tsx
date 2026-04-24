import { createContext, RefObject } from 'preact';
import { Navigator } from '../Navigator';

export interface NavigatorContextType {
    small?: RefObject<Navigator>;
    large?: RefObject<Navigator>;
}

export const NavigatorContext = createContext<NavigatorContextType>({small: undefined, large: undefined});